'use client'
import React, {
  createContext, useCallback, useContext, useEffect, useState,
} from 'react';
import { useRouter } from 'next/router';
import {
  CANCELED_PAYMENT, PRINT_OUT_TICKETS, GET_TICKETS_CONFIRMATIONS,
  TRANSFER_TICKETS, apiTokeUser 
} from '@/services';
import { ITicketPurchaseConfirmationUser, IUser } from '@/types';
import { useFetch } from './useFetch';
import { TypeEnum, useError } from "./useDialog";

interface ITicketsProvider {
    ticketsUser: ITicketPurchaseConfirmationUser[];
    handleSelectInfoTicket: (idOrder: number, idEvento: number) => void;
    infoTicket: ITicketPurchaseConfirmationUser | undefined;
    handleClearInfoTicket: () => void;
    loading: boolean;
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
    handleTranferTickets: (userTransfer: IUser) => Promise<void>;
    loadingTransfer: boolean;
}

const ContextTickets = createContext({} as ITicketsProvider);

export const TicketsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showErrorDialog } = useError();
  const callErrorDialogComponent = (message: string, type?: string) => {
    showErrorDialog(message, type ?? TypeEnum.INFO);
  };
  const [isTicketsUser, setIsTicketsUser] = useState<ITicketPurchaseConfirmationUser[]>([]);
  const [isInfoTicket, setIsInfoTicket] = useState<ITicketPurchaseConfirmationUser | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { data, error } = useFetch<{ bilhetes: ITicketPurchaseConfirmationUser[] }>(GET_TICKETS_CONFIRMATIONS, 'user');
  const [isLoadingCanceledPayment, setIsLoadingCanceledPayment] = useState<boolean>(false);
  const [isInfoCanceledPayment, setIsInfoCanceledPayment] = useState<{
    motivo: string;
    status: string
  }>();
  const [isShowAndCloseModalPayment, setIsShowAndCloseModalPayment] = useState<boolean>(false);
  const [isStepper, setIsStepper] = useState<number>(0);
  const router = useRouter();
  const [isLoadingDownloadTicket, setIsLoadingDownloadTicket] = useState<boolean>(false);
  const [loadingTransfer, setLoadingTransfer] = useState<boolean>(false);

  const handleShow = () => setIsShowAndCloseModalPayment(true);
  const handleCloseModal = () => setIsShowAndCloseModalPayment(false);

  const handleFormattedTicketsPerStatus = useCallback((purchases: ITicketPurchaseConfirmationUser[]) => {
    setIsTicketsUser(purchases);
    setIsLoading(false);
  }, []);

  const handleClearInfoTicket = useCallback((idTicket?: number) => {
    setIsInfoTicket(undefined);

    router.query.id = '';

    if (idTicket) {
      router.push(router);
      setIsTicketsUser((current) => current.filter((ticket) => ticket.id !== idTicket));
    } else {
      router.replace('/profile/tickets');
    }
  }, [router]);

  const handleSelectInfoTicket = useCallback(async (idOrder: number, idEvento: number) => {
    if (data && data.bilhetes) {
      router.query.id = String(idEvento);
      router.replace(router);
      const findTicket = data.bilhetes.find((i : any) => i.id === idOrder);

      if (findTicket) {
        setIsInfoTicket(findTicket);
      }
    }
  }, [data, router]);

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
      callErrorDialogComponent('Ocorreu um erro de comunicação.', TypeEnum.ERROR);
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
      callErrorDialogComponent('Ocorreu um erro de comunicação.', TypeEnum.ERROR);
    }
  }, [showErrorDialog]);

  const handleTranferTickets = useCallback(async (userTransfer: IUser) => {
    try {
      if (isInfoTicket) {
        setLoadingTransfer(true);
        await apiTokeUser.post(`${TRANSFER_TICKETS}/${isInfoTicket?.pedido.guid}/bilhete/utilizador`, {
          id: isInfoTicket.id,
          tipoDocumento: 'cpf',
          nome: userTransfer.nome,
          documento: userTransfer.CPF ? userTransfer.CPF.replaceAll('.', '').replaceAll('-', '') : userTransfer.CPF,
          email: userTransfer.email,
          telefone: userTransfer.telefone ? userTransfer.telefone.replace('(', '').replace(')', '').replaceAll(' ', '').replace('-', '') : userTransfer.telefone,
          telefoneDDI: 55,
        });
        callErrorDialogComponent('Ingresso transferido com sucesso.', TypeEnum.SUCCESS);
        setLoadingTransfer(false);
        handleClearInfoTicket(isInfoTicket.id);
      }
    } catch (err: any) {
      setLoadingTransfer(false);
      callErrorDialogComponent(err?.response?.data?.erro ?? 'Ocorreu um erro de comunicação.', TypeEnum.ERROR);
    }
  }, [showErrorDialog, isInfoTicket, handleClearInfoTicket]);

  useEffect(() => {
    if (data) {
      handleFormattedTicketsPerStatus(data.bilhetes);
    }
    if (error) {
      setIsLoading(false);
    }
  }, [data, handleFormattedTicketsPerStatus, error]);

  return (
    <ContextTickets.Provider value={{
      ticketsUser: isTicketsUser,
      handleSelectInfoTicket,
      infoTicket: isInfoTicket,
      handleClearInfoTicket,
      loading: isLoading,
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
      handleTranferTickets,
      loadingTransfer,
    }}
    >
      {children}
    </ContextTickets.Provider>
  );
};

export const useTickets = (): ITicketsProvider => {
  const context = useContext(ContextTickets);
  return context;
};
