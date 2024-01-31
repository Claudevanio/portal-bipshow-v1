import React from 'react';
import { useEventTicket } from '@/shared/hooks/useEventTicket';
import { ContainerTickets } from './styles';
import { CardTicket } from './CardTicket';

export const Tickets: React.FC = () => {
  const { ticketFormatted } = useEventTicket();

  return (
    <ContainerTickets>
      {ticketFormatted && ticketFormatted.length > 0 && ticketFormatted.map((item, index) => (
        <CardTicket index={index} valorVenda={item.valores} nome={item.nome} key={item.nome} />
      ))}
    </ContainerTickets>
  );
};
