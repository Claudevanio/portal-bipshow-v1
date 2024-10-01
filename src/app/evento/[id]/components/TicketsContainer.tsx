'use client';
import { Button, GradientBorder } from '@/components';
import { Event } from '@/types';
import { Add, Remove } from '@mui/icons-material';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useCallback, useMemo, useState } from 'react';
import ptBr from 'dayjs/locale/pt-br';
import { useEventTicket } from '@/shared/hooks';
import DatePicker from 'react-datepicker';
import { IAction } from '@/components/Tickets/ActionTicket/Ticket/Action/interface';
import { Pixel } from '@/utils/pixel';

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
    tickName,
    index,
    dias,
    tipo,
    mapa,
    description,
    mesas,
    exibirTaxaSomada
  } = singleTicket;

  const { eventTicket, handleSelectTicketQuantity, ticketsPurchase } = useEventTicket();
  const [isQuantity, setIsQuantity] = useState<number>(ticketsPurchase?.find(i => i.singleId === `${nome}${index}`)?.qtde || 0);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const quantityMax = useMemo((): number => {
    const max =
      limitePorUsuario > totalDisponivel || Number(eventTicket?.maxBilhetePorUsuario || 0) > totalDisponivel
        ? totalDisponivel
        : ((limitePorUsuario ? limitePorUsuario : Number(eventTicket?.maxBilhetePorUsuario || 0)) as number);

    return max;
  }, [totalDisponivel, limitePorUsuario, eventTicket]);
  const highlightDates = dias.map(d => new Date(d.dia));
  const earliestDate = highlightDates.length === 0 ? new Date(Date.now()) : new Date(Math.min(...highlightDates.map(date => date.getTime())));

  const handleChangeQTD = useCallback(
    (type: 'next' | 'prev', idTable?: number) => {
      if (type === 'next' && isQuantity <= (quantityMax || 0) && id) {
        Pixel.AddToCart({
          contentName: nome,
          contentIds: [`${id}`],
          contentType: 'Event Ticket',
          value: valor * (isQuantity + 1),
          fbId: eventTicket.pixelFacebook
        });
        setIsQuantity(isQuantity + 1);
        if (idTable) {
          handleSelectTicketQuantity(id, isQuantity + 1, index, idTable);
        } else {
          handleSelectTicketQuantity(id, isQuantity + 1, index, null, tickName);
        }
      }
      if (type === 'prev' && isQuantity >= 0 && id) {
        setIsQuantity(isQuantity - 1);
        handleSelectTicketQuantity(id, isQuantity - 1, index, null, tickName);
      }
    },
    [isQuantity, setIsQuantity, quantityMax, id, handleSelectTicketQuantity, index]
  );

  return (
    <li className="flex items-center justify-between w-full">
      <div>
        <p className="text-xs w-20 max-w-20 font-semibold text-softBlue">{nome}</p>
        <button
          onClick={() => {
            setShowCalendar(!showCalendar);
          }}
          className="border-nones bg-transparent"
        >
          <Image className="grayscale-[100%]" src={'/Calendar.svg'} alt="Logo" width={20} height={20} />
        </button>
        {showCalendar && (
          <div className="absolute z-50 mt-2 bg-white shadow-lg rounded">
            <DatePicker
              selected={earliestDate}
              onChange={(date: Date) => setSelectedDate(date)}
              inline
              highlightDates={highlightDates}
              dateFormat="dd/MM/yyyy"
            />
          </div>
        )}
      </div>
      <div className=" min-w-[40%] md:min-w-[5.5rem]">
        <p className="text-xs md:text-sm font-bold text-textPrimary ">
          {valor > 0 && (
            <>
              <span className="text-xs font-semibold">R$</span>{' '}
              {Number(valor).toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{' '}
            </>
          )}{' '}
          {valor === 0 && 'Grátis'}
        </p>
        {!singleTicket.taxaIncluso && (
          <p className="text-xxs font-semibold text-darkBlue whitespace-nowrap">
            (+{Number(taxaFixa + taxaServico + taxaConveniencia).toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} de
            taxa)
          </p>
        )}
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

export function TicketsContainer({ currentEvent }: { currentEvent?: Event }) {
  const { ticket, eventTicket, ticketsPurchase, handleShowModal, handleClearTicket, ticketFormatted, handleSelectTicket } = useEventTicket();

  const totalPrice = useMemo(() => {
    let isTotalPrice = 0;

    ticketsPurchase?.forEach((i, index) => {
      isTotalPrice += i.valor * i.qtde;
    });

    return isTotalPrice;
  }, [ticketsPurchase]);

  /* console.log(ticket);
  console.log(ticketFormatted); */

  return (
    <GradientBorder
      innerStyle={{
        minWidth: '270px'
      }}
    >
      <div className="flex flex-col gap-4 p-1">
        <div className="flex flex-col gap-5 text-textPrimary font-medium pb-4">
          <p className="text-xs font-medium text-softBlue">
            Selecione as quantidades de cada ingresso desejado e clique no botão ‘Comprar ingressos’
          </p>
          {ticketFormatted?.map((tick, ind) => (
            <div className="font-medium text-sm">
              {tick.nome}
              <ul className="flex flex-col gap-4 items-center mt-1 justify-center border-2 border-[#946AFB] rounded-xl p-2">
                {tick.tiposDeIngresso.map((item, indexArr) => (
                  <SingleTicketCard
                    tickName={tick.nome}
                    index={indexArr}
                    key={indexArr}
                    valor={item.valorUnitario}
                    taxaIncluso={eventTicket.taxaIncluso}
                    {...item}
                  />
                ))}
              </ul>
            </div>
          ))}
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
        <div className="flex items-center justify-end gap-4">
          <Button
            variant="primary"
            className="pl-1"
            disabled={ticketsPurchase && ticketsPurchase.length > 0 ? false : true}
            onClick={() => {
              handleShowModal();
            }}
          >
            <Image src={'/moneyIcon-gray.svg'} alt="Logo" width={25} height={20} />
            Comprar Ingressos
          </Button>
        </div>
      </div>
    </GradientBorder>
  );
}
