import React, { useMemo } from 'react';
import { useEventTicket } from '@/shared/hooks/useEventTicket';
import { ContainerButtonQTD } from './styles';
import { IButtonQDT } from './interface';

export const ButtonQTD: React.FC<IButtonQDT> = ({ current, max, onClick }) => {
  const { ticketsPurchase } = useEventTicket();

  const isDisabled = useMemo(() => {
    let isMax = 0;

    ticketsPurchase && ticketsPurchase.forEach((i) => {
      isMax += i.qtde;
    });

    return isMax;
  }, [ticketsPurchase]);

  return (
    <ContainerButtonQTD>
      <button disabled={current === 0} type="button" className="prev" onClick={() => onClick('prev')}>
        <div />
      </button>
      <p className={`${current ? 'active' : 'no-active'}`}>{current}</p>
      <button disabled={isDisabled === max} type="button" className="max" onClick={() => onClick('next')}>
        +
      </button>
    </ContainerButtonQTD>
  );
};
