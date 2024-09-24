'use client';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { GET_PURCHASE_USER, GET_BILHETE_VENDA, CANCELED_PAYMENT, PRINT_OUT_TICKETS, apiTokeUser, TRANSFER_TICKETS } from '@/services';
import { useFetch } from './useFetch';
import { TypeEnum, useError } from './useDialog';
import { ITicketPurchaseUser, ITicketSale, IUser } from '@/types';

interface ITicketPurchaseUserFormatted {
  status: string;
  items: ITicketPurchaseUser[];
}

interface IOrdersProvider {
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
    status: string;
  };
  handleShow: () => void;
  handleCloseModal: () => void;
  showAndCloseModalPayment: boolean;
  stepper: number;
  setIsStepper: (state: number) => void;
  isLoadingDownloadTicket: boolean;
  handleCancelPIX: (paymentId: string) => Promise<void>;
  handleTranferTickets: (userTransfer: IUser, hideDialog?: boolean) => Promise<void>;
  loadingTransfer: boolean;
  isOpenModalTranfer: boolean;
  setIsOpenModalTranfer: (state: boolean) => void;
  setCurrentTransferTicketId: (state: number) => void;
}

const ContextOrders = createContext({} as IOrdersProvider);

export const OrdersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showErrorDialog } = useError();
  const callErrorDialogComponent = (message: string, type?: string) => {
    showErrorDialog(message, type ?? TypeEnum.INFO);
  };
  const [isTicketsUser, setIsTicketsUser] = useState<ITicketPurchaseUserFormatted[]>([]);
  const [isInfoTicket, setIsInfoTicket] = useState<ITicketPurchaseUser | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { data, error } = useFetch<{ pedidos: ITicketPurchaseUser[]; total: number }>(GET_PURCHASE_USER + '?i=0&t=35', 'user');
  const [isTicketsSales, setIsTicketsSales] = useState<ITicketSale[]>([]);
  const [isLoadingCanceledPayment, setIsLoadingCanceledPayment] = useState<boolean>(false);
  const [isInfoCanceledPayment, setIsInfoCanceledPayment] = useState<{
    motivo: string;
    status: string;
  }>();
  const [isShowAndCloseModalPayment, setIsShowAndCloseModalPayment] = useState<boolean>(false);
  const [isStepper, setIsStepper] = useState<number>(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoadingDownloadTicket, setIsLoadingDownloadTicket] = useState<boolean>(false);

  const handleShow = () => setIsShowAndCloseModalPayment(true);

  const handleCloseModal = () => setIsShowAndCloseModalPayment(false);

  function transformarArray(pedidos: ITicketPurchaseUser[]): ITicketPurchaseUserFormatted[] {
    const agora = new Date();

    return pedidos.reduce((accumulador, pedido) => {
      let status = '';

      if (pedido.status === 'CONCLUIDO') {
        const dataEvento = new Date(pedido?.evento?.dataRealizacao ?? new Date());
        if (dataEvento <= agora) {
          status = 'CONCLUIDO';
        } else {
          status = 'ATIVO';
        }
      } else if (pedido.pagamento && pedido.pagamento.status === 'Cancelado') {
        status = 'Cancelado';
      }

      accumulador.push({
        status: status,
        items: [pedido]
      });

      return accumulador;
    }, [] as any[]);
  }
  interface Pedido {
    id: number;
    guid: string;
    valor: number;
    pagamento: {
      status: string;
      horario: string;
    };
    evento: {
      dataRealizacao: string;
    };
    // ... outros campos necessários
  }

  type Status = 'ATIVO' | 'CONCLUIDO' | 'CANCELADO';

  function agruparPedidosPorStatus(pedidos: ITicketPurchaseUser[]): ITicketPurchaseUserFormatted[] {
    const agrupados: Record<Status, Pedido[]> = {
      ATIVO: [],
      CONCLUIDO: [],
      CANCELADO: []
    };

    pedidos.forEach((pedido: any) => {
      const dataEvento = new Date(pedido?.evento?.dataRealizacao ?? new Date());
      const agora = new Date();

      if (pedido.pagamento.status === 'CANCELADO' || pedido.pagamento.status === 'REEMBOLSADO') {
        agrupados['CANCELADO'].push(pedido);
      } else if (dataEvento <= agora) {
        agrupados['CONCLUIDO'].push(pedido);
      } else {
        agrupados['ATIVO'].push(pedido);
      }
    });

    // Converte o objeto agrupado em um array de objetos
    return Object.entries(agrupados).map(([status, items]) => ({
      status: status as Status,
      items: items
    })) as ITicketPurchaseUserFormatted[];
  }

  const handleFormattedTicketsPerStatus = useCallback((purchases: ITicketPurchaseUser[]) => {
    // purchases.forEach((item) => {
    //   const isFindIndex = isFormattedPerStatus.findIndex((i) => i.status === item.status);
    //   if (isFindIndex !== -1) {
    //     isFormattedPerStatus[isFindIndex].items = [
    //       ...isFormattedPerStatus[isFindIndex].items,
    //       {
    //         ...item,
    //       },
    //     ];
    //   } else {
    //     isFormattedPerStatus.push({
    //       status: item.status,
    //       items: [
    //         {
    //           ...item,
    //         },
    //       ],
    //     });
    //   }
    // });

    const isFormattedPerStatus = transformarArray(purchases);

    const agrupados = agruparPedidosPorStatus(purchases);

    console.log('isFormattedPerStatus', agrupados);

    setIsTicketsUser(agrupados);
    setIsLoading(false);
  }, []);

  const handleClearInfoTicket = useCallback(() => {
    setIsInfoTicket(undefined);
    if (searchParams.get('idOrder')) router.replace('/profile?tab=orders');
  }, [router]);

  useEffect(() => {
    if (!searchParams.get('idOrder')) handleClearInfoTicket();
  }, [searchParams, handleClearInfoTicket]);

  const handleLoadTicketsSale = useCallback(
    async (id: number) => {
      try {
        const { data } = (await apiTokeUser.get(`${GET_BILHETE_VENDA}?pid=${id}`)) as {
          data: {
            bilhetes: ITicketSale[];
          };
        };

        setIsTicketsSales(data.bilhetes);
      } catch (err) {
        callErrorDialogComponent('Ocorreu um erro de comunicação.', TypeEnum.ERROR);
      }
    },
    [showErrorDialog]
  );

  const handleSelectInfoTicket = useCallback(
    async (idOrder: number, idEvento: number) => {
      if (data && data.pedidos) {
        // router.push('/profile?tab=meus-ingressos&' + new URLSearchParams({ idOrder: idOrder.toString(), idEvento: idEvento.toString() }).toString())
        router.push('/profile?tab=orders&' + new URLSearchParams({ idOrder: idOrder.toString(), idEvento: idEvento.toString() }).toString());

        const findTicket = data.pedidos.find(i => i.id === idOrder);

        if (findTicket) {
          await handleLoadTicketsSale(findTicket.id);
          setIsInfoTicket(findTicket);
        }
      }
    },
    [data, handleLoadTicketsSale, router]
  );

  const handleCanceledPayment = useCallback(
    async (idPayment: string) => {
      try {
        
        setIsLoadingCanceledPayment(true);
        const response = await apiTokeUser.post(`${CANCELED_PAYMENT}/${idPayment}`);

        setIsLoadingCanceledPayment(false);
        if (true) {
          setIsInfoCanceledPayment({
            motivo: response.data.motivo,
            status: response.data.status
          });
          if (!data) return;
          const findTicket = data.pedidos.findIndex((i: any) => i.pagamento.id === idPayment);
          if (findTicket !== -1) {
            const newPedido = [...data.pedidos];
            newPedido[findTicket].pagamento.status = 'CANCELADO';
            newPedido[findTicket].status = 'CANCELADO';
            handleFormattedTicketsPerStatus(newPedido);
          }
        } else {
          callErrorDialogComponent(response.data.mensagem, TypeEnum.INFO);
        }
      } catch (err) {
        setIsLoadingCanceledPayment(false);
        callErrorDialogComponent('Ocorreu um erro de comunicação.', TypeEnum.ERROR);
      }
    },
    [showErrorDialog, data, handleFormattedTicketsPerStatus]
  );

  const handleDownloadTicketSales = useCallback(
    async (code: string, guid: string) => {
      try {
        setIsLoadingDownloadTicket(true);
        const { data } = await apiTokeUser.post(PRINT_OUT_TICKETS, {
          codigo: code,
          guid
        });

        if (data.link) {
          window.open(data.link);
        }
        setIsLoadingDownloadTicket(false);
      } catch (err) {
        setIsLoadingDownloadTicket(false);
        callErrorDialogComponent('Ocorreu um erro de comunicação.', TypeEnum.ERROR);
      }
    },
    [showErrorDialog]
  );

  const handleCancelPIX = useCallback(async (paymentId: string) => {
    try {
      const result = apiTokeUser.post(`${CANCELED_PAYMENT}/${paymentId}`);

      console.log('result', result);
    } catch (err: any) {
      callErrorDialogComponent('Ocorreu um erro de comunicação.', TypeEnum.ERROR);
    }
  }, []);

  const quantityTicketsPerUser = useMemo((): number => {
    let quantity = 0 as number;

    if (isInfoTicket && isInfoTicket.ingressos.length > 0) {
      isInfoTicket.ingressos.forEach(item => {
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

  useEffect(() => {
    if (searchParams.get('idEvento')) return;

    handleClearInfoTicket();
  }, [searchParams, handleClearInfoTicket]);

  const [loadingTransfer, setLoadingTransfer] = useState<boolean>(false);

  const [isOpenModalTranfer, setIsOpenModalTranfer] = useState<boolean>(false);

  const [currentTransferTicketId, setCurrentTransferTicketId] = useState<number>(0);

  const handleTranferTickets = useCallback(
    async (userTransfer: IUser, hideDialog?: boolean) => {
      try {
        if (currentTransferTicketId && isInfoTicket) {
          
          setLoadingTransfer(true);
          await apiTokeUser.post(`${TRANSFER_TICKETS}/${isInfoTicket?.guid}/bilhete/utilizador`, {
            id: currentTransferTicketId,
            tipoDocumento: userTransfer?.idTipoDocumento ?? 'cpf',
            pais: userTransfer?.idPais,
            nome: userTransfer.nome,
            documento: userTransfer?.numeroDoc
              ? userTransfer.numeroDoc
              : userTransfer.CPF
                ? userTransfer.CPF.replaceAll('.', '').replaceAll('-', '')
                : userTransfer.CPF,
            email: userTransfer.email,
            telefone: userTransfer.telefone
              ? userTransfer.telefone.replace('(', '').replace(')', '').replaceAll(' ', '').replace('-', '')
              : userTransfer.telefone,
            telefoneDDI: 55
          });
          if (!hideDialog) {
            callErrorDialogComponent('Ingresso transferido com sucesso.', TypeEnum.SUCCESS);
            // handleClearInfoTicket();
          }
          const newTicketsSales = isTicketsSales.map(item => {
            if (item.id === currentTransferTicketId) {
              return {
                ...item,
                utilizador: userTransfer
              };
            }
            return item;
          }) as ITicketSale[];
          setIsTicketsSales(newTicketsSales);

          setLoadingTransfer(false);
        }
      } catch (err: any) {
        setLoadingTransfer(false);
        callErrorDialogComponent(err?.response?.data?.erro ?? 'Ocorreu um erro de comunicação.', TypeEnum.ERROR);
      }
    },
    [showErrorDialog, isInfoTicket, handleClearInfoTicket, currentTransferTicketId]
  );

  return (
    <ContextOrders.Provider
      value={{
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
        handleCancelPIX,
        handleTranferTickets,
        loadingTransfer,
        isOpenModalTranfer,
        setIsOpenModalTranfer,
        setCurrentTransferTicketId
      }}
    >
      {children}
    </ContextOrders.Provider>
  );
};

export const useOrders = (): IOrdersProvider => {
  const context = useContext(ContextOrders);
  return context;
};
