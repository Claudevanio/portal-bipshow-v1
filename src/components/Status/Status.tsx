import React from 'react';
import { ContainerStauts } from './styles';
import { IStatus } from './interface';

export const Status: React.FC<IStatus> = ({ type, text }) => {
  return (
    <ContainerStauts type={type}>
      <p className="text-sm whitespace-nowrap">{text}</p>
    </ContainerStauts>
  );
};
