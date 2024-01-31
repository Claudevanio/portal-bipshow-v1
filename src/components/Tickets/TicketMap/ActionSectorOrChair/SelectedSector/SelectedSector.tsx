import React, { useMemo } from 'react';
import { useEventTicket } from '@/shared/hooks/useEventTicket';
import { Button } from '@/components';
import { theme } from '@/shared';
import { ContainerSelectedSector } from './styles';
import { Delete } from '@mui/icons-material';

export const SelectedSector: React.FC = () => {
  const {
    nomeSector, selectedChairs, handleSeletedRemoved, handleClearSector, handleSelectTicketWithChairs,
  } = useEventTicket();

  const totalSelectedValue = useMemo((): number => {
    let total = 0 as number;

    selectedChairs.forEach((item) => {
      total += item.valor;
    });

    return total;
  }, [selectedChairs]);

  return (
    <ContainerSelectedSector>
      <header>
        <h6 className="title">{nomeSector}</h6>
        <Button variant="secondary" onClick={() => handleClearSector()}>
          Outros setores
        </Button>
      </header>
      <div className="sector-selected">
        {selectedChairs.length > 0 ? (
          <div className="not-empty">
            <ul>
              {selectedChairs.map((item) => (
                <li key={item.number}>
                  <div className="infos">
                    <h6 className="title">{item.nome}</h6>
                    <span className="dark">
                      {item.valor.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                        style: 'currency',
                        currency: 'BRL',
                      })}
                      {' '}
                      {item.taxa > 0 && (
                        `(+ taxa de ${item.taxa.toLocaleString('pt-BR', {
                          minimumFractionDigits: 2,
                          style: 'currency',
                          currency: 'BRL',
                        })})`
                      )}
                    </span>
                    {item.valoresPorFormaPagamento && Object.entries(item.valoresPorFormaPagamento).map((i, index) => {
                      const [key, value] = i;

                      if (key !== 'CartaoCredito') {
                        return (
                          <span className="dark"
                            key={index}
                          >
                            {item.valor.toLocaleString('pt-BR', {
                              minimumFractionDigits: 2,
                              style: 'currency',
                              currency: 'BRL',
                            })}
                            {' '}
                            {((value.taxaConveniencia || 0) + (value.taxaServico || 0)) > 0 && (
                              `(+ taxa de ${item.taxa.toLocaleString('pt-BR', {
                                minimumFractionDigits: 2,
                                style: 'currency',
                                currency: 'BRL',
                              })})`
                            )}
                            {' '}
                            no
                            {' '}
                            {key === 'DebitoOnline' ? 'Débito online' : key}
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>
                  <Delete
                    onClick={() => handleSeletedRemoved(item.identifierChair)}
                    sx={{
                      color: "rgba(0, 0, 0, 0.6)",
                      fillOpacity: '0.25',
                      cursor: 'pointer',
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="empty">
            <p className="text-light">Selecione um lugar disponível no mapa</p>
          </div>
        )}
        {selectedChairs.length > 0 && (
        <div className="infos-selected">
          <div>
            <span className="light">
              {selectedChairs.length}
              {' '}
              {selectedChairs.length > 1 ? 'cadeiras' : 'cadeira'}
              {' '}
              {selectedChairs.length > 1 ? 'selecionadas' : 'selecionada'}
            </span>
            <span className="dark">
              {totalSelectedValue.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
          </div>
          <Button onClick={() => handleSelectTicketWithChairs(selectedChairs)} />
        </div>
        )}
      </div>
    </ContainerSelectedSector>
  );
};
