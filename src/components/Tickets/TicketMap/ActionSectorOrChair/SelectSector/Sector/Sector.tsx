import React from 'react';
import { useEventTicket } from '@/shared/hooks/useEventTicket';
import { ContainerSector } from './styles';
import { ISector } from './interface';

export const Sector: React.FC<ISector> = ({
  nome, preco, setorId, valoresPorFormaPagamento, taxaPadrao,
}) => {
  const { handleSelectSector, selectedChairs } = useEventTicket();

  return (
    <ContainerSector type="button" onClick={() => handleSelectSector(Number(setorId), String(nome))} className={`${selectedChairs.find((item) => item.idSector === setorId) ? 'active' : ''}`}>
      <div className="info">
        <p className="text-dark">{nome}</p>
        <p className="text-light">
          Preço de
          {' '}
          {((preco || 0) + (taxaPadrao || 0)).toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            style: 'currency',
            currency: 'BRL',
          })}
        </p>
        {valoresPorFormaPagamento && Object.entries(valoresPorFormaPagamento).map((item) => {
          const [key, value] = item;

          if (key !== 'CartaoCredito') {
            return (
              <p className="text-light">
                Preço de
                {' '}
                {((preco || 0) + (value.taxaConveniencia || 0) + (value.taxaServico || 0)).toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  style: 'currency',
                  currency: 'BRL',
                })}
                {' '}
                no
                {' '}
                {key === 'DebitoOnline' ? 'Débito online' : key}
              </p>
            );
          }

          return null;
        })}
      </div>
      <div className="circle">
        <div />
      </div>
    </ContainerSector>
  );
};
