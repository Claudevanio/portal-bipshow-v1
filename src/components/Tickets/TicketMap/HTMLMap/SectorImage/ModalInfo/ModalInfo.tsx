import React from 'react';
import { useEventTicket } from '@/shared/hooks/useEventTicket';;
import { theme } from '@/shared';
import { Button } from '@/components';
import { ContainerModalInfo } from './styles';
import { IModalInfo } from './interface';
import { ArrowBack } from '@mui/icons-material';

export const ModalInfo: React.FC<IModalInfo> = ({
  chair, onClose,
}) => {
  const { handleConfirmSelectedChair } = useEventTicket();
  return (
    <ContainerModalInfo>
      <header>
        <h6 className="title">
          Assento
          {' '}
          {chair.identifierChair.split(' -')[0]}
        </h6>
      </header>
      <div className="content-chair">
        <button
          type="button"
          onClick={() => {
            handleConfirmSelectedChair(chair);
            onClose();
          }}
        >
          <div>
            <span className="dark">{chair.nome}</span>
            <span className="light">
              {chair.valor.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                style: 'currency',
                currency: 'BRL',
              })}
              {' '}
              {chair.taxa > 0 && (
                `(+ taxa de ${chair.taxa.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  style: 'currency',
                  currency: 'BRL',
                })})`
              )}
            </span>
          </div>
          <ArrowBack width={32} height={32} 
            sx={{
              color: '#956AFB',
            }}
          />
        </button>
      </div>
      <div className="btn">
        <Button onClick={onClose}>Cancelar</Button>
      </div>
    </ContainerModalInfo>
  );
};
