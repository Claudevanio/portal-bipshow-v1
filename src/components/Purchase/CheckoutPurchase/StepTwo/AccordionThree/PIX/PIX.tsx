import React from 'react';

import { useTicketPurchase } from '@/shared/hooks/useTicketPurchase';
import { Button } from '@/components/Form/Button';
import { PIX as PIXIcon } from '@/components/icons/PIX';
import { ContainerPIX } from './styles';
import { PIXProps } from './interface';

export const PIX: React.FC<PIXProps> = ({ handleIsOpenModalPurchaseSummary }) => {
  const { amount } = useTicketPurchase();

  return (
    <ContainerPIX>
      <div className="title">
        <p className="normal">PIX</p>
        <PIXIcon />
        <p className="badges">
          Aprovação em minutos
        </p>
      </div>
      <p className="total">
        Total -
        {' '}
        {amount.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          style: 'currency',
          currency: 'BRL',
        })}
      </p>
      <div className="btn-submit">
        <Button type="button" text="Confirmar" variant="medium" onClick={handleIsOpenModalPurchaseSummary} />
        <div className="logo-pagseguro">
          <img src="/assets/pagseguro.png" alt="Logo do Pagseguro" />
        </div>
      </div>
    </ContainerPIX>
  );
};
