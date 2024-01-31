import React from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useEventTicket } from '@/shared/hooks/useEventTicket';
import { ContainerTicketMapMobile } from './styles';
import { ActionSectorOrChair } from './ActionSectorOrChair';
import { HTMLMap } from './HTMLMap';
import { RanksOffcanvas } from './RanksOffcanvas';

export const TicketMapMobile: React.FC = () => {
  const {
    handleClearSector, isShowOffcanvas, setIsShowOffcanvas,
  } = useEventTicket();

  return (
    <div>
      <div>
        <div className="select-sector">
          <h5 className="title">Selecione o seu lugar</h5>
          <div className="actions">
            <ActionSectorOrChair />
            <HTMLMap />
          </div>
        </div>
      </div>
      <Offcanvas
        show={isShowOffcanvas}
        onHide={() => {
          setIsShowOffcanvas(false);
          handleClearSector();
        }}
        backdrop="static"
        placement="bottom"
        style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}
        keyboard
        className="offcanvas-chairs"
        backdropClassName="backdrop-chairs"
      >
        <RanksOffcanvas />
      </Offcanvas>
    </div>
  );
};
