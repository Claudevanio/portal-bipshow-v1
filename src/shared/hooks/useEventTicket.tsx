'use client'
import React, {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { MapAreas } from 'react-img-mapper';
import {
  GET_CHAIRS, GET_EVENTS, GET_SECTOR_REGIONS, CANCELED_PURCHASE, GET_PURCHASE, apiTokeUser,
  api
} from '@/services';
import router from 'next/router';
import { useRouter, useParams, useSearchParams, usePathname } from 'next/navigation';
import axios from 'axios';
import { useRegister } from './useRegister';
import { useFetch } from './useFetch';
import { useTickets } from './useTickets';
import { useOrders } from './useOrders';
import { IPlace, ISector, ITicket, ITicketPurchase, IValuePerTypePayment, TicketSelectUserProps, IEventTicket as IEventTicketProps, IOrder } from '@/types';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

export type SelectedChairProps = {
  nome: string,
  valor: number,
  taxa: number,
  identifierChair: string,
  chairOnly: string;
  idChair: number;
  idSector: number;
  typeTicket: ITicket;
  number: number;
  valoresPorFormaPagamento?: IValuePerTypePayment;
}

export interface ISectorRanks {
  [key: string]: ISector;
}
interface IEventTicket {
  eventTicket: IEventTicketProps | undefined;
  multipleEventTicket: IEventTicketProps[] | undefined;
  setIsEventTicket: (state: IEventTicketProps | undefined) => void;
  handleFormattedEventTicket: () => void;
  loading: boolean;
  handleSelectTicket: (index: number) => void;
  handleClearTicket: () => void;
  ticket: {
    nome: string | undefined;
    tiposDeIngresso: ITicket[];
    valores: number[];
    data?: Date;
    cor?: string | null;
    idSector?: number;
  } | null;
  ticketFormatted: {
    nome: string | undefined;
    tiposDeIngresso: ITicket[];
    valores: number[];
    data?: Date;
    cor?: string | null;
    idSector?: number;
  }[] | undefined;
  quantity: number;
  setIsQuantity: (state: number) => void;
  handleSelectTicketQuantity: (id: number, quantity: number, index: number, idTable?: number) => void;
  ticketsPurchase: ITicketPurchase[] | undefined;
  setIsTickets: (state: ITicketPurchase[]) => void;
  handleCloseModal: () => void;
  handleShowModal: () => void;
  showPurchase: boolean;
  paymentMethods: number[];
  amount: number;
  handleSelectSector: (id: number, nome: string, href?: string) => void;
  rank: ISectorRanks | undefined;
  nomeSector: string;
  colorSector: string;
  idSector: number | undefined;
  handleSelectChair: (idSector: number, chair: string, number: number, id: number) => void;
  selectedChairs: SelectedChairProps[];
  handleSeletedRemoved: (chair: string) => void;
  handleClearSector: (isMobile?: boolean) => void;
  loadingSector: boolean;
  quantityMaxTypeTicketPerUser: number;
  areas: MapAreas[];
  areasMobile: MapAreas[];
  loadingAreas: boolean;
  selectChair: SelectedChairProps | undefined;
  handleConfirmSelectedChair: (chair: SelectedChairProps) => void;
  handleSelectSectorMobile: (id: number, nome: string, preco: number, idTypeEvent: number) => void;
  selectSectorMobile: { id: number, nome: string, preco: number, idTypeEvent: number } | undefined;
  setIsShowOffcanvas: (state: boolean) => void;
  isShowOffcanvas: boolean;
  handleSelectTicketWithChairs: (chairs: SelectedChairProps[]) => void;
  hrefSector: string | undefined;
  handleSelectSectorRank: (nome: string) => void;
  handleDataMapHTMLTable: (url: string, mesas?: IPlace[]) => Promise<MapAreas[]>;
  setIsTables: (state: number[]) => void;
  isTables: number[];
  quantityTickets: number;
  chairs: any;
  setIsGuidePurchase: (state: {
    id: number;
    guide: string;
  }) => void;
  guidePurchase?: {
    id: number;
    guide: string;
  };
  setIsErrorGuidePurchase: (state: boolean) => void;
  isErrorGuidePurchase: boolean;
  handleSelectTicketWithSelectedSectorInStadium: (category: string) => void;
  setIsDataOrder: React.Dispatch<React.SetStateAction<IOrder | undefined>>;
  isDataOrder?: IOrder;
  setIsTicketSelectedUser: React.Dispatch<React.SetStateAction<TicketSelectUserProps[] | undefined>>;
  isTicketSelectedUser?: TicketSelectUserProps[];
  titularId?: number;
  setTitularId?: (state: number) => void;
  handleEditChair: (chair: SelectedChairProps) => void;
}

const EventTicketContext = createContext({} as IEventTicket);

export const EventTicketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading, authenticationUser } = useRegister();
  const [isEventTicket, setIsEventTicket] = useState<IEventTicketProps | undefined>();
  const [isEventTicketFormatted, setIsEventTicketFormatted] = useState<{
    nome: string | undefined;
    tiposDeIngresso: ITicket[];
    valores: number[];
    idSector?: number;
  }[] | undefined>();
  const [isLoadingEventTicket, setIsLoadingEventTicket] = useState<boolean>(true);
  const [isTicketSelected, setIsTicketSelected] = useState<null | {
    nome: string | undefined;
    tiposDeIngresso: ITicket[];
    valores: number[];
    data?: Date;
    cor?: string;
    idSector?: number;
  }>(null);
  const [isQuantity, setIsQuantity] = useState<number>(0);
  const [titularId, setTitularId] = useState<number>(0);
  const [isTickets, setIsTickets] = useState<ITicketPurchase[]>([]);
  const [isShowPurchase, setIsShowPurchase] = useState<boolean>(false);
  const [isAreas, setIsAreas] = useState<MapAreas[]>([]);
  const [isAreasMobile, setIsAreasMobile] = useState<MapAreas[]>([]);
  const [isLoadingAreas, setIsLoadingAreas] = useState<boolean>(false);
  const [isRank, setIsRank] = useState<ISectorRanks>();
  const [isNomeSector, setIsNomeSector] = useState<string>('');
  const [isColorSector, setIsColorSector] = useState<string>('');
  const [isIdSector, setIsIdSector] = useState<number>();
  const [isSeletedChairs, setIsSeletedChairs] = useState<SelectedChairProps[]>([]);
  const [isSelectChair, setIsSelectChair] = useState<SelectedChairProps>();
  const [isSelectSectorMobile, setIsSelectSectorMobile] = useState<{
    id: number,
    nome: string,
    preco: number,
    idTypeEvent: number,
  }>();
  const [isShowOffcanvas, setIsShowOffcanvas] = useState<boolean>(false);
  const [isLoadingSector, setIsLoadingSector] = useState<boolean>(false);
  const [isHrefSector, setIsHrefSector] = useState<string>();
  const [isTables, setIsTables] = useState<number[]>([]);
  const [isChairs, setIsChairs] = useState<any>();
  const Router = useRouter();
  const id = useParams().id as string;
  const { push } = useRouter();
  const { data } = useFetch<IEventTicketProps>(`${GET_EVENTS}/${id}/online`, 'site');
  
  const query = useSearchParams();
  const pathName = usePathname();

  const eventosMultipleIds = query.get('eventosIds')?.split('-') ?? undefined;
  const { tokenUser, guid } = query as any;
  
  const [multipleData, setMultipleData] = useState<IEventTicketProps[]>([])
  useEffect(() => {
    if (eventosMultipleIds) {
      if(multipleData.length > 0 && multipleData[0].id === Number(id))
        return
      const fetchMultipleData = async () => {
        const data = await Promise.all(eventosMultipleIds.map(async (id) => {
          const { data } = await api.get(`${GET_EVENTS}/${id}/online`) as { data: IEventTicketProps }
          return data
        }))
        setMultipleData(data)
      }
      fetchMultipleData()
    }
  }, [eventosMultipleIds, apiTokeUser])

  const [isGuidePurchase, setIsGuidePurchase] = useState<{
    id: number;
    guide: string;
  }>();
  const [isErrorGuidePurchase, setIsErrorGuidePurchase] = useState<boolean>(false);
  const [isDataOrder, setIsDataOrder] = useState<IOrder>();
  const [isTicketSelectedUser, setIsTicketSelectedUser] = useState<TicketSelectUserProps[]>();

  const handleCanceledReservation = useCallback(async () => {
    if (isGuidePurchase) {
      await apiTokeUser.post(`${CANCELED_PURCHASE}/${isGuidePurchase.guide}/reserva/cancele`);
    }
  }, [isGuidePurchase]);

  const { handleClearInfoTicket } = useTickets();
  const { handleClearInfoTicket: handleClearOrderInfoTicket } = useOrders();
  


  const handleClose = () => {
    setIsShowPurchase(false);
    setIsErrorGuidePurchase(false);
    setIsGuidePurchase(undefined);
    handleCanceledReservation();
  };
  const handleShow = () => setIsShowPurchase(true);

  const handleFormattedEventTicket = useCallback(() => {

    
    const eventType = [] as Array<{
      nome: string | undefined;
      tiposDeIngresso: ITicket[];
      valores: number[];
      data?: Date;
      cor?: string | null;
      idSector?: number;
    }>;

    const { sucesso } = data as any;

    if (sucesso === false) {
      if (handleClearInfoTicket) {
        handleClearInfoTicket();
      } else if (handleClearOrderInfoTicket) {
        handleClearOrderInfoTicket();
      }
    }

    if (data && data.tiposDeIngresso) {
      data.tiposDeIngresso.forEach((item: any) => {
        const setorCor = data.local?.setores?.find((i) => i.id === item.setor?.id);
        const isExists = eventType.findIndex((i) => i.nome === item.categoriaVenda);
        if (isExists !== -1) {
          eventType[isExists] = {
            ...eventType[isExists],
            valores: [
              ...eventType[isExists].valores,
              Number(item.valorUnitario),
            ],
            tiposDeIngresso: [
              ...eventType[isExists].tiposDeIngresso,
              {
                ...item,
              },
            ],
            data: item?.dias && item?.dias.length > 0 ? new Date(dayjs(item?.dias[0].dia).add(2,'hours') as any) : new Date(dayjs(data?.dataRealizacao?.split(' ')[0]).add(2, 'hours') as any) ?? new Date(dayjs(data?.dataRealizacao?.split(' ')[0]).add(2, 'hours')  as any) ,
            cor: setorCor?.cor,
            idSector: item.setor?.id,
          };
        } else {
          eventType.push({
            nome: item.categoriaVenda,
            tiposDeIngresso: [item],
            valores: [Number(item.valorUnitario)],
            data: item?.dias && item?.dias.length > 0 ? new Date(dayjs(item?.dias[0].dia).add(2,'hours') as any) : new Date(dayjs(data?.dataRealizacao?.split(' ')[0]).add(2, 'hours')  as any)?? new Date(dayjs(data?.dataRealizacao?.split(' ')[0]).add(2, 'hours')  as any),
            cor: setorCor?.cor,
            idSector: item.setor?.id,
          });
        }
      });
    }

    setIsEventTicket(data);
    setIsEventTicketFormatted(eventType);
    setIsLoadingEventTicket(false);
  }, [data]);

  const handleSelectTicketWithSelectedSectorInStadium = useCallback((category: string) => {
    if (isEventTicketFormatted) {
      const findTicketSelected = isEventTicketFormatted.find((item) => item.nome === category);

      if (findTicketSelected) {
        if (isTicketSelected && isTicketSelected?.nome === category) {
          setIsTicketSelected(null);
          setIsAreas((current) => current.map((i) => {
            return {
              ...i,
              preFillColor: '',
            };
          }));
        } else {
          setIsTicketSelected(findTicketSelected);
          setIsAreas((current) => current.map((i) => {
            if (i.href === category) {
              return {
                ...i,
                preFillColor: '#4B16C9',
              };
            }
            return {
              ...i,
              preFillColor: '',
            };
          }));
        }
      }
    }
  }, [isEventTicketFormatted, isTicketSelected]);

  const handleSelectTicket = useCallback((index: number) => {
    if (isEventTicketFormatted && isEventTicketFormatted.length > 0) {
      setIsTicketSelected(isEventTicketFormatted[index]);
    }
  }, [isEventTicketFormatted]);

  const handleSelectTicketQuantity = useCallback((id: number, quantity: number, index: number, idTable?: number) => {
    const ticket = isTicketSelected?.tiposDeIngresso.find((i, isIndex) => isIndex === index);

    if (ticket) {
      const findTicket = isTickets.find((i) => i.singleId === `${ticket.nome}${index}`);

      if (findTicket && findTicket.id === id) {
        if (quantity) {
          setIsTickets(isTickets.map((i) => {
            if (i.singleId === `${ticket.nome}${index}`) {
              return {
                id,
                qtde: quantity,
                lote: ticket.lotes && ticket.lotes.length > 0 ? ticket.lotes[0] : null,
                index,
                singleId: `${ticket.nome}${index}`,
                valor: Number(ticket.valorUnitario),
                nome: ticket.nome,
                ehMeia: Boolean(ticket.ehMeia),
                isTables: idTable ? [...i.isTables || [], idTable] : [...i.isTables || []],
                valoresPorFormaPagamento: ticket.valoresPorFormaPagamento,
                taxaPadrao: !ticket.exibirTaxaSomada ? Number(ticket.taxaFixa || 0) + Number(ticket.taxaConveniencia || 0) + Number(ticket.taxaServico || 0) : 0,
              } as ITicketPurchase;
            }

            return i;
          }));
        } else {
          setIsTickets(isTickets.filter((i) => i.singleId !== `${ticket.nome}${index}`));
        }
      } else {
        setIsTickets([
          ...isTickets,
          {
            id,
            qtde: quantity,
            lote: ticket.lotes && ticket.lotes.length > 0 ? ticket.lotes[0] : null,
            nome: ticket.nome,
            index,
            singleId: `${ticket.nome}${index}`,
            valor: Number(ticket.valorUnitario),
            ehMeia: Boolean(ticket.ehMeia),
            isTables: idTable ? [idTable] : [],
            valoresPorFormaPagamento: ticket.valoresPorFormaPagamento,
            taxaPadrao: !ticket.exibirTaxaSomada ? Number(ticket.taxaFixa || 0) + Number(ticket.taxaConveniencia || 0) + Number(ticket.taxaServico || 0) : 0,
          },
        ]);
      }
    }
  }, [isTicketSelected, isTickets]);

  const handleSelectTicketWithChairs = useCallback(
    (chairs: SelectedChairProps[]) => {
      if (
        isEventTicket &&
        isEventTicket.tiposDeIngresso &&
        isEventTicket.tiposDeIngresso.length > 0
      ) {
        // debugger;
        const formattedTicketsPerPurchase = [] as ITicketPurchase[];
        chairs.forEach((item, index) => {
          const findIdTypeTicket = item.typeTicket
          if (findIdTypeTicket) {
            const findChairExist =
              formattedTicketsPerPurchase.findIndex(
                (e) => e.id === findIdTypeTicket.id
              );
            if (findChairExist !== -1) {
              formattedTicketsPerPurchase[findChairExist] = {
                ...formattedTicketsPerPurchase[findChairExist],
                ehMeia: [...(formattedTicketsPerPurchase[findChairExist].ehMeia as any), Boolean(findIdTypeTicket.ehMeia)],
                valor:
                  ((
                    formattedTicketsPerPurchase[
                      findChairExist
                    ].cadeiras as number[]
                  ).length +
                    1) *
                  item.valor,
                cadeiras: [
                  ...(formattedTicketsPerPurchase[
                    findChairExist
                  ].cadeiras as number[]),
                  item.idChair,
                ],
              };

              return;
            }
            
            formattedTicketsPerPurchase.push({
              ehMeia: [Boolean(findIdTypeTicket.ehMeia)],
              id: Number(findIdTypeTicket.id),
              index,
              qtde: 1,
              valor: item.valor,
              singleId: `${findIdTypeTicket.nome}${index}`,
              cadeiras: [item.idChair],
              lote:
                findIdTypeTicket.lotes &&
                  findIdTypeTicket.lotes.length > 0
                  ? findIdTypeTicket.lotes[0]
                  : null,
              nome: findIdTypeTicket.nome,
              valoresPorFormaPagamento:
                findIdTypeTicket.valoresPorFormaPagamento,
              taxaPadrao: !findIdTypeTicket.exibirTaxaSomada
                ? Number(findIdTypeTicket.taxaFixa || 0) +
                Number(
                  findIdTypeTicket.taxaConveniencia || 0
                ) +
                Number(findIdTypeTicket.taxaServico || 0)
                : 0,
            });
          }
        });

        setIsTickets(formattedTicketsPerPurchase);
        handleShow();
      }
    },
    [isEventTicket]
  );

  const handleClearTicket = useCallback(() => {
    setIsTicketSelected(null);
  }, []);

  const handleSelectSector = useCallback(async (id: number, nome: string, href?: string) => {
    try {
      // debugger;
      setIsLoadingSector(true);
      const { data } = await apiTokeUser.get(`${GET_SECTOR_REGIONS}/${id}`) as { data: any } as { data: ISectorRanks };
      const result = await apiTokeUser.get(`${GET_CHAIRS}/${isEventTicket?.id}/${id}`) as { data: { cadeiras: any } };

      setIsChairs(result.data.cadeiras);
      if (href) {
        const isHref = Object.keys(data).find((i) => i.toLowerCase() === href.toLowerCase());
        setIsHrefSector(isHref);
      } else {
        setIsHrefSector(Object.keys(data)[0]);
      }

      setIsRank(data);
      setIsNomeSector(nome);
      setIsColorSector(isEventTicket?.local?.setores?.find((i) => i.id === id)?.cor ?? '#09C8F8');
      setIsIdSector(id);
      setIsLoadingSector(false);
    } catch (error) {
      setIsLoadingSector(false);
      toast.error('Ocorreu um erro de comunicação.');
    }
  }, [toast, isEventTicket]);

  const handleSelectSectorMobile = useCallback((id: number, nome: string, preco: number, idTypeEvent: number) => {
    setIsSelectSectorMobile({
      id,
      nome,
      preco,
      idTypeEvent,
    });
  }, []);

  const handleClearSector = useCallback((isMobile?: boolean) => {
    setIsRank(undefined);
    setIsSeletedChairs([]);
    setIsSelectChair(undefined);
    setIsIdSector(undefined);
    setIsNomeSector("");
    setIsColorSector("");

    if (isMobile) {
      setIsSeletedChairs([]);
      setIsSelectChair(undefined);
    }
  }, []);

  const handleSelectSectorRank = useCallback((nome: string) => {
    setIsHrefSector(nome);
  }, []);

  const handleSeletedRemoved = useCallback((chair: string) => {
    const removedChair = isSeletedChairs.filter((item) => item.identifierChair !== chair);

    setIsSeletedChairs(removedChair);
  }, [isSeletedChairs]);

  const handleEditChair = useCallback((chair: SelectedChairProps) => {
    const findChair = isSeletedChairs.findIndex((item) => item.identifierChair === chair.identifierChair);

    const updatedChairs = isSeletedChairs.map((item, index) => {
      if (index === findChair) {
        return chair;
      }

      return item;
    });

    setIsSeletedChairs(updatedChairs);
  }, [isSeletedChairs]);

  const quantityMaxTypeTicketPerUser = useMemo((): number => {
    if (isEventTicket && isEventTicket.tiposDeIngresso) {
      const findTypeTicket = isEventTicket.tiposDeIngresso.find((item) => item?.setor?.id === isIdSector);

      if (findTypeTicket) {
        return findTypeTicket.limitePorUsuario > Number(findTypeTicket?.totalDisponivel) || Number(isEventTicket.maxBilhetePorUsuario || 0) > Number(findTypeTicket.totalDisponivel) ? findTypeTicket.totalDisponivel : (findTypeTicket.limitePorIngresso ? findTypeTicket.limitePorIngresso : Number(isEventTicket.maxBilhetePorUsuario || 0));
      }
    }

    return Number(isEventTicket?.maxBilhetePorUsuario);
  }, [isIdSector, isEventTicket]);

  const handleConfirmSelectedChair = useCallback((selectedChair: SelectedChairProps) => {
    setIsSeletedChairs([
      ...isSeletedChairs,
      selectedChair,
    ]);
  }, [isSeletedChairs]);

  const handleSelectChair = useCallback((idSector: number, chair: string, number: number, idChair: number) => {
    // debugger;
    console.log(isChairs)
    if (isEventTicket) {
      if (isSeletedChairs.find((item) => item.identifierChair === `${chair} - ${idSector}`)) {
        handleSeletedRemoved(`${chair} - ${idSector}`);
        return;
      }

      if (isSeletedChairs.length >= quantityMaxTypeTicketPerUser) {
        toast.info(`Você tem um limite de ${quantityMaxTypeTicketPerUser} ingressos. Verifique`);
        return;
      }

      const findTypeTicket = isEventTicket.tiposDeIngresso?.find((item) => item?.setor?.id === idSector);

      const formatted = {
        nome: `${chair} - ${findTypeTicket?.nome}`,
        valor: Number(findTypeTicket?.valorUnitario),
        taxa: Number(findTypeTicket?.taxaConveniencia) + Number(findTypeTicket?.taxaFixa) + Number(findTypeTicket?.taxaServico),
        identifierChair: `${chair} - ${idSector}`,
        chairOnly: chair,
        idChair,
        typeTicket: findTypeTicket,
        valoresPorFormaPagamento: findTypeTicket?.valoresPorFormaPagamento,
        idSector,
        number,
      } as SelectedChairProps;
      setIsSelectChair(formatted);

      handleConfirmSelectedChair(formatted);
    }
  }, [isEventTicket, isSeletedChairs, handleSeletedRemoved, quantityMaxTypeTicketPerUser, toast]);

  const handleDataMapHTMLTable = useCallback(async (url: string, mesas?: IPlace[]): Promise<MapAreas[]> => {
    const { data } = await axios.get(`${process.env.URL_API}${url}`); // html as text

    const doc = new DOMParser().parseFromString(data, 'text/html');
    const areas = [] as MapAreas[];

    doc.body.querySelectorAll('area').forEach((item) => {
      areas.push({
        shape: 'rect',
        coords: String(item.coords).split(',').map((item) => Number(item)) as number[],
        href: item.target.split('#')[0],
        strokeColor: 'transparent',
        preFillColor: mesas && mesas.find((i) => Number(item.target.split('#')[0]) === i.numero)?.reservado ? '#3d77ce' : '#19D26E',
        lineWidth: 0,
        active: mesas && mesas.find((i) => Number(item.target.split('#')[0]) === i.numero)?.reservado ? true : false,
        disabled: mesas && mesas.find((i) => Number(item.target.split('#')[0]) === i.numero)?.reservado,
      });
    });

    return areas as MapAreas[];
  }, []);

  const handleLoadHtmlMap = useCallback(async () => {
    setIsLoadingAreas(true);

    const { data } = await axios.get(`${process.env.URL_API}${isEventTicket?.local?.mapa?.grande ? isEventTicket?.local?.mapa?.grande.coordenadas : isEventTicket?.local?.mapa?.coordenadas}`); // html as text
    const { data: dataMobile } = await axios.get(`${process.env.URL_API}${isEventTicket?.local?.mapa?.pequeno ? isEventTicket?.local?.mapa?.pequeno.coordenadas : isEventTicket?.local?.mapa?.coordenadas}`); // html as text

    const doc = new DOMParser().parseFromString(data, 'text/html');
    const areas = [] as MapAreas[];

    const docMobile = new DOMParser().parseFromString(dataMobile, 'text/html');
    const areasMobile = [] as MapAreas[];

    doc.body.querySelectorAll('area').forEach((item) => {
      areas.push({
        shape: item.shape,
        coords: String(item.coords).split(',').map((item) => Number(item)) as number[],
        id: String(item.getAttribute('setor')),
        href: String(item.target).replace('#', ''),
      });
    });

    docMobile.body.querySelectorAll('area').forEach((item) => {
      areasMobile.push({
        shape: item.shape,
        coords: String(item.coords).split(',').map((item) => Number(item)) as number[],
        id: String(item.getAttribute('setor')),
        href: String(item.target).replace('#', ''),
      });
    });

    setIsAreas(areas);
    setIsAreasMobile(areasMobile);
    setIsLoadingAreas(false);
  }, [isEventTicket]);

  function resetPurchaseAndSelected(){
    setIsTickets([])
    setIsTicketSelected(null)
    setIsShowPurchase(false)
    setIsSeletedChairs([])  
    setIsSelectChair(undefined)
    setIsAreas([])
    setIsAreasMobile([])
    setIsRank(undefined)
    setIsNomeSector('')
    setIsColorSector('')
    setIsIdSector(undefined)
    setIsSelectSectorMobile(undefined)
    setIsShowOffcanvas(false)
    setIsLoadingSector(false)
    setIsHrefSector(undefined)
    setIsTables([])
    setIsChairs(undefined)
    setIsGuidePurchase(undefined)
    setIsErrorGuidePurchase(false)
    setIsDataOrder(undefined)
  }

  useEffect(() => {
    if(!isEventTicket?.id) return

    if (pathName !== `/evento/${isEventTicket?.id}` || !isShowPurchase) {
      resetPurchaseAndSelected()
    }
  }, [pathName, isEventTicket?.id, isShowPurchase])


  const handleLoadOrder = useCallback(async (guid: string) => {
    try {
      // debugger;

      const { data } = await apiTokeUser.get(`${GET_PURCHASE}/${guid}`) as { data: IOrder };

      if (data.pedido && data.pedido.ingressos) {
        const isTicketWebview = data.pedido.ingressos.map((i, index) => {
          return {
            ehMeia: i.ehMeia,
            id: i.id,
            index,
            qtde: i.qtde,
            valor: i.valorUnitario,
            cadeiras: i.cadeira?.id ? [i.cadeira?.id] : undefined,
            isTables: i.tipoDeIngresso?.mesas ? i.tipoDeIngresso?.mesas.map((mesa) => mesa.id) : undefined,
            lote: i.tipoDeIngresso?.lotes && i.tipoDeIngresso?.lotes.length > 0 ? i.tipoDeIngresso?.lotes[0] : undefined,
            nome: i.nome,
            user: data.pedido?.usuario,
          } as ITicketPurchase;
        });

        setIsGuidePurchase({
          guide: data.pedido.guid,
          id: data.pedido.id,
        });
        setIsTickets(isTicketWebview);
        setIsDataOrder(data);
      } else {
        toast.info(data.mensagem ?? 'Ocorreu um erro de comunicação.');
      }
    } catch (err: any) {

    }
  }, [toast]);

  const handleInsertTitulares = useCallback(async (isTitulares: string) => {
    // debugger;
    const api = axios.create({
      baseURL: process.env.URL_API_TITULARES,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { data }: any = await api.get(`/titular/${parseInt(isTitulares)}/1a2b3c4d5e`);

    setTitularId(data.id);

    setIsTicketSelectedUser(data.titulares.map((titular: any, index: any) => ({
      index,
      cpf: titular.cpf,
      email: titular.email,
      idTipo: titular.idtipoIngresso,
      nome: titular.nome,
      telefone: titular.telefone,
    })));
  }, []);

  const paymentMethods = useMemo((): number[] => {
    const quantityInstallments = [];

    if (isEventTicket && isEventTicket.taxas && isEventTicket.taxas.length > 1 && isEventTicket.taxas[1].qtdeParcelas) {
      for (let i = 1; i <= isEventTicket.taxas[1].qtdeParcelas; i += 1) {
        quantityInstallments.push(i);
      }
    } else {
      quantityInstallments.push(1);
    }

    return quantityInstallments;
  }, [isEventTicket]);

  const amount = useMemo(() => {
    let isAmount = 0 as number;

    isTickets.forEach((i) => {
      const addAmount = i.valor * i.qtde;
      isAmount += addAmount;
    });

    return isAmount;
  }, [isTickets]);

  const isQuantityTicketPurchase = useMemo(() => {
    let quantity = 0;

    isTickets.forEach((item) => {
      quantity += item.qtde;
    });

    return quantity;
  }, [isTickets]);

  useEffect(() => {
    if (data && !isLoading) {
      handleFormattedEventTicket();
    }
  }, [handleFormattedEventTicket, data, isLoading, push, id]);

  useEffect(() => {
    if (isEventTicket && (isEventTicket.exibirCadeiras || isEventTicket.local)) {
      handleLoadHtmlMap();
    }
  }, [isEventTicket, handleLoadHtmlMap]);

  useEffect(() => {
    if (tokenUser && guid && authenticationUser) {
      handleShow();
      handleLoadOrder(guid as string);
      if (query.get('titularesId')) {
        handleInsertTitulares(query.get('titularesId') as string);
      }
      if (router?.query?.titularesId) {
        handleInsertTitulares(router?.query?.titularesId as any);
      }
    }
  }, [tokenUser, guid, handleLoadOrder, authenticationUser, handleInsertTitulares, query]);

  const handleSetIsEventTicket = useCallback((state: IEventTicketProps | undefined) => {
    setIsEventTicket(state);
  }, []);

  return (
    <EventTicketContext.Provider value={{
      eventTicket: isEventTicket,
      setIsEventTicket: handleSetIsEventTicket,
      multipleEventTicket: multipleData,
      handleFormattedEventTicket,
      loading: isLoadingEventTicket,
      handleSelectTicket,
      handleClearTicket,
      ticket: isTicketSelected,
      ticketFormatted: isEventTicketFormatted,
      quantity: isQuantity,
      setIsQuantity,
      handleSelectTicketQuantity,
      ticketsPurchase: isTickets,
      setIsTickets,
      handleCloseModal: handleClose,
      handleShowModal: handleShow,
      showPurchase: isShowPurchase,
      paymentMethods,
      amount,
      handleSelectSector,
      rank: isRank,
      nomeSector: isNomeSector,
      colorSector: isColorSector,
      idSector: isIdSector,
      handleSelectChair,
      selectedChairs: isSeletedChairs,
      handleSeletedRemoved,
      handleClearSector,
      loadingSector: isLoadingSector,
      quantityMaxTypeTicketPerUser,
      areas: isAreas,
      loadingAreas: isLoadingAreas,
      selectChair: isSelectChair,
      handleConfirmSelectedChair,
      handleSelectSectorMobile,
      selectSectorMobile: isSelectSectorMobile,
      setIsShowOffcanvas,
      isShowOffcanvas,
      handleSelectTicketWithChairs,
      hrefSector: isHrefSector,
      handleSelectSectorRank,
      areasMobile: isAreasMobile,
      handleDataMapHTMLTable,
      setIsTables,
      isTables,
      quantityTickets: isQuantityTicketPurchase,
      chairs: isChairs,
      setIsGuidePurchase,
      guidePurchase: isGuidePurchase,
      setIsErrorGuidePurchase,
      isErrorGuidePurchase,
      handleSelectTicketWithSelectedSectorInStadium,
      setIsDataOrder,
      isDataOrder,
      setIsTicketSelectedUser,
      isTicketSelectedUser,
      titularId,
      handleEditChair
    }}
    >
      {children}
    </EventTicketContext.Provider>
  );
};

export const useEventTicket = (): IEventTicket => {
  const context = useContext(EventTicketContext);
  return context;
};
