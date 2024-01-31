import React from 'react';
import { ContainerIconButton } from './styles';
import { IIconButton } from './interface';

export const IconButton: React.FC<IIconButton> = ({ children, onClick }) => {
  return (
    <ContainerIconButton type="button" onClick={onClick}>
      {children}
    </ContainerIconButton>
  );
};
