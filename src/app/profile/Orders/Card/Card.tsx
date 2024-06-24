import React from 'react';
import { format } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import { Arrow } from '@/components/icons/Arrow';
import { ContainerCard, Image } from './styles';
import { ICard } from './interface';

export const Card: React.FC<ICard> = ({ tickets: { date, address, foto, name }, active = false, onClick }) => {
  return (
    <ContainerCard
      active={active}
      onClick={() => {
        onClick();
      }}
    >
      <div className="foto">
        <Image image={foto} />
      </div>
      <div className="infos">
        <p className="text-light date">
          {format(new Date(date), 'ccc, dd/MM · kk:mm', {
            locale: ptBr as any
          })}
        </p>
        <p className="text-dark name">{name}</p>
        <p className="text-light address">{address}</p>
      </div>
      <div className="icon">
        <Arrow width={32} height={32} color={'#bcbcbc'} />
      </div>
    </ContainerCard>
  );
};
