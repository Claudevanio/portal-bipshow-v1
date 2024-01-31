import React from 'react';
import { useEventTicket } from '@/shared/hooks/useEventTicket';
import { theme } from '@/shared';
import { Ticket } from '../';
import { Button } from '@/components';
import { ContainerActionTicketMap } from './styles';

export const ActionTicketMap: React.FC = () => {
  const { eventTicket } = useEventTicket();

  return (
    <ContainerActionTicketMap>
      {eventTicket && (
      <div className="title-tickets">
        <Ticket width={24} height={24} color={'#956AFB'} fillOpacity />
        <h5 className="title">Ingressos</h5>
      </div>
      )}
      {eventTicket && (
        <>
          <img src={eventTicket.local?.mapa?.grande ? eventTicket.local?.mapa?.grande.imagem : eventTicket.local?.mapa?.imagem} alt="Mapa" className="desktop" />
          <img src={eventTicket.local?.mapa?.pequeno ? eventTicket.local?.mapa?.pequeno.imagem : eventTicket.local?.mapa?.imagem} alt="Mapa" className="mobile" />
        </>
      )}
      <Button>
        Comprar Ingressos
      </Button>
    </ContainerActionTicketMap>
  );
};
