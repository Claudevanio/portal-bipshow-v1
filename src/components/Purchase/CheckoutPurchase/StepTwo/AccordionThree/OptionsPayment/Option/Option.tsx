import React, { useMemo } from 'react';
import { useTicketPurchase } from '@/shared/hooks/useTicketPurchase';
import { ContainerOption, ContainerOptionRadio, ContainerOptionInfo } from './styles';
import { IOption } from './interface';

export const Option: React.FC<IOption> = ({ formaPagamento, id, active }) => {
  const { handleSelectTypePayment } = useTicketPurchase();

  const isTypePayment = useMemo(() => {
    switch (formaPagamento) {
      case 'CartaoCredito':
        return 'Cartão';
      case 'DebitoOnline':
        return 'Débito Online';
      case 'Boleto':
        return 'Boleto';
      case 'PIX':
        return 'PIX';
      default:
        return 'Dinheiro';
    }
  }, [formaPagamento]);

  return (
    <ContainerOption
      className={active ? 'active' : ''}
      onClick={() => {
        if (id || id === 0) handleSelectTypePayment(id);
      }}
    >
      <ContainerOptionRadio className={`${active ? 'active' : ''} radio`} />
      <ContainerOptionInfo className={active ? 'active' : ''}>
        <h6 className="title">{isTypePayment}</h6>
      </ContainerOptionInfo>
    </ContainerOption>
  );
};
