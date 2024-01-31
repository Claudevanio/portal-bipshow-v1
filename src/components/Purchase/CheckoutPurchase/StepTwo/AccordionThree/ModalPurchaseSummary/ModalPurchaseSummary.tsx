import React from 'react';
import { Close } from '@/components/icons/Close';
import { IconButton } from '@/components/IconButton';
import { theme } from '@/shared';
import { useEventTicket } from '@/shared/hooks/useEventTicket';
import { Avatar } from '@/components/';
import { Button } from '@/components/Form/Button';
import { useTicketPurchase } from '@/shared/hooks/useTicketPurchase';
import { LoadingPayment } from '@/components/LoadingPayment';
import { PIX } from '@/components/icons/PIX';
import { ContainerModalPurchaseSummary } from './styles';
import { IModalPurchaseSummary } from './interface';

export const ModalPurchaseSummary: React.FC<IModalPurchaseSummary> = ({ dataPurchase, onClose }) => {
  const { ticketsPurchase } = useEventTicket();
  const {
    loading, selectedPayment, couponAppliep, handleLoadPurchase, guide, installment, amount, amountWithoutTaxa,
  } = useTicketPurchase();

  return (
    <ContainerModalPurchaseSummary>
      {selectedPayment && selectedPayment.formaPagamento === 'CartaoCredito' && (
        <LoadingPayment open={loading} />
      )}
      <header>
        <h6 className="title">Detalhes do pedido</h6>
        <IconButton onClick={onClose}>
          <Close width={24} height={24} color={'#8779F8'} />
        </IconButton>
      </header>
      <div className="content-modal">
        {ticketsPurchase && (
        <div className="tickets">
          <h6 className="title">Ingressos</h6>
          <ul>
            {ticketsPurchase.map((item) => (
              <li key={item.index}>
                <Avatar src={item.user?.imagem}
                size='small' 
                // username={item.user?.nome} 
                // variant="small-two" 
                />
                <div className="info-one">
                  <h6 className="title">{item.nome}</h6>
                  <p className="text-light">
                    {item.valor.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </p>
                </div>
                <div className="info-two">
                  <h6 className="title">
                    {(item.valor * item.qtde).toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </h6>
                  <p className="text-light">
                    Qtd:
                    {' '}
                    {item.qtde}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        )}
        <div className="payment">
          <h6 className="title">Pagamento</h6>
          <div className="infos">
            {selectedPayment && selectedPayment.formaPagamento === 'CartaoCredito' && dataPurchase && (
            <>
              <h6 className="title">
                •••• •••• ••••
                {' '}
                {dataPurchase.cartao.substring((dataPurchase.cartao.length - 4), dataPurchase.cartao.length)}
              </h6>
              <p className="text-light">{dataPurchase.validade}</p>
            </>
            )}
            {selectedPayment && selectedPayment.formaPagamento === 'PIX' && (
            <div className="pix">
              <div className="header">
                <PIX />
                <p className="text-light">PIX</p>
              </div>
              <p className="badges">
                Aprovação em minutos
              </p>
            </div>
            )}
          </div>
        </div>
        <div className="subtotal">
          <h6 className="title">Subtotal</h6>
          <p className="text-dark">
            {amountWithoutTaxa.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              style: 'currency',
              currency: 'BRL',
            })}
          </p>
        </div>
        <div className="desconto subtotal">
          <h6 className="title">Desconto</h6>
          <p className="text-dark">
            {(couponAppliep?.valorDesconto || 0).toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              style: 'currency',
              currency: 'BRL',
            })}
          </p>
        </div>
        <div className="total">
          <h6 className="title">
            Total
            {selectedPayment?.formaPagamento === 'CartaoCredito' && installment ? ` (${installment.quantity}x de ${installment.installmentAmount.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              style: 'currency',
              currency: 'BRL',
            })})` : ''}
          </h6>
          <p className="text-dark">
            {selectedPayment?.formaPagamento === 'CartaoCredito' && installment && installment.totalAmount.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              style: 'currency',
              currency: 'BRL',
            })}
            {selectedPayment?.formaPagamento !== 'CartaoCredito' && (
              amount.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                style: 'currency',
                currency: 'BRL',
              })
            )}
          </p>
        </div>
        <div className="butttons">
          <Button type="button" onClick={onClose} variant="outline" text="Cancelar" className="cancel" />
          {guide && (
            <Button type="button" variant="medium" text="Finalizar" className="confirm" onClick={() => handleLoadPurchase(guide.guide, guide.id, dataPurchase)} loading={loading} disabled={loading} />
          )}
        </div>
      </div>
    </ContainerModalPurchaseSummary>
  );
};
