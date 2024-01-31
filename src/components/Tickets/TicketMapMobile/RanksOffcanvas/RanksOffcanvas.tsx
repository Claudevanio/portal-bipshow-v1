import React, {
  useEffect, useMemo, useState,
} from 'react';
import { useEventTicket } from '@/shared/hooks/useEventTicket';

// import { theme } from '@/shared';
import { Button } from '@/components';
import { Help } from './Help';
import { SectorRanks } from './SectorRanks';
import { KeyboardArrowLeft } from '@mui/icons-material';

export const RanksOffcanvas: React.FC = () => {
  const {
    rank, handleClearSector, selectedChairs, setIsShowOffcanvas, handleSelectTicketWithChairs,
  } = useEventTicket();
  const [isHelp, setIsHelp] = useState<boolean>(true);

  const totalSelectedValue = useMemo((): number => {
    let total = 0 as number;

    selectedChairs.forEach((item : any) => {
      total += (item.valor + item.taxa);
    });

    return total;
  }, [selectedChairs]);

  useEffect(() => {
    if ((document.querySelector('html') as HTMLElement).clientWidth <= 767) {
      (document.querySelector('html') as HTMLElement).style.overflow = 'hidden';
    }

    return () => {
      (document.querySelector('html') as HTMLElement).style.overflow = 'auto';
    };
  }, []);

  return (
    <div>
      {rank ? (
        <>
          {isHelp && <Help onClose={() => setIsHelp(false)} />}
          <header>
            <h6 className="title">Selecione um assento</h6>
            <KeyboardArrowLeft onClick={() => {
              setIsShowOffcanvas(false);
              handleClearSector(true);
            }}
            ></KeyboardArrowLeft>
          </header>
          {Object.entries(rank).length <= 0 ? (
            <p>Cadeiras Indisponiveis</p>
          ) : (
            <SectorRanks />
          )}
          <div className="footer">
            <div className="actions">
              <div className="legend">
                <div>
                  <div />
                  <span>Disponível</span>
                </div>
                <div>
                  <div />
                  <span>Selecionado</span>
                </div>
                <div>
                  <div />
                  <span>Ocupado</span>
                </div>
              </div>
            </div>
            {selectedChairs.length > 0 && (
            <div className="info-purchase">
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
              <Button onClick={() => handleSelectTicketWithChairs(selectedChairs)}>Comprar</Button>
            </div>
            )}
          </div>
        </>
      ) : (
        <p>Carreganado</p>
      )}
    </div>
  );
};
