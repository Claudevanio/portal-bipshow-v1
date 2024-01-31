import React from 'react';
import { useEventTicket } from '@/shared/hooks/useEventTicket';
// import { WeelChair } from '@/components/icons/WheelChair';
import { ContainerChairs, Circle } from './styles';
import { IChairs } from './interface';
import { WheelchairPickup } from '@mui/icons-material';

export const Chairs: React.FC<IChairs> = ({ chairs, letra, isMaxChair }) => {
  const {
    idSector, handleSelectChair, selectedChairs, chairs: isChairs,
  } = useEventTicket();

  return (
    <ContainerChairs>
      <h6 className="title">{letra}</h6>
      <ul>
        {chairs.map((item) => (
          <Circle
            quantity={chairs.length}
            hover={item.numero}
            wheelChair={item.cadeirante}
            key={item.identificador}
            className={`${isChairs.find((i: any) => i.c.id === item.id)?.r || item.excluida ? 'excluded' : ''} ${
              selectedChairs.find((i) => i.identifierChair === `${item.identificador} - ${idSector}`) ? 'seleted' : ''
            }`}
            onClick={() => {
              if (!isChairs.find((i: any) => i.c.id === item.id)?.r) {
                handleSelectChair(Number(idSector), item.identificador, item.numero, item.id);
              }
            }}
            isMaxChair={isMaxChair}
          >
            {item.cadeirante && <WheelchairPickup width={16} height={16} className={'text-[#39474F]'} />}
            <div />
          </Circle>
        ))}
      </ul>
      <h6 className="title">{letra}</h6>
    </ContainerChairs>
  );
};
