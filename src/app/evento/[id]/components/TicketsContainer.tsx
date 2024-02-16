'use client'
import { Button, GradientBorder } from '@/components';
import { Event } from '@/types';
import { Add, KeyboardArrowLeft, KeyboardArrowRight, Remove } from '@mui/icons-material';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ptBr from 'dayjs/locale/pt-br';
import { EventMockList } from '@/utils/event-mock';
import { useEventTicket } from '@/shared/hooks';
import { IAction } from '@/components/Tickets/ActionTicket/Ticket/Action/interface';

dayjs.locale(ptBr)

function SingleTicketCard(
  singleTicket : IAction
){
  const {
    nome, qtd, taxaFixa = 0, taxaServico = 0, taxaConveniencia = 0, valor = 0, limitePorUsuario = 0, totalDisponivel = 0, id, index, tipo, mapa, description, mesas, exibirTaxaSomada,
  } = singleTicket

  const isTaxa = useMemo(() => Boolean(taxaFixa || taxaServico || taxaConveniencia), [taxaServico, taxaFixa, taxaConveniencia]);
  const {
    eventTicket, handleSelectTicketQuantity, ticketsPurchase,
  } = useEventTicket();
  const [isQuantity, setIsQuantity] = useState<number>(ticketsPurchase?.find((i) => i.singleId === `${nome}${index}`)?.qtde || 0);
  // const [isShowModalTypeTicket, setIsShowModalTypeTicket] = useState<boolean>(false);

  const quantityMax = useMemo((): number => {
    const max = limitePorUsuario > totalDisponivel || Number(eventTicket?.maxBilhetePorUsuario || 0) > totalDisponivel ? totalDisponivel : (limitePorUsuario ? limitePorUsuario : Number(eventTicket?.maxBilhetePorUsuario || 0)) as number;

    return max;
  }, [totalDisponivel, limitePorUsuario, eventTicket]);

  const handleChangeQTD = useCallback((type: 'next' | 'prev', idTable?: number) => {
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
  }, [isQuantity, setIsQuantity, quantityMax, id, handleSelectTicketQuantity, index]);

  const quantityTables = useMemo(() => {
    if (ticketsPurchase && tipo === 'mesa') {
      return ticketsPurchase.find((i) => i.id === id)?.qtde;
    }
    return 0;
  }, [ticketsPurchase, tipo, id]);


  return (
    <li
        className='flex items-center justify-between w-full'
      >
        <div

        > 
          <p
            className='text-xs w-36 max-w-36 md:w-24 md:max-w-24  font-semibold text-softBlue'
          >
            {nome}
          </p>
          <p
            className='text-xs font-semibold text-textPrimary uppercase'
          >
            {
              tipo
            }
          </p>
        </div>
        <div>
          <p
            className='text-sm font-bold text-textPrimary '
          >
             {valor > 0 &&<><span className='text-xs font-semibold'>R$</span> {Number(valor).toLocaleString('pt-br',{minimumFractionDigits: 2, maximumFractionDigits: 2})} </>} {valor === 0 && 'Grátis'}
          </p>
          <p
            className='text-xxs font-semibold text-darkBlue whitespace-nowrap'
          >
            (+{Number(taxaFixa + taxaServico + taxaConveniencia).toLocaleString('pt-br', {minimumFractionDigits: 2, maximumFractionDigits: 2})} de taxa)
          </p>
        </div>
        <div
          className='flex items-center gap-2'
        >
          <Remove
            className={'text-white p-1 rounded-full bg-[#53AFED] cursor-pointer' + (isQuantity === 0 ? ' opacity-50 cursor-not-allowed' : '')}
            onClick={() => {
              if(isQuantity === 0) return
              handleChangeQTD('prev')
            }}
          />
          <p>
            {
              isQuantity
            }
          </p>
          <Add
            className={'text-white p-1 rounded-full bg-[#53AFED]  cursor-pointer' + (isQuantity === quantityMax ? ' opacity-50 cursor-not-allowed' : '')}
            onClick={() => {
              if(isQuantity === quantityMax) return
              handleChangeQTD('next')
            }}  
          />
        </div>
      </li>
  )
}

export function TicketsContainer ({
  currentEvent
} : {
  currentEvent?: Event
}
) {
 
  const {
    ticket, eventTicket, ticketsPurchase, handleShowModal, 
  } = useEventTicket();
  
  const { handleClearTicket, ticketFormatted, handleSelectTicket, quantity, quantityTickets, setIsQuantity } = useEventTicket();
  
  const [quantityPerTicket, setQuantityPerTicket] = useState<number[]>();
  

  const totalPrice = useMemo(() => {
    let isTotalPrice = 0;

    ticketsPurchase?.forEach((i, index) => {
      
      isTotalPrice += (i.valor * i.qtde);
    });

    return isTotalPrice;
  }, [ticketsPurchase]);

  


  // useEffect(() => {
  //   if(selectedTicket){
  //     const tickets = EventMockList.find(event => event.id === currentEvent?.id)?.tickets?.map(item => new Date(item.date).getDate() === new Date(selectedTicket.date).getDate() ? item : null) || [];
  //     const ticketsFiltered = tickets.filter(item => item !== null).map(item => ({...item, quantity: 0}))
  //     setCartItems(ticketsFiltered)
  //   }
  //   if(!selectedTicket){
  //     setCartItems([])
  //   }
  //  }, [selectedTicket, currentEvent]);

   

  return (  
    <GradientBorder
    >
      {!ticket && <div
        className='flex flex-col gap-4 p-2'
      >
        <h3
          className='flex text-tertiary gap-3 font-semibold border-b-2 border-gray pb-4 '
        >
          <Image src={'/Ticket.svg'} alt='ingresso' height={20} width={20} /> Ingressos
        </h3>

        <ul
          className='flex flex-col gap-4 text-textPrimary font-medium'
        >
          {
          ticketFormatted && ticketFormatted.length > 0 && ticketFormatted.map((item, index, arr) => <li
            className={'flex items-center justify-between ' + (index+1 !== arr.length ? 'border-b-2 border-gray pb-4' : '')}
            key={index}
          >
            <div
              className='flex items-center gap-1'
            >
              <p
                className='font-bold text-3xl'
              >
                {
                  item.data && dayjs(item.data).format('DD')
                }
              </p>
              <div
                className='flex flex-col gap-0 '
              >
                <p>
                  {
                     item.data && dayjs(item.data).format('MMM').toUpperCase()
                  }
                </p>
                <p
                  className='text-[.6rem] first-letter:uppercase'
                >
                  {
                     item.data && dayjs(item.data).format('dddd').replace('-feira', '')
                  }
                </p>
              </div>
            </div>
            <div
              className='flex flex-col text-xs font-normal w-full pl-4'
            >
              {
                item.valores.length <= 1 ? `Preço de ` : `Preços entre `
              }
              <h4
                className='font-medium text-sm'
              >
                
            {item.valores.length > 1
              && `
              ${item.valores[0].toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                style: 'currency',
                currency: 'BRL',
              })} e ${item.valores[item.valores.length - 1].toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                style: 'currency',
                currency: 'BRL',
              })}`}
            {item.valores.length <= 1 && ` ${item.valores[0].toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              style: 'currency',
              currency: 'BRL',
            })}`}
              </h4>
            </div>
            <KeyboardArrowRight
              onClick={() => handleSelectTicket(index)}
              className='!text-blue cursor-pointer'
            />
          </li>)
          }
        </ul>

      </div>
      }
      {
        ticket && <div className='flex flex-col gap-4 p-2'>
            <div
              className='flex justify-between items-center pb-4 border-b-2 border-gray'
            >
              <div
                  className='flex items-center gap-1 text-textPrimary font-medium'
                >
                  <p
                    className='font-bold text-3xl'
                  >
                    {
                      ticket?.data && dayjs(ticket?.data).format('DD')
                    }
                  </p>
                  <div
                    className='flex flex-col gap-0 '
                  >
                    <p>
                      {
                         ticket?.data && dayjs(ticket?.data).format('MMM').toUpperCase()
                      }
                    </p>
                    <p
                      className='text-[.6rem] first-letter:uppercase'
                    >
                      {
                         ticket?.data && dayjs(ticket?.data).format('dddd').replace('-feira', '')
                      }
                    </p>
                  </div>
              </div>
              <p
                className='text-sm font-normal text-textPrimary flex gap-2 cursor-pointer'
                onClick={() => {
                  handleClearTicket()
                  handleSelectTicket(null as any)
                }}
              >
                <Image
                  className='grayscale-[100%]'
                  src={'/Calendar.svg'}
                  alt="Logo"
                  width={20}
                  height={20}
                  />
                Ver outras datas
              </p>
            </div>
            <div
              className='flex flex-col gap-5 text-textPrimary font-medium pb-4 border-b-2 border-gray'>
                <p
                  className='text-xs font-medium text-softBlue'
                >
                  Selecione as quantidades de cada ingresso desejado e clique no botão ‘Comprar ingressos’
                </p>
                <div 
                  className='font-medium text-sm'
                >
                  {
                    ticket.nome
                  }
                  <ul
                    className='flex flex-col gap-4 items-center mt-1 justify-center '
                  >
                    {
                      ticket.tiposDeIngresso.map((item, indexArr) =>( 
                        <SingleTicketCard
                          index={indexArr}
                          key={indexArr}
                          valor={item.valorUnitario}
                          {...item}
                        />
                          
                      ))}
                  </ul>
                </div>
            </div>
            <div>
              {
               totalPrice > 0 && <div
                className='flex items-center justify-between pb-5'
              >
                <p
                  className='text-sm font-semibold text-softBlue'
                >Total</p>
                <p
                  className='text-sm font-semibold text-textPrimary'>
                    <span className='text-xs font-semibold'>R$</span> {
                      Number(totalPrice).toLocaleString('pt-br', {minimumFractionDigits: 2, maximumFractionDigits: 2})
                    }
                </p>
              </div>}
              <div
                className='flex items-center justify-between gap-4'
              >
                <KeyboardArrowLeft
                  className='text-textPrimary cursor-pointer'
                  onClick={() => {
                    handleClearTicket()
                    handleSelectTicket(null as any)
                  }}
                />
                <Button
                  variant='primary'
                  className='pl-1'
                  disabled={ticketsPurchase && ticketsPurchase.length > 0 ? false : true}
                  onClick={handleShowModal}       
                >
                  <Image
                    src={'/moneyIcon-gray.svg'}
                    alt="Logo"
                    width={25}
                    height={20}
                  />
                  Comprar Ingressos
                </Button>
              </div>

            </div>

        </div>
      }
    </GradientBorder>
  )
}