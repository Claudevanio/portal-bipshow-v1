import React from 'react';
import { ContainerTooltip } from './styles';
import { ITooltip } from './interface';

export const Tooltip: React.FC<ITooltip> = ({ text, title }) => {
  return (
    <ContainerTooltip>
      <h6 className="title">{title}</h6>
      <p>
        Cadeira:
        {' '}
        <strong>{text}</strong>
      </p>
    </ContainerTooltip>
  );
};
