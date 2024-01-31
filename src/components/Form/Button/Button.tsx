import React from 'react';
import { ContainerButton } from './styles';
import { IButton } from './interface';
import { CircularProgress } from '@mui/material';

export const Button: React.FC<IButton> = ({
  text, type = 'button', variant = 'small', loading, icon, ...rest
}) => {
  return (
    <ContainerButton variant={variant} type={type} {...rest}>
      {!loading && icon && icon}  
      {loading && (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">
            <CircularProgress size={20} color="inherit" />
          </span>
        </div>
      )}
      {!loading && text }
    </ContainerButton>
  );
};
