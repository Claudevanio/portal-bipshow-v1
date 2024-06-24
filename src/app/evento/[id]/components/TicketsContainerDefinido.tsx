'use client';
import { Button, GradientBorder } from '@/components';
import { Event } from '@/types';
import { Add, Delete, Edit, KeyboardArrowLeft, KeyboardArrowRight, Remove } from '@mui/icons-material';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ptBr from 'dayjs/locale/pt-br';
import { EventMockList } from '@/utils/event-mock';
import { HTMLMap } from '@/components/Tickets/TicketMap/HTMLMap';
import { useEventTicket } from '@/shared/hooks';
import { IAction } from '@/components/Tickets/ActionTicket/Ticket/Action/interface';
import { SelectedSector } from '@/components/Tickets/TicketMap/ActionSectorOrChair/SelectedSector';
import { Divider, Menu, MenuItem, Select } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';

dayjs.locale(ptBr);

function SingleTicketCard(singleTicket: IAction) {
  const {
    nome,
    qtd,
    taxaFixa = 0,
    taxaServico = 0,
    taxaConveniencia = 0,
    valor = 0,
    limitePorUsuario = 0,
    totalDisponivel = 0,
    id,
    index,
    tipo,
    mapa,
    description,
    mesas,
    exibirTaxaSomada
  } = singleTicket;

  const isTaxa = useMemo(() => Boolean(taxaFixa || taxaServico || taxaConveniencia), [taxaServico, taxaFixa, taxaConveniencia]);
  const { eventTicket, handleSelectTicketQuantity, ticketsPurchase } = useEventTicket();
  const [isQuantity, setIsQuantity] = useState<number>(ticketsPurchase?.find(i => i.singleId === `${nome}${index}`)?.qtde || 0);
  // const [isShowModalTypeTicket, setIsShowModalTypeTicket] = useState<boolean>(false);

  const quantityMax = useMemo((): number => {
    const max =
      limitePorUsuario > totalDisponivel || Number(eventTicket?.maxBilhetePorUsuario || 0) > totalDisponivel
        ? totalDisponivel
        : ((limitePorUsuario ? limitePorUsuario : Number(eventTicket?.maxBilhetePorUsuario || 0)) as number);

    return max;
  }, [totalDisponivel, limitePorUsuario, eventTicket]);

  const handleChangeQTD = useCallback(
    (type: 'next' | 'prev', idTable?: number) => {
      if (type === 'next' && isQuantity <= (quantityMax || 0) && id) {
        setIsQuantity(isQuantity + 1);
        if (idTable) {
          handleSelectTicketQuantity(id, isQuantity + 1, index, idTable);
        } else {
          handleSelectTicketQuantity(id, isQuantity + 1, index);
        }
      }
      if (type === 'prev' && isQuantity >= 0 && id) {
        setIsQuantity(isQuantity - 1);
        handleSelectTicketQuantity(id, isQuantity - 1, index);
      }
    },
    [isQuantity, setIsQuantity, quantityMax, id, handleSelectTicketQuantity, index]
  );

  const quantityTables = useMemo(() => {
    if (ticketsPurchase && tipo === 'mesa') {
      return ticketsPurchase.find(i => i.id === id)?.qtde;
    }
    return 0;
  }, [ticketsPurchase, tipo, id]);

  return (
    <li className="flex items-center justify-between w-full">
      <div>
        <p className="text-xs w-24 max-w-24 text-ellipsis overflow-hidden whitespace-nowrap font-semibold text-softBlue">{nome}</p>
        <p className="text-xs font-semibold text-textPrimary uppercase">{tipo}</p>
      </div>
      <div>
        <p className="text-sm font-bold text-textPrimary ">
          {valor > 0 && (
            <>
              <span className="text-xs font-semibold">R$</span>{' '}
              {Number(valor).toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{' '}
            </>
          )}{' '}
          {valor === 0 && 'Grátis'}
        </p>
        <p className="text-xxs font-semibold text-darkBlue whitespace-nowrap">
          (+{Number(taxaFixa + taxaServico + taxaConveniencia).toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} de
          taxa)
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Remove
          className={'text-white p-1 rounded-full bg-[#53AFED] cursor-pointer' + (isQuantity === 0 ? ' opacity-50 cursor-not-allowed' : '')}
          onClick={() => {
            if (isQuantity === 0) return;
            handleChangeQTD('prev');
          }}
        />
        <p>{isQuantity}</p>
        <Add
          className={
            'text-white p-1 rounded-full bg-[#53AFED]  cursor-pointer' + (isQuantity === quantityMax ? ' opacity-50 cursor-not-allowed' : '')
          }
          onClick={() => {
            if (isQuantity === quantityMax) return;
            handleChangeQTD('next');
          }}
        />
      </div>
    </li>
  );
}

export function TicketsContainerDefinido({ currentEvent }: { currentEvent?: Event }) {
  const router = useRouter();
  const queryParams = useSearchParams();
  const eventosIds = queryParams.get('eventosIds');

  const { ticket, eventTicket, ticketsPurchase, chairs, rank } = useEventTicket();

  const {
    handleClearTicket,
    ticketFormatted,
    handleSelectTicket,
    quantity,
    quantityTickets,
    setIsQuantity,
    handleSelectSector,
    handleEditChair,
    handleShowModal
  } = useEventTicket();

  const [quantityPerTicket, setQuantityPerTicket] = useState<number[]>();

  const totalPrice = useMemo(() => {
    let isTotalPrice = 0;

    ticketsPurchase?.forEach((i, index) => {
      isTotalPrice += i.valor * i.qtde;
    });

    return isTotalPrice;
  }, [ticketsPurchase]);

  const [selectedTicket, setSelectedTicket] = useState<any>(null);

  const [selectedSector, setSelectedSector] = useState<any>(null);

  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    if (selectedTicket) {
      const tickets =
        EventMockList.find(event => event.id === currentEvent?.id)?.tickets?.map(item =>
          new Date(item.date).getDate() === new Date(selectedTicket.date).getDate() ? item : null
        ) || [];
      const ticketsFiltered = tickets.filter(item => item !== null).map(item => ({ ...item, quantity: 0 }));
      setCartItems(ticketsFiltered);
    }
    if (!selectedTicket) {
      setCartItems([]);
    }
  }, [selectedTicket, currentEvent]);

  const {
    nomeSector,
    selectedChairs,
    handleSeletedRemoved,
    handleClearSector,
    handleSelectTicketWithChairs,
    idSector,
    colorSector,
    multipleEventTicket
  } = useEventTicket();

  const totalSelectedValue = useMemo((): number => {
    let total = 0 as number;

    selectedChairs.forEach(item => {
      total += item.valor;
    });

    return total;
  }, [selectedChairs]);

  const [anchorEl, setAnchorEl] = useState<any>();
  const [selectedItem, setSelectedItem] = useState<any>();

  const handleClick = (event: any, item: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleClose = () => {
    setAnchorEl(undefined);
    setSelectedItem(undefined);
  };

  const emptySectorMap = rank && Object.entries(rank).length <= 0;

  return (
    <GradientBorder>
      <div className="flex w-full gap-6 flex-col 2xl:flex-row ">
        <div className="flex flex-col w-full gap-4 p-2">
          <h3 className="flex text-tertiary gap-3 font-semibold border-b-2 border-gray pb-4 ">
            <Image src={'/Ticket.svg'} alt="ingresso" height={20} width={20} /> Ingressos
          </h3>

          <ul className="flex gap-4 items-center border-b-2 border-gray ">
            {multipleEventTicket && multipleEventTicket?.length > 0 ? (
              multipleEventTicket.map((item, index) => (
                <li
                  key={index}
                  className="flex pb-3"
                  onClick={() => {
                    router.push(`/evento/${item.id}${eventosIds ? `?eventosIds=${eventosIds}` : ''}`);
                  }}
                >
                  {index !== 0 && <Divider orientation="vertical" flexItem />}
                  <div
                    className={`flex items-center gap-1 text-textPrimary px-3 py-1 rounded-lg hover:bg-gray cursor-pointer ${item.id === eventTicket?.id ? ' bg-gray !text-softBlue' : 'font-normal'}`}
                  >
                    <p className="font-bold text-3xl">{dayjs(item?.dataRealizacao).format('DD')}</p>
                    <div className="flex flex-col gap-0 ">
                      <p>{dayjs(item?.dataRealizacao).format('MMM').toUpperCase()}</p>
                      <p className="text-[9.6px] first-letter:uppercase">{dayjs(item?.dataRealizacao).format('dddd').replace('-feira', '')}</p>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="flex pb-3">
                <div
                  className={`flex items-center gap-1 text-textPrimary px-3 py-1 rounded-lg hover:bg-gray cursor-pointer ${true ? ' bg-gray !text-softBlue' : 'font-normal'}`}
                >
                  <p className="font-bold text-3xl">{dayjs(eventTicket?.dataRealizacao).format('DD')}</p>
                  <div className="flex flex-col gap-0 ">
                    <p>{dayjs(eventTicket?.dataRealizacao).format('MMM').toUpperCase()}</p>
                    <p className="text-[9.6px] first-letter:uppercase">{dayjs(eventTicket?.dataRealizacao).format('dddd').replace('-feira', '')}</p>
                  </div>
                </div>
              </li>
            )}
          </ul>
          {!idSector && (
            <>
              <p className="text-textPrimary text-sm">Selecione o setor que deseja comprar os ingressos</p>
              <ul className="flex flex-col gap-4 text-textPrimary font-medium">
                {ticketFormatted &&
                  ticketFormatted.length > 0 &&
                  ticketFormatted.map((item, index, arr) => (
                    <li
                      className={'flex items-center justify-between ' + (index + 1 !== arr.length ? 'border-b-2 border-gray pb-4' : '')}
                      key={index}
                    >
                      <div className="w-full flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <div className="min-w-5 w-5 h-5 rounded-md" style={{ background: item?.cor ?? '#040' }}></div>
                          {item.nome}
                        </div>
                        <div className="flex flex-col text-xs font-normal">
                          {item.valores.length <= 1 ? `Preço de ` : `Preços entre `}
                          <h4 className="font-medium text-sm">
                            {item.valores.length > 1 &&
                              `
                    ${item.valores[0].toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                      style: 'currency',
                      currency: 'BRL'
                    })} e ${item.valores[item.valores.length - 1].toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                      style: 'currency',
                      currency: 'BRL'
                    })}`}
                            {item.valores.length <= 1 &&
                              ` ${item.valores[0].toLocaleString('pt-BR', {
                                minimumFractionDigits: 2,
                                style: 'currency',
                                currency: 'BRL'
                              })}`}
                          </h4>
                        </div>
                      </div>
                      <KeyboardArrowRight
                        onClick={() => {
                          if (!eventTicket?.local?.mapa || !eventTicket?.exibirCadeiras) {
                            handleSelectTicket(index);
                          }
                          if (item.idSector && item.nome) {
                            handleSelectSector(item.idSector, item.nome, '');
                            return;
                          }
                        }}
                        className="!text-blue cursor-pointer"
                      />
                    </li>
                  ))}
              </ul>
            </>
          )}
          {idSector &&
            eventTicket?.local?.mapa &&
            !emptySectorMap &&
            (selectedChairs && selectedChairs.length > 0 ? (
              <div className=" hidden md:flex flex-col gap-4 p-2 text-textPrimary font-medium">
                <div className="flex items-center justify-between gap-8 border-b-2 pb-4 border-gray">
                  <div className="flex items-center gap-2 text-textPrimary text-sm">
                    <div className="min-w-5 w-5 h-5 rounded-md" style={{ background: colorSector ?? '#040' }}></div>
                    {nomeSector}
                  </div>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      handleClearTicket();
                      handleClearSector();
                      handleSelectTicket(null as any);
                    }}
                  >
                    Outros setores
                  </Button>
                </div>
                <p className="text-softBlue text-sm">Selecione o seu lugar no mapa ao lado</p>
                <ul className="flex flex-col gap-2">
                  {selectedChairs.map(item => (
                    <li key={item.number}>
                      <div className="flex flex-col text-xs pl-4 border-l-2 border-gray">
                        <h6 className="text-softBlue text-md">{item.identifierChair.replace('- ' + idSector, '')}</h6>
                        <div className="flex items-center justify-between gap-2 text-xxs">
                          <span className="max-w-24">
                            {
                              // exibir o nome da cadeira se não for igual ao identificador se tiver o identificador no nome retirar
                              !item.nome.includes(item.identifierChair.replace('- ' + idSector, ''))
                                ? item.nome
                                : item.nome
                                    .replace(item.identifierChair.replace('- ' + idSector, ''), '')
                                    .replace('-', '')
                                    .trim()
                            }
                          </span>
                          <span className="text-textPrimary font-semibold text-xs whitespace-nowrap min-w-[50%]">
                            {item.valor.toLocaleString('pt-BR', {
                              minimumFractionDigits: 2,
                              style: 'currency',
                              currency: 'BRL'
                            })}{' '}
                            <span className="text-xxs font-semibold text-[#39558E]">
                              {item.taxa > 0 &&
                                `(+ taxa de ${item.taxa.toLocaleString('pt-BR', {
                                  minimumFractionDigits: 2,
                                  style: 'currency',
                                  currency: 'BRL'
                                })})`}
                            </span>
                          </span>
                          {item.valoresPorFormaPagamento &&
                            Object.entries(item.valoresPorFormaPagamento).map((i, index) => {
                              const [key, value] = i;

                              if (key !== 'CartaoCredito') {
                                return (
                                  <span className="dark" key={index}>
                                    {item.valor.toLocaleString('pt-BR', {
                                      minimumFractionDigits: 2,
                                      style: 'currency',
                                      currency: 'BRL'
                                    })}{' '}
                                    {(value.taxaConveniencia || 0) + (value.taxaServico || 0) > 0 &&
                                      `(+ taxa de ${item.taxa.toLocaleString('pt-BR', {
                                        minimumFractionDigits: 2,
                                        style: 'currency',
                                        currency: 'BRL'
                                      })})`}{' '}
                                    no {key === 'DebitoOnline' ? 'Débito online' : key}
                                  </span>
                                );
                              }
                              return null;
                            })}
                          <GradientBorder
                            borderStyle={{
                              borderRadius: '50%',
                              padding: '2px',
                              height: '2rem',
                              width: '2rem'
                            }}
                            innerStyle={{
                              borderRadius: '50%',
                              height: '100%',
                              width: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: 0
                            }}
                          >
                            <Edit
                              onClick={e => handleClick(e, item)}
                              sx={{
                                color: 'rgba(0, 0, 0)',
                                fontSize: '.9rem',
                                cursor: 'pointer'
                              }}
                            />
                          </GradientBorder>
                          <GradientBorder
                            borderStyle={{
                              borderRadius: '50%',
                              padding: '2px',
                              height: '2rem',
                              width: '2rem'
                            }}
                            innerStyle={{
                              borderRadius: '50%',
                              height: '100%',
                              width: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: 0
                            }}
                          >
                            <Delete
                              onClick={() => handleSeletedRemoved(item.identifierChair)}
                              sx={{
                                color: 'black !important',
                                cursor: 'pointer',
                                fontSize: '.9rem'
                              }}
                            />
                          </GradientBorder>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div>
                  {totalPrice > 0 && (
                    <div className="flex items-center justify-between pb-5">
                      <p className="text-sm font-semibold text-softBlue">Total</p>
                      <p className="text-sm font-semibold text-textPrimary">
                        <span className="text-xs font-semibold">R$</span>{' '}
                        {Number(totalPrice).toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                  )}

                  {totalSelectedValue > 0 && (
                    <div className="flex items-center justify-between pb-5">
                      <p className="text-sm font-semibold text-softBlue">Total</p>
                      <p className="text-sm font-semibold text-textPrimary">
                        <span className="text-xs font-semibold">R$</span>{' '}
                        {Number(totalSelectedValue).toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                  )}
                  <div className="flex items-center justify-between gap-4">
                    <KeyboardArrowLeft
                      className="text-textPrimary cursor-pointer"
                      onClick={() => {
                        handleClearTicket();
                        handleClearSector();
                        handleSelectTicket(null as any);
                      }}
                    />
                    <Button
                      variant="primary"
                      className="pl-1"
                      onClick={() => {
                        handleSelectTicketWithChairs(selectedChairs);
                        handleShowModal();
                      }}
                    >
                      <Image src={'/moneyIcon-gray.svg'} alt="Logo" width={25} height={20} />
                      Comprar Ingressos
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex flex-col gap-4 p-2 text-textPrimary">
                <div className="flex items-center justify-between gap-8">
                  <div className="flex items-center gap-2 text-textPrimary w-full text-sm">
                    <div className="min-w-5 w-5 h-5 rounded-md" style={{ background: colorSector ?? '#040' }}></div>
                    {nomeSector}
                  </div>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      handleClearTicket();
                      handleClearSector();
                      handleSelectTicket(null as any);
                    }}
                  >
                    Outros setores
                  </Button>
                </div>
                <p className="text-softBlue text-sm">Selecione o seu lugar no mapa ao lado</p>
              </div>
            ))}

          {ticket && emptySectorMap && (
            <div className="flex flex-col gap-4 p-2">
              <div className="flex items-center justify-between gap-8 border-b-2 pb-4 border-gray">
                <div className="flex items-center w-full gap-2 text-textPrimary text-sm">
                  <div className="min-w-5 w-5 h-5 rounded-md" style={{ background: colorSector ?? '#040' }}></div>
                  {nomeSector}
                </div>
                <Button
                  variant="secondary"
                  onClick={() => {
                    handleClearTicket();
                    handleClearSector();
                    handleSelectTicket(null as any);
                  }}
                >
                  Outros setores
                </Button>
              </div>

              <div className="flex flex-col gap-5 text-textPrimary font-medium pb-4 border-b-2 border-gray">
                <p className="text-xs font-medium text-softBlue">
                  Selecione as quantidades de cada ingresso desejado e clique no botão ‘Comprar ingressos’
                </p>
                <div className="font-medium text-sm">
                  {ticket.nome}
                  <ul className="flex flex-col gap-4 items-center mt-1 justify-center ">
                    {ticket.tiposDeIngresso.map((item, indexArr) => (
                      <SingleTicketCard index={indexArr} key={indexArr} valor={item.valorUnitario} {...item} />
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                {totalPrice > 0 && (
                  <div className="flex items-center justify-between pb-5">
                    <p className="text-sm font-semibold text-softBlue">Total</p>
                    <p className="text-sm font-semibold text-textPrimary">
                      <span className="text-xs font-semibold">R$</span>{' '}
                      {Number(totalPrice).toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                )}

                {totalSelectedValue > 0 && (
                  <div className="flex items-center justify-between pb-5">
                    <p className="text-sm font-semibold text-softBlue">Total</p>
                    <p className="text-sm font-semibold text-textPrimary">
                      <span className="text-xs font-semibold">R$</span>{' '}
                      {Number(totalSelectedValue).toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                )}
                <div className="flex items-center justify-between gap-4">
                  <KeyboardArrowLeft
                    className="text-textPrimary cursor-pointer"
                    onClick={() => {
                      handleClearTicket();
                      handleClearSector();
                      handleSelectTicket(null as any);
                    }}
                  />
                  <Button
                    variant="primary"
                    className="pl-1"
                    disabled={ticketsPurchase && ticketsPurchase.length > 0 ? false : true}
                    onClick={() => {
                      handleSelectTicketWithChairs(selectedChairs);
                      handleShowModal();
                    }}
                  >
                    <Image src={'/moneyIcon-gray.svg'} alt="Logo" width={25} height={20} />
                    Comprar Ingressos
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="w-full flex flex-col gap-4 md:flex-row pb-8 md:p-0 items-center text-textPrimary">
          {idSector && !emptySectorMap && (
            <div className="flex md:hidden flex-col gap-4 p-2 text-textPrimary">
              <div className="flex items-center justify-between gap-8">
                <div className="flex items-center gap-2 text-textPrimary w-full text-sm">
                  <div className="min-w-5 w-5 h-5 rounded-md" style={{ background: colorSector ?? '#040' }}></div>
                  {nomeSector}
                </div>
                <Button
                  variant="secondary"
                  onClick={() => {
                    handleClearTicket();
                    handleClearSector();
                    handleSelectTicket(null as any);
                  }}
                >
                  Outros setores
                </Button>
              </div>
              <p className="text-softBlue text-sm">Selecione o seu lugar no mapa ao lado</p>
            </div>
          )} 
          <div className="w-full lg:max-w-[75%] lg:w-3/4 md:scale-[.85]">
            <HTMLMap />
          </div>

          {selectedChairs.length > 0 && (
            <div className="w-full flex md:hidden flex-col gap-4 md:flex-row pb-8 md:p-0 items-center text-textPrimary">
              <p className="text-softBlue text-sm w-full">Selecione o seu lugar no mapa ao lado</p>
              <ul className="flex flex-col gap-2 w-full px-2">
                {selectedChairs.map(item => (
                  <li key={item.number}>
                    <div className="flex flex-col text-xs pl-4 border-l-2 border-gray">
                      <h6 className="text-softBlue text-md">{item.identifierChair.replace('- ' + idSector, '')}</h6>
                      <div className="flex items-center justify-between gap-2 text-xxs">
                        <span className="max-w-24">
                          {
                            // exibir o nome da cadeira se não for igual ao identificador se tiver o identificador no nome retirar
                            !item.nome.includes(item.identifierChair.replace('- ' + idSector, ''))
                              ? item.nome
                              : item.nome
                                  .replace(item.identifierChair.replace('- ' + idSector, ''), '')
                                  .replace('-', '')
                                  .trim()
                          }
                        </span>
                        <span className="text-textPrimary font-semibold text-xs whitespace-nowrap min-w-[50%]">
                          {item.valor.toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                            style: 'currency',
                            currency: 'BRL'
                          })}{' '}
                          <span className="text-xxs font-semibold text-[#39558E]">
                            {item.taxa > 0 &&
                              `(+ taxa de ${item.taxa.toLocaleString('pt-BR', {
                                minimumFractionDigits: 2,
                                style: 'currency',
                                currency: 'BRL'
                              })})`}
                          </span>
                        </span>
                        {item.valoresPorFormaPagamento &&
                          Object.entries(item.valoresPorFormaPagamento).map((i, index) => {
                            const [key, value] = i;

                            if (key !== 'CartaoCredito') {
                              return (
                                <span className="dark" key={index}>
                                  {item.valor.toLocaleString('pt-BR', {
                                    minimumFractionDigits: 2,
                                    style: 'currency',
                                    currency: 'BRL'
                                  })}{' '}
                                  {(value.taxaConveniencia || 0) + (value.taxaServico || 0) > 0 &&
                                    `(+ taxa de ${item.taxa.toLocaleString('pt-BR', {
                                      minimumFractionDigits: 2,
                                      style: 'currency',
                                      currency: 'BRL'
                                    })})`}{' '}
                                  no {key === 'DebitoOnline' ? 'Débito online' : key}
                                </span>
                              );
                            }
                            return null;
                          })}
                        <GradientBorder
                          borderStyle={{
                            borderRadius: '50%',
                            padding: '2px',
                            height: '2rem',
                            width: '2rem'
                          }}
                          innerStyle={{
                            borderRadius: '50%',
                            height: '100%',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 0
                          }}
                        >
                          <Edit
                            onClick={e => handleClick(e, item)}
                            sx={{
                              color: 'rgba(0, 0, 0)',
                              fontSize: '.9rem',
                              cursor: 'pointer'
                            }}
                          />
                        </GradientBorder>
                        <GradientBorder
                          borderStyle={{
                            borderRadius: '50%',
                            padding: '2px',
                            height: '2rem',
                            width: '2rem'
                          }}
                          innerStyle={{
                            borderRadius: '50%',
                            height: '100%',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 0
                          }}
                        >
                          <Delete
                            onClick={() => handleSeletedRemoved(item.identifierChair)}
                            sx={{
                              color: 'black !important',
                              cursor: 'pointer',
                              fontSize: '.9rem'
                            }}
                          />
                        </GradientBorder>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <Button
                variant="primary"
                className="w-fit"
                onClick={() => {
                  handleSelectTicketWithChairs(selectedChairs);
                  //handleShowModal()
                }}
              >
                <Image src={'/moneyIcon-gray.svg'} alt="Money" width={25} height={20} />
                Comprar Ingressos
              </Button>
            </div>
          )}
        </div>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} onClick={handleClose}>
          <MenuItem
            sx={{
              minWidth: '200px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <label>Trocar forma do ingresso</label>
            <Select
              className="w-full"
              value={selectedItem?.idSector}
              onChange={e => {
                //
                const value = e.target.value;
                if (!value) return;

                const newNameValue = selectedItem.identifierChair.replace(selectedItem?.idSector, '');

                const eventType = eventTicket?.tiposDeIngresso?.find(item => item.nome === value);
                const valor = eventType?.valorUnitario;
                const taxa = (eventType?.taxaConveniencia ?? 0) + (eventType?.taxaServico ?? 0) + (eventType?.taxaFixa ?? 0);
                const valoresPorFormaPagamento = eventType?.valoresPorFormaPagamento;

                selectedItem.nome = newNameValue + value;

                selectedItem.valor = valor;

                selectedItem.taxa = taxa;

                selectedItem.typeTicket = eventType;

                selectedItem.valoresPorFormaPagamento = valoresPorFormaPagamento;

                handleEditChair(selectedItem);
              }}
            >
              {eventTicket?.tiposDeIngresso &&
                eventTicket?.tiposDeIngresso.map((item, index) => {
                  if (!selectedItem || !selectedItem?.idSector) return <></>;
                  if (!(item?.setor?.id === selectedItem?.idSector)) return <></>;

                  return (
                    <MenuItem key={index} value={item.nome}>
                      {item.nome}
                    </MenuItem>
                  );
                })}
            </Select>
          </MenuItem>
        </Menu>
      </div>
    </GradientBorder>
  );
}
