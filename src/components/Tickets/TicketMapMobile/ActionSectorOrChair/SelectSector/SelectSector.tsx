import React from 'react';
import { useEventTicket } from '@/shared/hooks/useEventTicket';
import { Button } from '@/components';
import { ActionTicket } from '@/components/Tickets';
import { ContainerSelectSector } from './styles';
import { Sector } from './Sector';

export const SelectSector: React.FC = () => {
  const {
    eventTicket, selectSectorMobile, handleSelectSector, loadingSector, setIsShowOffcanvas,
  } = useEventTicket();

  return (
    <ContainerSelectSector>
      {eventTicket && eventTicket.local && eventTicket.local.selecaoDeSetorNoEstadio ? (
        <ActionTicket type="chairs" />
      ) : (
        <React.Fragment>
          <div className="select-sector">
            {eventTicket?.tiposDeIngresso?.map((item) => (
              <Sector
                key={item.id}
                idTypeEvent={Number(item.id)}
                nome={item?.nome}
                setorId={item?.setor?.id}
                preco={item.valorUnitario}
                valoresPorFormaPagamento={item.valoresPorFormaPagamento}
                taxaPadrao={Number(item.taxaConveniencia || 0) + Number(item.taxaFixa || 0) + Number(item.taxaServico || 0)}
              />
            ))}
          </div>
          <div className="confirm">
            <Button
              disabled={selectSectorMobile ? loadingSector ? true : false : true}
              onClick={() => {
                if (selectSectorMobile) {
                  setIsShowOffcanvas(true);
                  handleSelectSector(selectSectorMobile.id, selectSectorMobile.nome);
                }
              }}
            >
              {selectSectorMobile ? 'Confirmar' : 'Selecione um setor'}
            </Button>
          </div>
        </React.Fragment>
      )}
    </ContainerSelectSector>
  );
};
