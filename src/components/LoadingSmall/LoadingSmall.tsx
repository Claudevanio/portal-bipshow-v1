import React from 'react';
import { ContainerLoadingSmall } from './styles';

export const LoadingSmall: React.FC = () => {
  return (
    <ContainerLoadingSmall>
      <div className="content-loading">
        {/* <img src="/assets/logo-alternative.svg" alt="Uzer ticket" /> */}
        <div className="loader" />
      </div>
    </ContainerLoadingSmall>
  );
};
