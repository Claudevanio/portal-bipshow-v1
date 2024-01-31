import React from 'react';
import { ContainerButtonBack } from './styles';
import { IButtonBack } from './interface';
import { ArrowLeft } from '@mui/icons-material';

export const ButtonBack: React.FC<IButtonBack> = ({ onClick }) => {
  return (
    <ContainerButtonBack onClick={onClick} type="button">
      <ArrowLeft width={24} height={24} className="text-primary" />
    </ContainerButtonBack>
  );
};
