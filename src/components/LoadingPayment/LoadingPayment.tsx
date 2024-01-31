import React from 'react';
import { LoadingPaymentProps } from './interface';
import { ContainerLoadingPayment } from './styles';

export const LoadingPayment: React.FC<LoadingPaymentProps> = ({ open }) => {
  return (
    <ContainerLoadingPayment className={open ? '' : 'disable'}>
      <div
        className='bg-white w-1/3 h-56 rounded-lg shadow-lg flex flex-col gap-12 justify-center items-center'
      >
        <div className="spinner" />
        <p className="!text-black">Aguardando autenticação do pagamento</p>
      </div>
    </ContainerLoadingPayment>
  );
};
