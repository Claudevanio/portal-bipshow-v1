import React from 'react';
import { useTicketPurchase } from '@/shared/hooks/useTicketPurchase';
import { ContainerOptionsPayment, ContainerOptionsPaymentList } from './styles';
import { Option } from './Option';

export const OptionsPayment: React.FC = () => {
  const { selectedPayment, amount } = useTicketPurchase();

  return (
    <ContainerOptionsPayment>
      {amount > 0  && (
      <div>
        <h6 className="title">Formas de pagamento</h6>
        <ContainerOptionsPaymentList>
          {selectedPayment && (
          <Option key={0} formaPagamento="CartaoCredito" id={0} taxa={0} active={selectedPayment.formaPagamento === 'CartaoCredito'} />
          )}
          <Option key={1} formaPagamento="PIX" id={1} taxa={1} active={selectedPayment?.formaPagamento === 'PIX'} />
          {/* {eventTicket && !eventTicket?.taxas?.find((item) => item.formaPagamento === 'Boleto') && dataOrder && dataOrder.pedido && dataOrder.pedido.pagarNoBoleto && selectedPayment && (
          <Option key={1} formaPagamento="Boleto" id={1} taxa={0} active={selectedPayment.formaPagamento === 'Boleto'} />
          )} */}
          {/* {eventTicket && !eventTicket?.taxas?.find((item) => item.formaPagamento === 'DebitoOnline') && dataOrder && dataOrder.pedido && dataOrder.pedido.pagarNoDebitoOnline && selectedPayment && (
          <Option key={2} formaPagamento="DebitoOnline" id={2} taxa={0} active={selectedPayment.formaPagamento === 'DebitoOnline'} />
          )} */}
          {/* {eventTicket && eventTicket.taxas && eventTicket.taxas.map((item) => {
            if (item.formaPagamento !== 'CartaoCreditoParcelado' && item.formaPagamento !== 'CartaoDebitoMaquina') {
              if (item.formaPagamento === 'Boleto' && dataOrder && dataOrder.pedido && dataOrder.pedido.pagarNoBoleto) {
                return (
                  <Option key={item.id} formaPagamento={item.formaPagamento} id={item.id} taxa={item.taxa} active={item.formaPagamento === selectedPayment?.formaPagamento ? true : false} />
                );
              }
              if (item.formaPagamento === 'DebitoOnline' && dataOrder && dataOrder.pedido && dataOrder.pedido.pagarNoDebitoOnline) {
                return (
                  <Option key={item.id} formaPagamento={item.formaPagamento} id={item.id} taxa={item.taxa} active={item.formaPagamento === selectedPayment?.formaPagamento ? true : false} />
                );
              }
            }
            return null;
          })} */}
        
        </ContainerOptionsPaymentList>
      </div>
      )}
    </ContainerOptionsPayment>
  );
};
