import React from 'react';
import { ContainerEmpty } from './styles';
import { IEmpty } from './interface';

export const Empty: React.FC<IEmpty> = ({ text }) => {
  return (
    <ContainerEmpty>
      <h5 className="title">{text}</h5>
    </ContainerEmpty>
  );
};
