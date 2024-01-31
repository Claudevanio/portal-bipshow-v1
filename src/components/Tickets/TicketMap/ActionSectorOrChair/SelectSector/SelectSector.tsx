import React from 'react';
import { useEventTicket } from '@/shared/hooks/useEventTicket';
import { ActionTicket } from '../../../ActionTicket';
import { ContainerSelectSector } from './styles';
import { Sector } from './Sector';
import { CircularProgress } from '@mui/material';

export const SelectSector: React.FC = () => {
  const { eventTicket, loadingSector } = useEventTicket();

  return (
    <ContainerSelectSector>
      {eventTicket && eventTicket.local && eventTicket.local.selecaoDeSetorNoEstadio ? (
        <ActionTicket type="chairs" />
      ) : (
        !loadingSector && eventTicket?.tiposDeIngresso?.map((item) => (
          <Sector
            key={item.id}
            nome={item?.nome}
            setorId={item?.setor?.id}
            preco={item.valorUnitario}
            valoresPorFormaPagamento={item.valoresPorFormaPagamento}
            taxaPadrao={Number(item.taxaConveniencia || 0) + Number(item.taxaFixa || 0) + Number(item.taxaServico || 0)}
          />
        ))
      )}
      {loadingSector && (
          <CircularProgress
            size={24}
          />
      )}
    </ContainerSelectSector>
  );
};
