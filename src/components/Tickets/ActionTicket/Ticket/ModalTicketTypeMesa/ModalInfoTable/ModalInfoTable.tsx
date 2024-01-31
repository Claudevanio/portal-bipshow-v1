import React from 'react';
import { Button } from '@/components';
import { ContainerModalInfoTable } from './styles';
import { IModalInfo } from './interface';
import { ArrowRight } from '@mui/icons-material';

export const ModalInfoTable: React.FC<IModalInfo> = ({
  nome, taxa, valor, lugar, onClose, handleClickArea, description,
}) => {
  return (
    <ContainerModalInfoTable>
      <header>
        <h6 className="title">
          Mesa
          {' '}
          {lugar?.href}
        </h6>
      </header>
      <div className="content-chair">
        {description && (
        <div className="alert-info">
          <p className="text-dark">{description}</p>
        </div>
        )}
        <button
          type="button"
          onClick={() => {
            if (lugar) handleClickArea(lugar);
          }}
        >
          <div>
            <span className="dark">
              {lugar?.href}
              {' '}
              -
              {' '}
              {nome}
            </span>
            <span className="light">
              {valor && valor.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                style: 'currency',
                currency: 'BRL',
              })}
              {' '}
              {taxa && taxa > 0 && (
                `(+ taxa de ${taxa.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  style: 'currency',
                  currency: 'BRL',
                })})`
              )}
            </span>
          </div>
          <ArrowRight
            className='text-gray'
          />
        </button>
      </div>
      <div className="btn">
        <Button onClick={onClose}>Cancelar</Button>
      </div>
    </ContainerModalInfoTable>
  );
};
