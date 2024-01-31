import React from 'react';
import { ContainerTicketMap } from './styles';
import { ActionSectorOrChair } from './ActionSectorOrChair';
import { HTMLMap } from './HTMLMap';

export const TicketMap: React.FC = () => {
  return (
    <ContainerTicketMap id="map">
      <div className='container'>
        <div className="select-sector">
          <h5 className="title">Selecione o seu lugar</h5>
          <div className="actions">
            <ActionSectorOrChair />
            <HTMLMap />
          </div>
        </div>
      </div>
    </ContainerTicketMap>
  );
};
