'use client';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

import {
  CREATE_PURCHASE,
  CREATE_PAYMENT,
  CREATE_RESERVATION,
  GET_PURCHASE,
  APLICATION_COUPON_DISCOUNT,
  VALIDATION_USER_TICKET,
  GET_SESSION_PAGSEGURO,
  GET_INSTALLMENTS,
  apiTokeUser
} from '@/services';
import { validationFlag } from '@/shared';

import { auth3Ds, CartaoProps } from '@/services/pagSeguro/auth3Ds';

import { useEventTicket } from './useEventTicket';
import { useRegister } from './useRegister';
import { TypeEnum, useError } from './useDialog';
import axios from 'axios';
import {
  CreateSessionPagSeguro,
  IInstallment,
  InstallmentProps,
  IOrder,
  IPurchase,
  IReservation,
  ITypePayment,
  IUser,
  PaymentPerPixProps,
  TicketSelectUserProps,
  TypePaymentCardProps,
  ITicketPurchase as ITicketsPurchaseInfos
} from '@/types';
import { IDebitOnline } from '@/types/models/IDebitOnline';
import { Cache } from '@/adapters';

interface ITicketPurchase {
  stepper: number;
  setIsStepper: (state: number) => void;
  selectedUser: (type: 'mine' | 'transfer', single?: number, idTipo?: number, userTransfer?: IUser, isChecked?: boolean) => Promise<void>;
  clearUser: (single: number, idTipo: number) => void;
  handleNextStepOne: () => void;
  handleSubmitPurchase: () => void;
  loading: boolean;
  purchaseSuccess: boolean;
  setIsPurchaseSuccess: (state: boolean) => void;
  idPurchase: number | undefined;
  handleSelectTypePayment: (id: number) => void;
  selectedPayment?: ITypePayment;
  handleSeletedMethodPayment: (methodPayment: IDebitOnline) => void;
  selectMethodPaymentDebitOnline?: IDebitOnline;
  handleLoadPurchase: (guide: string, idPurchase: number, isDataPurchase?: IPurchase) => Promise<void>;
  guide?: {
    id: number;
    guide: string;
  };
  handleSubmitCouponDiscount: (coupon: string) => Promise<void>;
  loadingCouponDiscount: boolean;
  couponAppliep?: {
    valorDesconto: number;
    coupon: string;
  };
  handleRemoveCoupon: () => Promise<void>;
  setIsGuidePurchase: (state: { id: number; guide: string }) => void;
  handleQuantityinstallment: (cardBin: string) => void;
  installments?: IInstallment[];
  loadinginstallment: boolean;
  setInstallment: (state: IInstallment | undefined) => void;
  installment: IInstallment | undefined;
  amount: number;
  amountWithoutTaxa: number;
  dataOrder?: IOrder;
  setIsCheckoutPurchase: (state: boolean) => void;
  isCheckoutPurchase: boolean;
  ticketSelectedUser?: TicketSelectUserProps[];
  loadingOrder: boolean;
  loadingSelectUser: boolean;
  handleLoadPurchaseFlowTicket: (guid: string) => Promise<void>;
  handleSubmitIngressoCortesia: () => Promise<void>;
  onChangePaymentCardType: (typeCardPayment: TypePaymentCardProps) => void;
  optionCardPayment: TypePaymentCardProps;
  paymentPerPix?: PaymentPerPixProps;
  TICKET_PURCHASE_FROM_API?: { ingressos: ITicketsPurchaseInfos[]; valor: number };
  webView: boolean;
}

const TicketPurchaseContext = createContext({} as ITicketPurchase);

export const TicketPurchaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathName = usePathname();
  const {
    ticketsPurchase,
    setIsTickets,
    eventTicket,
    setIsGuidePurchase,
    guidePurchase,
    setIsErrorGuidePurchase,
    isErrorGuidePurchase,
    showPurchase,
    handleCloseModal,
    setIsDataOrder,
    isDataOrder,
    setIsTicketSelectedUser,
    isTicketSelectedUser,
    titularId
  } = useEventTicket();
  const { user, authenticationUser } = useRegister();
  const { showErrorDialog } = useError();
  const callErrorDialogComponent = (message: string, type?: string) => {
    showErrorDialog(message, type ?? TypeEnum.INFO);
  };
  const [isStepper, setIsStepper] = useState<number>(pathName.includes('/payment/webview') ? 2 : 1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPurchaseSuccess, setIsPurchaseSuccess] = useState<boolean>(false);
  const [isIdPurchase, setIsIdPurchase] = useState<number>();
  const [isSelectedTypePayment, setIsSelectedTypePayment] = useState<ITypePayment>();
  const [isSelectMethodPaymentDebitOnline, setIsSelectMethodPaymentDebitOnline] = useState<IDebitOnline>();
  const [isLoadingCouponDiscount, setIsLoadingCouponDiscount] = useState<boolean>(false);
  const [isCouponAppliep, setIsCouponApplied] = useState<{
    valorDesconto: number;
    coupon: string;
  }>();
  const [isInstallments, setIsInstallments] = useState<IInstallment[]>();
  const [isLoadinginstallment, setIsLoadingInstallment] = useState<boolean>(false);
  const [installment, setInstallment] = useState<IInstallment>();
  const [isCheckoutPurchase, setIsCheckoutPurchase] = useState<boolean>(pathName.includes('/payment/webview') ? true : false);
  const [isLoadingOrder, setIsLoadingOrder] = useState<boolean>(false);
  const [isLoadingSelectUser, setIsLoadingSelectUser] = useState<boolean>(false);
  // const [isSessionPayment, setIsSessionPayment] = useState<CreateSessionPagSeguro>();
  const [isSessionPayment, setIsSessionPayment] = useState<any>();
  const [isOptionCardPayment, setIsOptionCardPayment] = useState<TypePaymentCardProps>('CREDIT_CARD');
  const [isPaymentPerPix, setIsPaymentPerPix] = useState<PaymentPerPixProps>();
  const [isWebView] = useState(pathName.includes('/payment/webview') ? true : false);
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [TICKET_PURCHASE_FROM_API, setTICKET_PURCHASE_FROM_API] = useState<{ ingressos: ITicketsPurchaseInfos[]; valor: number }>();

  const amount = useMemo(() => {
    if (TICKET_PURCHASE_FROM_API) {
      const valor = TICKET_PURCHASE_FROM_API.valor;
      if (isCouponAppliep) {
        return valor - isCouponAppliep.valorDesconto;
      }
      return valor;
    }

    let isAmount = 0 as number;

    if (ticketsPurchase) {
      ticketsPurchase.forEach(i => {
        let addAmount = i.valor * i.qtde;

        if (i.valoresPorFormaPagamento && isSelectedTypePayment && i.valoresPorFormaPagamento[isSelectedTypePayment.formaPagamento]) {
          addAmount +=
            (i.valoresPorFormaPagamento[isSelectedTypePayment.formaPagamento].taxaConveniencia +
              i.valoresPorFormaPagamento[isSelectedTypePayment.formaPagamento].taxaServico) *
            (i.cadeiras && i.cadeiras.length > 0 ? i.cadeiras.length : i.qtde);
        } else {
          addAmount += (i.taxaPadrao || 0) * (i.cadeiras && i.cadeiras.length > 0 ? i.cadeiras.length : i.qtde) || 0;
        }

        isAmount += addAmount;
      });
    }

    if (isCouponAppliep) {
      isAmount -= isCouponAppliep.valorDesconto;
    }

    return isAmount;
  }, [ticketsPurchase, isSelectedTypePayment, isCouponAppliep]);

  const amountWithoutTaxa = useMemo(() => {
    let isAmount = 0 as number;

    if (ticketsPurchase) {
      ticketsPurchase.forEach(i => {
        isAmount += i.valor * i.qtde;
      });
    }

    return isAmount;
  }, [ticketsPurchase]);

  const handleSubmitIngressoCortesia = useCallback(async () => {
    const { pedido }: any = isDataOrder;
    const { usuario }: any = pedido;
    const { bilhetesPreencher }: any = pedido;
    const { guid }: any = pedido;

    const isBody = {
      origem: isWebView ? 'app' : 'site',
      lb: bilhetesPreencher.map(
        (reservation: any, index: number) =>
          ({
            cpf: isTicketSelectedUser ? isTicketSelectedUser[index]?.cpf : usuario.cpf,
            tipoDocumento: isTicketSelectedUser ? isTicketSelectedUser[index]?.tipoDocumento : usuario.tipoDocumento,
            documento: isTicketSelectedUser ? isTicketSelectedUser[index]?.documento : usuario.documento,
            pais: isTicketSelectedUser ? isTicketSelectedUser[index]?.pais : usuario.pais,
            dependente: false,
            descricao: reservation.descricao,
            idTipo: reservation.idTipo,
            nome: isTicketSelectedUser ? isTicketSelectedUser[index]?.nome : usuario.nome,
            email: isTicketSelectedUser ? isTicketSelectedUser[index]?.email : usuario.email,
            telefone: isTicketSelectedUser ? isTicketSelectedUser[index]?.telefone?.replace(/\D/g, '') : user?.telefone
          }) as IReservation
      )
    } as any;

    const result = await apiTokeUser.post(`${CREATE_PAYMENT}/${guid}/cortesia/gere`, {
      ...isBody
    });

    if (result.data.sucesso) {
      setIsPurchaseSuccess(true);

      if (titularId != 0) {
        const api = axios.create({
          baseURL: process.env.NEXT_PUBLIC_URL_API_TITULARES,
          headers: {
            'Content-Type': 'application/json'
          }
        });

        api.delete(`/titular/${titularId}/1a2b3c4d5e`);
      }
      return;
    }

    postMessage({
      success: false,
      message: result.data.mensagem ?? 'Ocorreu um erro de comunicação'
    });
    callErrorDialogComponent(result.data.mensagem ?? 'Ocorreu um erro de comunicação.', TypeEnum.ERROR);
    setIsLoading(false);
  }, [isDataOrder, isWebView, isTicketSelectedUser]);

  const handleChangePaymentCardType = useCallback((typeCardPayment: TypePaymentCardProps) => setIsOptionCardPayment(typeCardPayment), []);

  const handleSeletedMethodPayment = useCallback((selectMethodPayment: IDebitOnline) => {
    setIsSelectMethodPaymentDebitOnline(selectMethodPayment);
  }, []);

  const handleSelectTypePayment = useCallback(
    (id: number) => {
      let isTaxa = 0;

      if (eventTicket && eventTicket.taxas && eventTicket.taxas.length > 0) {
        const isPaymentType = eventTicket.taxas.find(item => item.id === id);
        if (isPaymentType && isPaymentType.formaPagamento && isPaymentType.id) {
          if (ticketsPurchase) {
            ticketsPurchase.forEach(item => {
              if (item.valoresPorFormaPagamento && item.valoresPorFormaPagamento[isPaymentType.formaPagamento as string]) {
                isTaxa = item.valoresPorFormaPagamento[isPaymentType.formaPagamento as string].taxaConveniencia;
              }
            });
          }

          setIsSelectedTypePayment({
            formaPagamento: isPaymentType.formaPagamento,
            id: isPaymentType.id,
            taxa: isTaxa ? isTaxa : isPaymentType.taxa
          });
        } else {
          if (id === 0) {
            setIsSelectedTypePayment({
              formaPagamento: 'CartaoCredito',
              id: 0,
              taxa: 0
            });
          }
          if (id === 1) {
            setIsSelectedTypePayment({
              formaPagamento: 'PIX',
              id: 1,
              taxa: isTaxa
            });
          }
        }
      } else if (id === 0) {
        ticketsPurchase?.forEach(item => {
          if (item.valoresPorFormaPagamento && item.valoresPorFormaPagamento.CartaoCredito) {
            isTaxa = item.valoresPorFormaPagamento.CartaoCredito.taxaConveniencia;
          }
        });

        setIsSelectedTypePayment({
          formaPagamento: 'CartaoCredito',
          id: 0,
          taxa: isTaxa
        });
      } else if (id === 1) {
        setIsSelectedTypePayment({
          formaPagamento: 'PIX',
          id: 1,
          taxa: isTaxa
        });
      }
    },
    [eventTicket, ticketsPurchase]
  );

  const handleSelectedUser = useCallback(
    async (type: 'mine' | 'transfer', single?: number, idTipo?: number, userTransfer?: IUser, isChecked?: boolean) => {
      try {
        if (
          !isChecked &&
          isTicketSelectedUser &&
          isTicketSelectedUser.find(item => item.cpf === user?.cpf && item.idTipo == idTipo) &&
          isTicketSelectedUser.find(item => item.cpf === userTransfer?.cpf && item.idTipo == idTipo)
        ) {
          callErrorDialogComponent('Usuário já está sendo usado. Verifique!', TypeEnum.ERROR);
          return;
        }

        if (type === 'mine' && idTipo !== null && ticketsPurchase && ticketsPurchase.length > 0 && user) {
          setIsLoadingSelectUser(true);

          const dataToApi: any = {
            tid: idTipo,
            pid: guidePurchase?.id
          };

          if (user.cpf && user.cpf.length > 1) {
            dataToApi.cpf = user.cpf;
          }

          if (user.documentoEstrangeiro && user.documentoEstrangeiro.length > 1) {
            dataToApi.pais = user.idPais;
            dataToApi.tipoDocumento = user.idTipoDocumento;
            dataToApi.documento = user.documentoEstrangeiro;
          }

          const { data } = await apiTokeUser.post(`${VALIDATION_USER_TICKET}/${eventTicket?.id}/utilizador/verifique`, dataToApi);

          if (data && data.totalDisponivel && data.totalDisponivel > 0) {
            setIsTickets(
              ticketsPurchase.map(i => {
                if (i.id === idTipo) {
                  return {
                    ...i,
                    user: {
                      ...user,
                      ...dataToApi
                    }
                  };
                }
                return i;
              })
            );
            setIsTicketSelectedUser(current =>
              current?.map(item => {
                if (item.index === single) {
                  return {
                    nome: user.nome,
                    telefone: user.telefone,
                    email: user.email,
                    cpf: user.cpf,
                    index: single,
                    idTipo: item.idTipo,
                    filled: false,
                    nomeEvento: item.nomeEvento,
                    documento: user.documentoEstrangeiro,
                    tipoDocumento: user.idTipoDocumento,
                    pais: user.idPais
                  };
                }
                return item;
              })
            );
          } else if (!data.sucesso) {
            callErrorDialogComponent(data.erro, TypeEnum.ERROR);
          }
        }
        if (type === 'transfer' && userTransfer && idTipo !== null && ticketsPurchase && ticketsPurchase.length > 0) {
          const dataToApi: any = {
            tid: idTipo,
            pid: guidePurchase?.id
          };

          if (userTransfer.cpf && userTransfer.cpf.length > 1) {
            dataToApi.cpf = userTransfer.cpf;
          }

          if (userTransfer.idPais && userTransfer.idPais > 0) {
            dataToApi.pais = userTransfer.idPais;
            dataToApi.tipoDocumento = userTransfer.idTipoDocumento;
            dataToApi.documento = userTransfer.numeroDoc;
          }

          const { data } = await apiTokeUser.post(`${VALIDATION_USER_TICKET}/${eventTicket?.id}/utilizador/verifique`, dataToApi);

          if (data && data.totalDisponivel && data.totalDisponivel > 0) {
            setIsTickets(
              ticketsPurchase.map(i => {
                if (i.id === idTipo) {
                  return {
                    ...i,
                    user: {
                      nome: userTransfer.nome,
                      cpf: userTransfer.cpf,
                      telefone: userTransfer.telefone,
                      email: userTransfer.email,
                      ...dataToApi
                    }
                  };
                }
                return i;
              })
            );
            setIsTicketSelectedUser(current =>
              current?.map(item => {
                if (item.index === single) {
                  return {
                    nome: userTransfer.nome,
                    telefone: userTransfer.telefone,
                    email: userTransfer.email,
                    cpf: userTransfer.cpf,
                    index: single,
                    idTipo: item.idTipo,
                    filled: false,
                    nomeEvento: item.nomeEvento,
                    ...dataToApi
                  };
                }
                return item;
              })
            );
          } else if (!data.sucesso) {
            callErrorDialogComponent(data.erro || 'Ocorreu um erro de comunicação.', TypeEnum.ERROR);
          }
        }

        setIsLoadingSelectUser(false);
      } catch (err) {
        setIsLoadingSelectUser(false);
        callErrorDialogComponent('Ocorreu um erro de comunicação.', TypeEnum.ERROR);
      }
    },
    [ticketsPurchase, setIsTickets, user, eventTicket, guidePurchase, showErrorDialog, isTicketSelectedUser]
  );

  const handleClearUser = useCallback(
    (single: number, idTipo: number) => {
      if (ticketsPurchase && ticketsPurchase.length > 0) {
        setIsTickets(
          ticketsPurchase.map(i => {
            if (i.id === idTipo) {
              return {
                ...i,
                user: undefined
              };
            }
            return i;
          })
        );
        setIsTicketSelectedUser(current =>
          current?.map(item => {
            if (item.index === single) {
              return {
                filled: true,
                idTipo: item.idTipo,
                index: item.index,
                nomeEvento: item.nomeEvento
              };
            }
            return item;
          })
        );
      }
    },
    [setIsTickets, ticketsPurchase, setIsTicketSelectedUser]
  );

  const handleNextStepOne = useCallback(() => {
    if (ticketsPurchase && ticketsPurchase.length > 0) {
      const findUserNotExistInTicket = ticketsPurchase.find(i => !i.user);

      if (!findUserNotExistInTicket) {
        setIsStepper(2);
      } else {
        callErrorDialogComponent(`Defina um titular para o ingresso ${findUserNotExistInTicket.nome}`, TypeEnum.ERROR);
      }
    }
  }, [ticketsPurchase, showErrorDialog]);

  const handleSubmitPayment = useCallback(
    async (guide: string, idPurchase: number, dataReservation: IReservation[], data?: IPurchase, authenticationId?: string) => {
      try {
        if (user) {
          if (isSelectedTypePayment && isSelectedTypePayment.formaPagamento === 'CartaoCredito' && data && !validationFlag(data.cartao)) {
            callErrorDialogComponent('Número do cartão é inválido.', TypeEnum.ERROR);
            return;
          }

          let result = null as {
            data: PaymentPerPixProps;
          } | null;

          const installmentFirstPosition = isInstallments && isInstallments[0];

          const installmentToBody = installment ?? installmentFirstPosition;

          const secondaryAddress = dataReservation.length > 0 ? dataReservation[0]?.enderecoCobranca ?? data?.endereco : data?.endereco;

          const foreigner = dataReservation[0]?.pais && {
            pais: dataReservation[0]?.pais,
            tipoDocumento: dataReservation[0]?.tipoDocumento,
            documento: dataReservation[0]?.documento
          };

          if (isSelectedTypePayment && isSelectedTypePayment.formaPagamento !== 'PIX' && data && installmentToBody && data.senderHash) {
            const isBody = {
              senderHash: data.senderHash,
              origem: isWebView ? 'app' : 'site',
              cartoes: [
                {
                  token: data.token,
                  numero: data.cartao.split(' ').join(''),
                  nome: data.nome,
                  cpf: user.cpf,
                  ...foreigner,
                  telefone: user.telefone,
                  dataNascimento: user.dataNascimento,
                  bandeira: selectedBrand === '' ? data.brand : selectedBrand,
                  email: user.email,
                  authenticationId,
                  tipoDoCartao: isOptionCardPayment,
                  enderecoCobranca: user.endereco
                    ? {
                        cep: user.endereco.cep,
                        logradouro: user.endereco.logradouro,
                        complemento: user.endereco.complemento,
                        localidade: user.endereco.localidade,
                        bairro: user.endereco.bairro,
                        numero: user.endereco.numero,
                        nomeCidade: user.endereco.cidade ?? user.endereco.nomeCidade,
                        uf: user?.endereco?.localidade ? user?.endereco?.localidade.split('/')[1] : user?.endereco?.localidade
                      }
                    : secondaryAddress,
                  parcela: {
                    parcelas: isOptionCardPayment === 'CREDIT_CARD' ? installmentToBody.quantity : 1,
                    valorParcela: isOptionCardPayment === 'CREDIT_CARD' ? installmentToBody.installmentAmount : amount,
                    total: isOptionCardPayment === 'CREDIT_CARD' ? installmentToBody.totalAmount : amount
                  }
                }
              ]
            };
            result = await apiTokeUser.post(`${CREATE_PAYMENT}/${guide}/gere`, {
              ...isBody
            });
          }
          if (isSelectedTypePayment && isSelectedTypePayment.formaPagamento === 'PIX' && data?.senderHash) {
            const isBody = {
              origem: isWebView ? 'app' : 'site',
              lb: dataReservation.map(
                reservation =>
                  ({
                    cpf: reservation.cpf,
                    dependente: false,
                    descricao: reservation.descricao,
                    email: reservation.email,
                    idTipo: reservation.idTipo,
                    nome: reservation.nome,
                    telefone: reservation.telefone ? reservation.telefone : '',
                    pais: reservation?.pais,
                    tipoDocumento: reservation?.tipoDocumento,
                    documento: reservation?.documento
                  }) as IReservation
              )
            } as any;

            result = await apiTokeUser.post(`${CREATE_PAYMENT}/${guide}/gerePix`, {
              ...isBody
            });
          }

          if (result && !result.data.sucesso) {
            postMessage({
              success: false,
              message: result.data.mensagem ?? 'Ocorreu um erro de comunicação'
            });
            callErrorDialogComponent(result.data.mensagem ?? 'Ocorreu um erro de comunicação.', TypeEnum.ERROR);
            setIsLoading(false);
          } else {
            if (titularId != 0) {
              const api = axios.create({
                baseURL: process.env.NEXT_PUBLIC_URL_API_TITULARES,
                headers: {
                  'Content-Type': 'application/json'
                }
              });

              api.delete(`/titular/${titularId}/1a2b3c4d5e`);
            }

            setIsIdPurchase(idPurchase);
            setIsLoading(false);
            setIsPurchaseSuccess(true);
            callErrorDialogComponent('Pedido feito com sucesso!', TypeEnum.SUCCESS);
            postMessage({
              success: true,
              message: 'Pedido feito com sucesso!'
            });
            if (result && result.data && result.data.textoPix) {
              setIsPaymentPerPix(result.data as PaymentPerPixProps);
            }
          }
        }
      } catch (err) {
        setIsLoading(false);
        callErrorDialogComponent('Ocorreu um erro de comunicação.', TypeEnum.ERROR);
      }
    },
    [
      user,
      isSelectedTypePayment,
      isInstallments,
      installment,
      callErrorDialogComponent,
      isWebView,
      selectedBrand,
      isOptionCardPayment,
      amount,
      titularId
    ]
  );

  const handleSubmitReservation = useCallback(
    async (dataReservation: IReservation[], guide: string, idPurchase: number, dataPurchase?: IPurchase, authenticationId?: string) => {
      try {
        const { data } = await apiTokeUser.post(`${CREATE_RESERVATION}/${guide}/reserve`, {
          lb: dataReservation
        });

        if (data.sucesso) {
          const response = await handleSubmitPayment(guide, idPurchase, dataReservation, dataPurchase, authenticationId);
          console.log(response);
        } else {
          callErrorDialogComponent(data.mensagem || 'Ocorreu um erro de comunicação.', TypeEnum.ERROR);
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
        callErrorDialogComponent('Ocorreu um erro de comunicação.', TypeEnum.ERROR);
      }
    },
    [showErrorDialog, handleSubmitPayment]
  );

  const handleCreateSesssionPayment = useCallback(async () => {
    try {
      if (!isSessionPayment && eventTicket && user) {
        const { data } = (await apiTokeUser.get(`${GET_SESSION_PAGSEGURO}/${eventTicket?.id}`)) as { data: CreateSessionPagSeguro };

        setIsSessionPayment(data);
      }
    } catch (err: any) {
      callErrorDialogComponent(err.mensagem ?? 'Ocorreu um erro de comunicação.', TypeEnum.ERROR);
    }
  }, [showErrorDialog, eventTicket, isSessionPayment, user]);

  const handleLoadPurchase = useCallback(
    async (guide: string, idPurchase: number, isDataPurchase?: IPurchase) => {
      try {
        setIsLoading(true);
        if (isSessionPayment && user && isDataOrder && isDataOrder.sucesso && isDataOrder.pedido && isDataOrder.pedido.bilhetesPreencher) {
          const isFormattedDataCard: IPurchase = {
            cartao: isDataPurchase?.cartao || '',
            cvv: isDataPurchase?.cvv || 0,
            nome: isDataPurchase?.nome || '',
            cpf: isDataPurchase?.cpf || '',
            parcelas: isDataPurchase?.parcelas || '',
            validade: isDataPurchase?.validade || '',
            brand: isDataPurchase?.brand || ''
          };

          if (isSelectedTypePayment && isSelectedTypePayment.formaPagamento === 'CartaoCredito' && isDataPurchase) {
            // @ts-ignore: Unreachable code error
            const tokenCard = PagSeguro.encryptCard({
              publicKey: isSessionPayment.publickey,
              holder: isFormattedDataCard.nome,
              number: isFormattedDataCard.cartao.split(' ').join(''),
              expMonth: isFormattedDataCard.validade.split('/')[0],
              expYear: new Date(`${isFormattedDataCard.validade.split('/')[0]}/01/${isFormattedDataCard.validade.split('/')[1]}`).getFullYear(),
              securityCode: String(isFormattedDataCard.cvv)
            }) as { encryptedCard: string };

            if (tokenCard) {
              const isCartao = {
                ano: String(new Date(`${isFormattedDataCard.validade.split('/')[0]}/01/${isFormattedDataCard.validade.split('/')[1]}`).getFullYear()),
                endereco: isDataPurchase?.endereco ?? user?.endereco,
                mes: isFormattedDataCard.validade.split('/')[0],
                nome: isFormattedDataCard.nome,
                numero: isFormattedDataCard.cartao
              } as any;

              const isInstallment = isOptionCardPayment === 'CREDIT_CARD' ? Number(isDataPurchase.parcelas) : 1;
              auth3Ds(
                isCartao,
                {
                  total: installment.totalAmount,
                  usuario: user
                },
                isOptionCardPayment,
                isInstallment,
                isSessionPayment,
                (result: any, error: any) => {
                  if (error) {
                    callErrorDialogComponent(error.mensagem ?? 'Ocorreu um erro de comunicação.', TypeEnum.ERROR);
                    setIsLoading(false);
                  }
                  if (result && isDataOrder && isDataOrder.pedido && isDataOrder.pedido.bilhetesPreencher) {
                    const isBodyReservation: IReservation[] = isDataOrder.pedido.bilhetesPreencher.map((i: any, index: number) => {
                      const isFormatted: IReservation = {
                        idTipo: i.idTipo,
                        descricao: i.descricao,
                        nome: isTicketSelectedUser?.find((user, indexUser) => indexUser === index)?.nome ?? isDataOrder?.pedido?.usuario?.nome ?? '',
                        enderecoCobranca: isDataPurchase?.endereco,
                        documento: isTicketSelectedUser?.find((user, indexUser) => indexUser === index)?.documento ?? '',
                        tipoDocumento: isTicketSelectedUser?.find((user, indexUser) => indexUser === index)?.tipoDocumento ?? '',
                        pais: isTicketSelectedUser?.find((user, indexUser) => indexUser === index)?.pais ?? '',
                        cpf: isTicketSelectedUser?.find((user, indexUser) => indexUser === index)?.cpf ?? '',
                        email: isTicketSelectedUser?.find((user, indexUser) => indexUser === index)?.email ?? '',
                        telefone: isTicketSelectedUser?.find((user, indexUser) => indexUser === index)?.telefone?.replace(/\D/g, '') ?? '',
                        dependente: isTicketSelectedUser?.find(user => user.idTipo === i.idTipo)?.filled ?? false,
                        rg: '110919543'
                      };

                      return isFormatted;
                    });

                    isFormattedDataCard.tipoDoCartao = isOptionCardPayment;
                    isFormattedDataCard.token = tokenCard.encryptedCard;
                    isFormattedDataCard.senderHash = isSessionPayment.senderHash;
                    handleSubmitReservation(isBodyReservation, guide, idPurchase, isFormattedDataCard, result.id);
                  }
                }
              );
            } else {
              callErrorDialogComponent('Não foi possível finalizar sua compra.', TypeEnum.ERROR);
            }
          }

          if (isSelectedTypePayment && isSelectedTypePayment.formaPagamento === 'PIX') {
            const isBodyReservation: IReservation[] = isDataOrder.pedido.bilhetesPreencher.map((i: any, index: number) => {
              const isFormatted: IReservation = {
                idTipo: i.idTipo,
                descricao: i.descricao,
                nome: isTicketSelectedUser?.find((user, indexUser) => indexUser === index)?.nome ?? isDataOrder?.pedido?.usuario?.nome ?? '',
                cpf: isTicketSelectedUser?.find((user, indexUser) => indexUser === index)?.cpf ?? '',
                documento: isTicketSelectedUser?.find((user, indexUser) => indexUser === index)?.documento ?? '',
                tipoDocumento: isTicketSelectedUser?.find((user, indexUser) => indexUser === index)?.tipoDocumento ?? '',
                pais: isTicketSelectedUser?.find((user, indexUser) => indexUser === index)?.pais ?? '',
                email: isTicketSelectedUser?.find((user, indexUser) => indexUser === index)?.email ?? '',
                telefone: isTicketSelectedUser?.find((user, indexUser) => indexUser === index)?.telefone?.replace(/\D/g, '') ?? '',
                dependente: isTicketSelectedUser?.find(user => user.idTipo === i.idTipo)?.filled ?? false,
                rg: '110919543'
              };

              return isFormatted;
            });

            isFormattedDataCard.senderHash = isSessionPayment.senderHash;

            handleSubmitReservation(isBodyReservation, guide, idPurchase, isFormattedDataCard);
          }
        } else {
          console.info(isSessionPayment, user, isDataOrder);
          callErrorDialogComponent('Ocorreu um erro de comunicação.', TypeEnum.ERROR);
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);

        callErrorDialogComponent('Ocorreu um erro de comunicação.', TypeEnum.ERROR);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [showErrorDialog, isSelectedTypePayment, isSessionPayment, amount, user, handleSubmitReservation, isOptionCardPayment, isTicketSelectedUser]
  );

  const handleLoadPurchaseFlowTicket = useCallback(
    async (guid: string) => {
      try {
        setIsLoadingOrder(true);
        const result = (await apiTokeUser.get(`${GET_PURCHASE}/${guid}`)) as { data: IOrder };
        if (result.data && result.data.sucesso && result.data.pedido) {
          setIsDataOrder(result.data);
          if (result.data.pedido.bilhetesPreencher) {
            const ticketUser = result.data.pedido.bilhetesPreencher.map((item, index) => {
              if (item.editarCPF || item.editarNome) {
                return {
                  index,
                  idTipo: item.idTipo,
                  filled: true,
                  nomeEvento: item.descricao
                };
              }
              return {
                nome: item.nome,
                telefone: user?.telefone,
                email: item.email,
                cpf: item.cpf,
                index,
                idTipo: item.idTipo,
                filled: false,
                nomeEvento: item.descricao
              };
            }) as TicketSelectUserProps[];
            setIsTicketSelectedUser(ticketUser);
          }
        }
        setIsLoadingOrder(false);
      } catch (err) {
        setIsLoadingOrder(false);
        callErrorDialogComponent('Ocorreu um erro de comunicação.', TypeEnum.ERROR);
      }
    },
    [showErrorDialog, user, setIsDataOrder]
  );

  function transformTicketsCadeiras(tickets: { id: number; qtde: number; ehMeia: boolean | boolean[]; cadeiras?: number[]; lote?: number }): any[] {
    const result = [];
    if (!tickets.cadeiras) {
      return [];
    }
    for (let i = 0; i < tickets.cadeiras.length; i++) {
      const ehMeia = tickets.ehMeia[i];
      const cadeira = tickets.cadeiras[i];
      const newTicket = {
        id: tickets.id,
        qtde: tickets.qtde,
        ehMeia: ehMeia,
        cadeiras: [cadeira],
        lote: (tickets.lote as any)?.id ?? undefined
      };
      result.push(newTicket);
    }
    return result;
  }

  function transformTicketsMesas(tickets: { id: number; qtde: number; ehMeia: boolean | boolean[]; mesas?: number[]; lote?: number }): any[] {
    const result = [];
    if (!tickets.mesas) {
      return [];
    }
    for (let i = 0; i < tickets.mesas.length; i++) {
      const ehMeia = tickets.ehMeia[i];
      const mesa = tickets.mesas[i];
      const newTicket = {
        id: tickets.id,
        qtde: tickets.qtde,
        ehMeia: ehMeia,
        mesas: [mesa],
        lote: (tickets.lote as any)?.id ?? undefined
      };
      result.push(newTicket);
    }
    return result;
  }

  useEffect(() => {
    if (isDataOrder && isDataOrder.pedido) setTICKET_PURCHASE_FROM_API(isDataOrder.pedido as any);
  }, [isDataOrder]);

  const handleSubmitPurchase = useCallback(async () => {
    try {
      const tokenUser = Cache.get({ key: '@tokenUser' });
      console.log('tokenUser', tokenUser);
      if (ticketsPurchase && ticketsPurchase.length > 0 && eventTicket && tokenUser) {
        setIsLoadingOrder(true);
        const isMeiaPurchase = ticketsPurchase
          .map(i => {
            const cadeiras = i.cadeiras
              ?.map((item, index) => {
                if (typeof i.ehMeia !== 'boolean' && i.ehMeia[index] === true) return item;
              })
              .filter(i => i !== undefined);

            const formatted: {
              id: number;
              qtde: number;
              ehMeia: boolean;
              cadeiras?: number[];
              lote?: number;
              mesas?: number[];
            } = {
              id: i.id,
              qtde: i.qtde,
              ehMeia: typeof i.ehMeia === 'boolean' ? i.ehMeia : true
            };
            if (i.lote) {
              formatted.lote = (i.lote as any).id;
            }
            if (i.isTables && i.isTables.length > 0) {
              formatted.mesas = i.isTables;
            }
            if (cadeiras && cadeiras.length > 0) {
              formatted.cadeiras = cadeiras as number[];
            }
            return formatted;
          })
          .filter(i => i !== undefined);

        const isTicketsPurchase = ticketsPurchase
          .map(i => {
            const cadeiras = i.cadeiras
              ?.map((item, index) => {
                if (typeof i.ehMeia !== 'boolean' && i.ehMeia[index] === false) return item;
              })
              .filter(i => i !== undefined) as number[];

            const formatted: {
              id: number;
              qtde: number;
              ehMeia: boolean;
              cadeiras?: number[];
              lote?: number;
              mesas?: number[];
            } = {
              id: i.id,
              qtde: i.qtde,
              ehMeia: typeof i.ehMeia === 'boolean' ? i.ehMeia : false
            };
            if (i.lote) {
              formatted.lote = (i.lote as any).id;
            }
            if (i.isTables && i.isTables.length > 0) {
              formatted.mesas = i.isTables;
            }
            if (cadeiras && cadeiras.length > 0) {
              formatted.cadeiras = cadeiras as number[];
            }
            return formatted;
          })
          .filter(i => i !== undefined);

        // const arrayTickets = [...isTicketsPurchase, ...isMeiaPurchase];

        const isCadeiras = !!ticketsPurchase.find(i => i.cadeiras && i.cadeiras.length > 0);
        const isMesas = !!ticketsPurchase.find(i => i.isTables && i.isTables.length > 0);

        const arrayTickets = isCadeiras
          ? transformTicketsCadeiras(ticketsPurchase[0])
          : isMesas
            ? transformTicketsMesas(ticketsPurchase[0])
            : isTicketsPurchase;

        const uniqueElements = isMesas || isCadeiras ? arrayTickets : arrayTickets;

        const indication = pathName.includes('/indicacao') ? pathName.split('/indicacao/')[1] : undefined;

        const isBody: any = {
          eid: eventTicket.id,
          li: uniqueElements
        };
        if (indication) {
          isBody['ind'] = indication;
        }

        const { data } = await apiTokeUser.post(CREATE_PURCHASE, {
          ...isBody
        });

        if (data.sucesso) {
          const result = (await apiTokeUser.get(`${GET_PURCHASE}/${data.guid}`)) as { data: IOrder };
          if (result.data && result.data.sucesso && result.data.pedido) {
            setIsDataOrder(result.data);
            if (result.data.pedido.bilhetesPreencher) {
              const ticketUser = result.data.pedido.bilhetesPreencher.map((item, index) => {
                if (item.editarCPF || item.editarNome) {
                  return {
                    index,
                    idTipo: item.idTipo,
                    filled: true,
                    nomeEvento: item.descricao
                  };
                }
                return {
                  nome: item.nome,
                  telefone: user?.telefone,
                  email: item.email,
                  cpf: item.cpf,
                  index,
                  idTipo: item.idTipo,
                  filled: false,
                  nomeEvento: item.descricao
                };
              }) as Array<{
                nome?: string;
                telefone?: string;
                email?: string;
                cpf?: string;
                index: number;
                idTipo: number;
                filled: boolean;
                nomeEvento: string;
              }>;
              setIsTicketSelectedUser(ticketUser);
              if (result.data.pedido) {
                setTICKET_PURCHASE_FROM_API(result.data.pedido as any);
              }
            }
          }
          setIsGuidePurchase({
            guide: data.guid,
            id: data.id
          });
        }

        if (!data.sucesso) {
          setIsErrorGuidePurchase(true);
          handleCloseModal();
          callErrorDialogComponent(data.mensagem ?? 'Ocorreu um erro de comunicação.', TypeEnum.ERROR);
          setIsLoadingOrder(false);
        }

        setIsLoadingOrder(false);
      }
    } catch (err: any) {
      setIsLoadingOrder(false);
      callErrorDialogComponent('Ocorreu um erro de comunicação.', TypeEnum.ERROR);
    }
  }, [ticketsPurchase, eventTicket, showErrorDialog, setIsGuidePurchase, setIsErrorGuidePurchase, user, handleCloseModal, setIsDataOrder]);

  const handleSubmitCouponDiscount = useCallback(
    async (isCoupon: string) => {
      try {
        if (guidePurchase) {
          setIsLoadingCouponDiscount(true);
          const { data } = await apiTokeUser.put(`${APLICATION_COUPON_DISCOUNT}/${guidePurchase.guide}/cupomOnline`, {
            cc: isCoupon
          });

          if (data.valorDesconto) {
            setIsCouponApplied({
              valorDesconto: data.valorDesconto,
              coupon: isCoupon
            });
          } else {
            callErrorDialogComponent(data.mensagem, TypeEnum.INFO);
          }
          setIsLoadingCouponDiscount(false);
        }
      } catch (err) {
        setIsLoadingCouponDiscount(false);
        callErrorDialogComponent('Ocorreu um erro de comunicação.', TypeEnum.ERROR);
      }
    },
    [guidePurchase, showErrorDialog]
  );

  const handleRemoveCoupon = useCallback(async () => {
    try {
      if (guidePurchase) {
        setIsLoadingCouponDiscount(true);
        await apiTokeUser.put(`${APLICATION_COUPON_DISCOUNT}/${guidePurchase.guide}/cupomOnline/remova`);

        setIsCouponApplied(undefined);
        setIsLoadingCouponDiscount(false);
      }
    } catch (err) {
      setIsLoadingCouponDiscount(false);
      callErrorDialogComponent('Ocorreu um erro de comunicação.', TypeEnum.ERROR);
    }
  }, [guidePurchase, showErrorDialog]);

  const handleQuantityinstallment = useCallback(
    async (cardBin: string) => {
      try {
        setIsLoadingInstallment(true);

        const isCardBin = cardBin.split(' ').join('').substring(0, 6);
        const { data } = (await apiTokeUser.get(`${GET_INSTALLMENTS}?eid=${eventTicket?.id}&t=${amount}&bin=${isCardBin}`)) as {
          data: { brand: string; installments: InstallmentProps[] };
        };

        if (data.installments && data.installments.length > 0) {
          const installments = [] as IInstallment[];
          data.installments.forEach(installment => {
            installments.push({
              installmentAmount: installment.installment_value,
              interestFree: installment.interest_free,
              quantity: installment.installments,
              totalAmount: installment.amount.value
            });
          });
          setSelectedBrand(data.brand);

          setIsInstallments(installments);
        } else {
          callErrorDialogComponent('Número do cartão é inválido. Verifique', TypeEnum.ERROR);
        }
        setIsLoadingInstallment(false);
      } catch (err: any) {
        setIsLoadingInstallment(false);
        callErrorDialogComponent(err.mensagem ?? 'Ocorreu um erro de comunicação.', TypeEnum.ERROR);
      }
      // setIsLoadingInstallment(false);
    },
    [eventTicket, showErrorDialog, amount, isSessionPayment]
  );

  const handleLoadDataOrder = useCallback(async () => {
    try {
      const { data } = (await apiTokeUser.get(`${GET_PURCHASE}/${isDataOrder?.pedido?.guid}`)) as { data: IOrder };

      if (
        data &&
        data.pedido &&
        data.pedido.pagamento &&
        (data.pedido.pagamento.status === 'APROVADO' || data.pedido.pagamento.status === 'CONCLUIDO')
      ) {
        if (!isWebView) {
          callErrorDialogComponent('Pagamento efetuado com sucesso.', TypeEnum.SUCCESS);
        } else {
          postMessage({
            success: true,
            message: 'Pagamento efetuado com sucesso.'
          });
        }
      }
    } catch (err: any) {
      callErrorDialogComponent(err.mensagem ?? 'Ocorreu um erro de comunicação.', TypeEnum.ERROR);
    }
  }, [showErrorDialog, isDataOrder, isWebView]);

  useEffect(() => {
    setIsSelectedTypePayment({
      formaPagamento: 'CartaoCredito',
      id: 0,
      taxa: 0
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!guidePurchase && !isErrorGuidePurchase && isCheckoutPurchase && showPurchase) {
      handleSubmitPurchase();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isErrorGuidePurchase, guidePurchase, isCheckoutPurchase, showPurchase]);

  useEffect(() => {
    handleCreateSesssionPayment();
  }, [handleCreateSesssionPayment]);

  useEffect(() => {
    let interval: any;
    if (isPaymentPerPix && isPaymentPerPix.sucesso) {
      interval = setInterval(() => {
        handleLoadDataOrder();
      }, 10000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPaymentPerPix, handleLoadDataOrder]);

  return (
    <TicketPurchaseContext.Provider
      value={{
        stepper: isStepper,
        setIsStepper,
        selectedUser: handleSelectedUser,
        clearUser: handleClearUser,
        handleNextStepOne,
        handleSubmitPurchase,
        loading: isLoading,
        purchaseSuccess: isPurchaseSuccess,
        setIsPurchaseSuccess,
        idPurchase: isIdPurchase,
        handleSelectTypePayment,
        selectedPayment: isSelectedTypePayment,
        handleSeletedMethodPayment,
        selectMethodPaymentDebitOnline: isSelectMethodPaymentDebitOnline,
        handleLoadPurchase,
        guide: guidePurchase,
        handleSubmitCouponDiscount,
        loadingCouponDiscount: isLoadingCouponDiscount,
        couponAppliep: isCouponAppliep,
        handleRemoveCoupon,
        setIsGuidePurchase,
        handleQuantityinstallment,
        installments: isInstallments,
        loadinginstallment: isLoadinginstallment,
        setInstallment,
        installment,
        amount,
        dataOrder: isDataOrder,
        setIsCheckoutPurchase,
        isCheckoutPurchase,
        ticketSelectedUser: isTicketSelectedUser,
        loadingOrder: isLoadingOrder,
        loadingSelectUser: isLoadingSelectUser,
        handleLoadPurchaseFlowTicket,
        handleSubmitIngressoCortesia,
        amountWithoutTaxa,
        onChangePaymentCardType: handleChangePaymentCardType,
        optionCardPayment: isOptionCardPayment,
        paymentPerPix: isPaymentPerPix,
        webView: isWebView,
        TICKET_PURCHASE_FROM_API
      }}
    >
      {children}
    </TicketPurchaseContext.Provider>
  );
};

export const useTicketPurchase = (): ITicketPurchase => {
  const context = useContext(TicketPurchaseContext);
  return context;
};
