"use client"; 
import { TicketsProvider } from '@/shared/hooks/useTickets';
import { Tickets } from '../profile/Tickets';

export default function MeusIngressos() {
  return (
    <TicketsProvider>
    <Tickets/>
  </TicketsProvider>
  );
}
