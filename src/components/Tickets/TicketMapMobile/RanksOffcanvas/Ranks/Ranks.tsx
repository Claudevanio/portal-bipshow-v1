import React, { useCallback, useEffect, useState } from 'react';
import {
  TransformComponent, TransformWrapper,
} from 'react-zoom-pan-pinch';
import { ISector } from '@/types';
import { ContainerRanks } from './styles';
import { Chairs } from './Chairs';

export const Ranks: React.FC<ISector> = ({ fileiras }) => {
  const [isMaxChairs, setIsMaxChairs] = useState<number>(0);

  const handleChangeMaxChairs = useCallback((isQuantityChair: number) => {
    if (isQuantityChair > isMaxChairs) {
      setIsMaxChairs(isQuantityChair);
    }
  }, [isMaxChairs]);

  useEffect(() => {
    fileiras.forEach((item) => handleChangeMaxChairs(item.cadeiras.length));
  }, [handleChangeMaxChairs, fileiras]);

  return (
    <ContainerRanks>
      <TransformWrapper
        initialScale={1}
        wheel={{
          step: 0.1,
        }}
        pinch={{
          step: 0.1,
        }}
        doubleClick={{
          step: 0.2,
        }}
      >
        {() => (
          <TransformComponent>
            <div className="ranks">
              <div className={`${fileiras.find((item) => item.cadeiras.length >= 29) ? 'decreaseWidth' : ''}`}>
                {fileiras.map((item) => (
                  <Chairs key={item.letra} chairs={item.cadeiras} id={item.id} letra={item.letra} isMaxChair={isMaxChairs} />
                ))}
              </div>
            </div>
          </TransformComponent>
        )}
      </TransformWrapper>
    </ContainerRanks>
  );
};
