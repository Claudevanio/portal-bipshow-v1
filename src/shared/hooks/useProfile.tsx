'use client'
import React, {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ITicketPurchaseUser, ITicketSale } from '@/types';
import {
  GET_PURCHASE_USER, GET_BILHETE_VENDA, CANCELED_PAYMENT, PRINT_OUT_TICKETS, apiTokeUser
} from '@/services';
import { useFetch } from './useFetch';
import { TypeEnum, useError } from './useDialog';

interface ITicketPurchaseUserFormatted {
  status: string;
  items: ITicketPurchaseUser[]
}

interface IProfileProvider {
  ticketsUser: ITicketPurchaseUserFormatted[];
  handleSelectInfoTicket: (idOrder: number, idEvento: number) => void;
  infoTicket: ITicketPurchaseUser | undefined;
  handleClearInfoTicket: () => void;
  loading: boolean;
  quantityTicketsPerUser: number;
  ticketsSales: ITicketSale[];
  handleDownloadTicketSales: (code: string, guid: string) => void;
  handleCanceledPayment: (idPayment: string) => Promise<void>;
  loadingCanceledPayment: boolean;
  infoCanceledPayment?: {
    motivo: string;
    status: string
  };
  handleShow: () => void;
  handleCloseModal: () => void;
  showAndCloseModalPayment: boolean;
  stepper: number;
  setIsStepper: (state: number) => void;
  isLoadingDownloadTicket: boolean;
}

const ContextProfile = createContext({} as IProfileProvider);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showErrorDialog } = useError();
  const callErrorDialogComponent = (message: string, type?: string) => {
    showErrorDialog(message, type ?? TypeEnum.INFO);
  };
  const [isTicketsUser, setIsTicketsUser] = useState<ITicketPurchaseUserFormatted[]>([]);
  const [isInfoTicket, setIsInfoTicket] = useState<ITicketPurchaseUser | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { data, error } = useFetch<{ pedidos: ITicketPurchaseUser[]; total: number; }>(GET_PURCHASE_USER, 'user');
  const [isTicketsSales, setIsTicketsSales] = useState<ITicketSale[]>([]);
  const [isLoadingCanceledPayment, setIsLoadingCanceledPayment] = useState<boolean>(false);
  const [isInfoCanceledPayment, setIsInfoCanceledPayment] = useState<{
    motivo: string;
    status: string
  }>();
  const [isShowAndCloseModalPayment, setIsShowAndCloseModalPayment] = useState<boolean>(false);
  const [isStepper, setIsStepper] = useState<number>(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const [isLoadingDownloadTicket, setIsLoadingDownloadTicket] = useState<boolean>(false);

  const handleShow = () => setIsShowAndCloseModalPayment(true);

  const handleCloseModal = () => setIsShowAndCloseModalPayment(false);

  const handleFormattedTicketsPerStatus = useCallback((purchases: ITicketPurchaseUser[]) => {
    const isFormattedPerStatus = [] as ITicketPurchaseUserFormatted[];

    purchases.forEach((item) => {
      const isFindIndex = isFormattedPerStatus.findIndex((i) => i.status === item.status);
      if (isFindIndex !== -1) {
        isFormattedPerStatus[isFindIndex].items = [
          ...isFormattedPerStatus[isFindIndex].items,
          {
            ...item,
          },
        ];
      } else {
        isFormattedPerStatus.push({
          status: item.status,
          items: [
            {
              ...item,
            },
          ],
        });
      }
    });

    setIsTicketsUser(isFormattedPerStatus);
    setIsLoading(false);
  }, []);

  const handleClearInfoTicket = useCallback(() => {
    setIsInfoTicket(undefined);
    const params = new URLSearchParams(searchParams.toString())
    params.set("id", "")
    router.push(pathName + '?' + params.toString());
  }, [router]);

  const handleLoadTicketsSale = useCallback(async (id: number) => {
    try {
      const { data } = await apiTokeUser.get(`${GET_BILHETE_VENDA}?pid=${id}`) as {
        data: {
          bilhetes: ITicketSale[]
        }
      };

      setIsTicketsSales(data.bilhetes);
    } catch (err) {
      callErrorDialogComponent("Ocorreu um erro de comunicação.", TypeEnum.ERROR)
    }
  }, [showErrorDialog]);

  const handleSelectInfoTicket = useCallback(async (idOrder: number, idEvento: number) => {
    if (data && data.pedidos) {
      const params = new URLSearchParams(searchParams.toString())
      params.set("id", String(idEvento))
      router.push(pathName + '?' + params.toString());
      const findTicket = data.pedidos.find((i) => i.id === idOrder);

      if (findTicket) {
        await handleLoadTicketsSale(findTicket.id);
        setIsInfoTicket(findTicket);
      }
    }
  }, [data, handleLoadTicketsSale, router]);

  const handleCanceledPayment = useCallback(async (idPayment: string) => {
    try {
      setIsLoadingCanceledPayment(true);
      const { data } = await apiTokeUser.post(`${CANCELED_PAYMENT}/${idPayment}`);

      setIsLoadingCanceledPayment(false);
      if (data && data.motivo) {
        setIsInfoCanceledPayment({
          motivo: data.motivo,
          status: data.status,
        });
      }
    } catch (err) {
      setIsLoadingCanceledPayment(false);
      callErrorDialogComponent("Ocorreu um erro de comunicação.", TypeEnum.ERROR)
    }
  }, [showErrorDialog]);

  const handleDownloadTicketSales = useCallback(async (code: string, guid: string) => {
    try {
      setIsLoadingDownloadTicket(true);
      const { data } = await apiTokeUser.post(PRINT_OUT_TICKETS, {
        codigo: code,
        guid,
      });

      if (data.link) {
        window.open(data.link);
      }
      setIsLoadingDownloadTicket(false);
    } catch (err) {
      setIsLoadingDownloadTicket(false);
      callErrorDialogComponent("Ocorreu um erro de comunicação.", TypeEnum.ERROR)
    }
  }, [showErrorDialog]);

  const quantityTicketsPerUser = useMemo((): number => {
    let quantity = 0 as number;

    if (isInfoTicket && isInfoTicket.ingressos.length > 0) {
      isInfoTicket.ingressos.forEach((item) => {
        quantity += item.qtde;
      });
    }

    return quantity;
  }, [isInfoTicket]);

  useEffect(() => {
    if (data) {
      handleFormattedTicketsPerStatus(data.pedidos);
    }
    if (error) {
      setIsLoading(false);
    }
  }, [data, handleFormattedTicketsPerStatus, showErrorDialog, error]);

  return (
    <ContextProfile.Provider value={{
      ticketsUser: isTicketsUser,
      handleSelectInfoTicket,
      infoTicket: isInfoTicket,
      handleClearInfoTicket,
      loading: isLoading,
      quantityTicketsPerUser,
      ticketsSales: isTicketsSales,
      handleDownloadTicketSales,
      handleCanceledPayment,
      loadingCanceledPayment: isLoadingCanceledPayment,
      infoCanceledPayment: isInfoCanceledPayment,
      handleShow,
      showAndCloseModalPayment: isShowAndCloseModalPayment,
      handleCloseModal,
      stepper: isStepper,
      setIsStepper,
      isLoadingDownloadTicket,
    }}
    >
      {children}
    </ContextProfile.Provider>
  );
};

export const useProfile = (): IProfileProvider => {
  const context = useContext(ContextProfile);
  return context;
};
