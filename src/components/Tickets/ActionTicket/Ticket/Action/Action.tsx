import React, {
  useCallback, useMemo, useState,
} from 'react';
// import { Modal } from 'react-bootstrap';
import { Modal } from '@mui/material';
import { ButtonQTD } from '../../ButtonQTD/';
import { useEventTicket } from '@/shared/hooks/useEventTicket';
import { Button } from '@/components';
import { ContainerAction } from './styles';
import { IAction } from './interface';
import { ModalTicketTypeMesa } from '../ModalTicketTypeMesa';

export const Action: React.FC<IAction> = ({
  nome, qtd, taxaFixa = 0, taxaServico = 0, taxaConveniencia = 0, valor = 0, limitePorUsuario = 0, totalDisponivel = 0, id, index, tipo, mapa, description, mesas, exibirTaxaSomada,
}) => {
  const isTaxa = useMemo(() => Boolean(taxaFixa || taxaServico || taxaConveniencia), [taxaServico, taxaFixa, taxaConveniencia]);
  const {
    eventTicket, handleSelectTicketQuantity, ticketsPurchase,
  } = useEventTicket();
  const [isQuantity, setIsQuantity] = useState<number>(ticketsPurchase?.find((i) => i.singleId === `${nome}${index}`)?.qtde || 0);
  const [isShowModalTypeTicket, setIsShowModalTypeTicket] = useState<boolean>(false);

  const quantityMax = useMemo((): number => {
    const max = limitePorUsuario > totalDisponivel || Number(eventTicket?.maxBilhetePorUsuario || 0) > totalDisponivel ? totalDisponivel : (limitePorUsuario ? limitePorUsuario : Number(eventTicket?.maxBilhetePorUsuario || 0)) as number;

    return max;
  }, [totalDisponivel, limitePorUsuario, eventTicket]);

  const handleChangeQTD = useCallback((type: 'next' | 'prev', idTable?: number) => {
    if (type === 'next' && isQuantity <= (quantityMax || 0) && id) {
      setIsQuantity(isQuantity + 1);
      if (idTable) {
        handleSelectTicketQuantity(id, isQuantity + 1, index, idTable);
      } else {
        handleSelectTicketQuantity(id, isQuantity + 1, index);
      }
    }
    if (type === 'prev' && isQuantity >= 0 && id) {
      setIsQuantity(isQuantity - 1);
      handleSelectTicketQuantity(id, isQuantity - 1, index);
    }
  }, [isQuantity, setIsQuantity, quantityMax, id, handleSelectTicketQuantity, index]);

  const quantityTables = useMemo(() => {
    if (ticketsPurchase && tipo === 'mesa') {
      return ticketsPurchase.find((i) => i.id === id)?.qtde;
    }
    return 0;
  }, [ticketsPurchase, tipo, id]);

  return (
    <ContainerAction className="card-ticket">
      {qtd && qtd > 0 ? (
        <>
          {tipo === 'mesa' && id && mapa && (
            <Modal
              open={isShowModalTypeTicket}
              onClose={() => setIsShowModalTypeTicket(false)}
              aria-labelledby="modal-modal-title"
              //centered
              className='flex justify-center items-center'
              >
              <ModalTicketTypeMesa id={id} onClose={() => setIsShowModalTypeTicket(false)} nome={nome} mapa={mapa} valor={valor} taxaConveniencia={taxaConveniencia} taxaFixa={taxaFixa} taxaServico={taxaServico} quantityMax={quantityMax} handleChangeQTD={handleChangeQTD} description={description} mesas={mesas} />
            </Modal>
          )}
          <h6 className="title">{nome}</h6>
          <div className="action-info">
            <div className="info-price">
              <p className="text-dark">
                {valor > 0 && valor.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  style: 'currency',
                  currency: 'BRL',
                })}
                {valor <= 0 && (
                  "Grátis"
                )}
              </p>
              {!exibirTaxaSomada && (
                <div className="taxes">
                  <p className="text-light">
                    {isTaxa && (
                      `(+ ${Number(taxaFixa + taxaServico + taxaConveniencia).toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                        style: 'currency',
                        currency: 'BRL',
                      })} de taxa)`
                    )}
                  </p>
                  {/* {valoresPorFormaPagamento && Object.entries(valoresPorFormaPagamento).map((item) => {
                    const [key, value] = item;

                    if (key !== 'CartaoCredito') {
                      return (
                        <p className="text-light">
                          (+ $
                          {Number(value.taxaConveniencia + value.taxaServico).toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                            style: 'currency',
                            currency: 'BRL',
                          })}
                          {' '}
                          de taxa no
                          {' '}
                          {key === 'DebitoOnline' ? 'Débito online' : key}
                          )
                        </p>
                      );
                    }

                    return null;
                  })} */}
                </div>
              )}
            </div>
            {tipo === 'individual' && (
            <ButtonQTD current={isQuantity} max={quantityMax || 0} onClick={handleChangeQTD} />
            )}
            {tipo === 'mesa' && (
            <div className="action-map-table">
              {quantityTables && quantityTables > 0 && (
              <div className="alert-table">{quantityTables}</div>
              )}
              <Button onClick={() => setIsShowModalTypeTicket(true)} />
            </div>
            )}
          </div>
        </>
      ) : (
        <div className="sold-off">
          <h4 className="title">Esgotado</h4>
        </div>
      )}
    </ContainerAction>
  );
};
