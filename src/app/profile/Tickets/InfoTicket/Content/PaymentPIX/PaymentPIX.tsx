import React, { useCallback } from 'react';
import { useProfile } from '@/shared/hooks/useProfile';
import { Button } from '@/components/Form/Button';
import { Close } from '@/components/icons/Close';
import { IconButton } from '@/components/IconButton';
import { ContainerPaymentPIX } from './styles';
import { PaymentPIXProps } from './interface';
import { TypeEnum, useError } from '@/shared/hooks/useDialog';

export const PaymentPIX: React.FC<PaymentPIXProps> = ({ handleCloseModal }) => {
  const { infoTicket } = useProfile();
  const { showErrorDialog } = useError();
  const callErrorDialogComponent = (message: string, type?: string) => {
    showErrorDialog(message, type ?? TypeEnum.INFO);
  };

  const handleCopyPix = useCallback(() => {
    const isContent = document.getElementById('chave-pix') as HTMLTextAreaElement;

    if (isContent) {
      const textToCopy = isContent.innerText || isContent.textContent;
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          callErrorDialogComponent('Código copiado.', TypeEnum.SUCCESS);
        })
        .catch(error => {
          console.error('Erro ao copiar: ', error);
          callErrorDialogComponent('Erro ao copiar código.', TypeEnum.ERROR);
        });
    }
    // callErrorDialogComponent("Código copiado.", TypeEnum.SUCCESS)
  }, [showErrorDialog]);

  return (
    <ContainerPaymentPIX>
      <div className="header">
        <h6 className="title">Fazer o pagamento via PIX</h6>
        <div className="close">
          <IconButton onClick={handleCloseModal}>
            <Close width={24} height={24} color={'#8779F8'} />
          </IconButton>
        </div>
      </div>
      <div className="body">
        <p className="info">Aguardando confirmação do pagamento via Pix para liberação dos bilhetes do pedido.</p>
        <h6 className="title">
          Valor total a pagar{' '}
          {infoTicket?.valor.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            style: 'currency',
            currency: 'BRL'
          })}
        </h6>
        <div className="qrcode">
          <p>Escaneie o QR code</p>
          <img src={infoTicket?.pagamento.qrCode} alt="QR Code" />
        </div>
        <div className="copy-paste">
          <p>ou se preferir, você pode pagar copiando e colando o seguinte código</p>
          <div className="copy">
            <textarea rows={7} value={infoTicket?.pagamento.textoPix} readOnly id="chave-pix" />
          </div>
        </div>
      </div>
      <div className="copy">
        <Button type="button" text="Copiar código" variant="medium" onClick={handleCopyPix} />
      </div>
    </ContainerPaymentPIX>
  );
};
