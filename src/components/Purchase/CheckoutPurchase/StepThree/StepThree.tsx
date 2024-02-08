import React, { useCallback, useEffect } from 'react';
import { Status } from '@/components/Status';
import { Button } from '@/components/Form/Button';
import { useTicketPurchase } from '@/shared/hooks/useTicketPurchase';
import { Button as ButtonForm } from '@/components/Form/Button';
import { ContainerStepThree } from './styles';
import { TypeEnum, useError } from '@/shared/hooks/useDialog';
import { useRouter, usePathname } from 'next/navigation';

export const StepThree: React.FC = () => {
  const { idPurchase, paymentPerPix, amount } = useTicketPurchase();
  const { showErrorDialog } = useError();
  const callErrorDialogComponent = (message: string, type?: string) => {
    showErrorDialog(message, type ?? TypeEnum.INFO);
  };
  const channel = new MessageChannel();
  const port1 = channel.port1;
  const router = useRouter();
  const pathName = usePathname();
  const handleCopyPix = useCallback(() => {
    const isContent = (document.getElementById('chave-pix') as HTMLTextAreaElement);

    isContent.select();
    document.execCommand('copy');
    callErrorDialogComponent("Código copiado.", TypeEnum.SUCCESS)
  }, [showErrorDialog]);

  
  // if pathName doesnt include '/payment' then redirect to payment/idPurchase
  useEffect(() => {
    if (!pathName.includes('/payment')) {
      // router.push(`/payment/${idPurchase}`);
    }
  }, [pathName, idPurchase]);
  

  return (
    <ContainerStepThree>
      <div className="header">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M44.9863 38.4996C44.5863 38.2996 44.1863 38.3996 43.8863 38.5996C43.6863 38.7996 43.5863 38.9996 43.4863 39.2996C43.4863 39.5996 43.5863 39.7996 43.6863 39.9996C43.8863 40.1996 44.0863 40.2996 44.3863 40.3996C44.6863 40.3996 44.8863 40.2996 45.0863 40.1996C45.2863 39.9996 45.3863 39.7996 45.4863 39.4996C45.4863 39.1996 45.3863 38.9996 45.2863 38.7996C45.1863 38.5996 45.0863 38.4996 44.9863 38.4996Z" fill="#8779F8" />
          <path d="M35.7863 28.8004C35.3863 29.2004 35.2863 29.8004 35.6863 30.2004C35.8863 30.4004 36.0863 30.5004 36.3863 30.6004C36.5863 30.6004 36.8863 30.6004 37.0863 30.4004C37.4863 30.0004 37.5863 29.4004 37.1863 29.0004C36.8863 28.5004 36.2863 28.5004 35.7863 28.8004Z" fill="#8779F8" />
          <path d="M35.0863 27.8992C35.4863 27.4992 35.5863 26.8992 35.1863 26.4992C34.7863 26.0992 34.1863 25.9992 33.7863 26.3992C33.3863 26.7992 33.2863 27.3992 33.6863 27.7992C33.8863 27.9992 34.0863 28.0992 34.3863 28.1992C34.5863 28.1992 34.8863 28.0992 35.0863 27.8992Z" fill="#8779F8" />
          <path d="M32.2867 25.7007C32.5867 25.7007 32.7867 25.6007 32.9867 25.5007C33.3867 25.1007 33.4867 24.5007 33.0867 24.1007C32.6867 23.7007 32.0867 23.6007 31.6867 24.0007C31.2867 24.4007 31.1867 25.0007 31.5867 25.4007C31.7867 25.6007 32.0867 25.7007 32.2867 25.7007Z" fill="#8779F8" />
          <path d="M37.8878 31.2996C37.4878 31.6996 37.3878 32.2996 37.7878 32.6996C37.9878 32.8996 38.1878 32.9996 38.4878 33.0996C38.7878 33.0996 38.9878 32.9996 39.1878 32.8996C39.5878 32.4996 39.6878 31.8996 39.2878 31.4996C38.8878 30.9996 38.2878 30.8996 37.8878 31.2996Z" fill="#8779F8" />
          <path d="M41.8878 36.1002C41.4878 36.5002 41.3878 37.1002 41.7878 37.5002C41.9878 37.7002 42.1878 37.8002 42.4878 37.9002C42.6878 37.9002 42.9878 37.9002 43.1878 37.7002C43.5878 37.3002 43.6878 36.7002 43.2878 36.3002C42.8878 35.9002 42.2878 35.8002 41.8878 36.1002Z" fill="#8779F8" />
          <path d="M39.8878 33.7008C39.4878 34.1008 39.3878 34.7008 39.7878 35.1008C39.9878 35.3008 40.1878 35.4008 40.4878 35.5008C40.7878 35.5008 40.9878 35.4008 41.1878 35.3008C41.5878 34.9008 41.6878 34.3008 41.2878 33.9008C40.8878 33.4008 40.2878 33.4008 39.8878 33.7008Z" fill="#8779F8" />
          <path d="M29.4863 22.8002C29.4863 22.9002 29.5863 22.9002 29.5863 23.0002C29.7863 23.2002 29.9863 23.3002 30.2863 23.4002C30.3863 23.4002 30.3863 23.4002 30.4863 23.4002C30.5863 23.4002 30.5863 23.4002 30.6863 23.4002C30.7863 23.4002 30.7863 23.4002 30.8863 23.3002C30.9863 23.3002 30.9863 23.2002 31.0863 23.2002C31.2863 23.0002 31.3863 22.8002 31.4863 22.5002C31.4863 22.2002 31.3863 22.0002 31.2863 21.8002C31.2863 21.7002 31.1863 21.7002 31.1863 21.7002C31.1863 21.7002 31.0863 21.6002 30.9863 21.6002C30.8863 21.6002 30.8863 21.5002 30.7863 21.5002C30.4863 21.4002 30.0863 21.5002 29.8863 21.7002C29.7863 21.7002 29.7863 21.8002 29.7863 21.8002C29.7863 21.8002 29.6863 21.9002 29.6863 22.0002C29.6863 22.1002 29.5863 22.1002 29.5863 22.2002C29.5863 22.3002 29.5863 22.3002 29.5863 22.4002C29.5863 22.5002 29.5863 22.5002 29.5863 22.6002C29.5863 22.7002 29.5863 22.7002 29.5863 22.8002C29.4863 22.7002 29.4863 22.7002 29.4863 22.8002Z" fill="#8779F8" />
          <path d="M32.0872 38.1008L32.5872 33.7008C32.5872 33.3008 32.4872 33.0008 32.0872 32.7008C31.7872 32.5008 31.3872 32.5008 30.9872 32.7008L27.1872 35.0008L23.0872 33.2008C22.7872 33.0008 22.2872 33.1008 22.0872 33.3008C21.7872 33.5008 21.6872 33.9008 21.7872 34.3008L22.6872 38.1008L22.7872 38.6008L21.6872 39.8008L19.7872 42.0008C19.4872 42.3008 19.4872 42.7008 19.5872 43.0008C19.6872 43.4008 20.0872 43.6008 20.4872 43.6008L24.1872 43.9008L24.8872 44.0008L25.7872 45.6008L27.0872 47.9008C27.2872 48.2008 27.6872 48.4008 27.9872 48.4008C28.3872 48.4008 28.6872 48.1008 28.8872 47.8008L30.5872 43.7008L34.9872 42.8008C35.1872 42.8008 35.2872 42.7008 35.3872 42.6008C35.5872 42.5008 35.6872 42.3008 35.6872 42.1008C35.7872 41.7008 35.6872 41.3008 35.3872 41.1008L32.0872 38.1008ZM29.6872 41.8008C29.3872 41.9008 29.0872 42.1008 28.9872 42.4008L27.8872 45.1008L26.3872 42.5008C26.2872 42.4008 26.1872 42.3008 26.0872 42.2008C25.9872 42.1008 25.7872 42.0008 25.5872 42.0008L23.8872 41.9008L22.6872 41.8008L23.3872 41.0008L24.6872 39.6008C24.6872 39.6008 24.6872 39.6008 24.7872 39.5008C24.9872 39.3008 24.9872 39.0008 24.9872 38.7008L24.2872 35.8008L26.9872 37.0008C27.2872 37.1008 27.5872 37.1008 27.8872 36.9008L30.3872 35.4008L29.9872 38.4008C29.9872 38.7008 30.0872 39.1008 30.2872 39.3008L32.4872 41.2008L29.6872 41.8008Z" fill="#8779F8" />
          <path d="M55.8871 20.4L52.1871 16.9C51.7871 16.5 51.1871 16.5 50.7871 16.9C49.3871 18.3 47.0871 18.4 45.5871 17C44.0871 15.6 44.0871 13.3 45.3871 11.8C45.7871 11.4 45.6871 10.8 45.3871 10.4L41.6871 6.9C41.0871 6.3 40.2871 6 39.3871 6C38.4871 6 37.6871 6.4 37.0871 7L12.6871 32.7C12.0871 33.3 11.7871 34.2 11.7871 35L18.6871 29.3L38.5871 8.4C38.7871 8.2 39.0871 8 39.4871 8C39.7871 8 40.1871 8.1 40.3871 8.4L43.3871 11.3C42.7871 12.3 42.4871 13.4 42.4871 14.6C42.4871 16.1 43.1871 17.5 44.2871 18.5C45.3871 19.5 46.7871 20.1 48.2871 20.1C49.4871 20.1 50.5871 19.7 51.4871 19L54.4871 21.9C54.6871 22.1 54.8871 22.5 54.8871 22.8C54.8871 23.1 54.7871 23.5 54.4871 23.7L50.1871 28.2L51.4871 29.8L55.8871 25.1C56.4871 24.5 56.7871 23.6 56.7871 22.7C56.8871 21.8 56.5871 21 55.8871 20.4Z" fill="#8779F8" />
          <path d="M51.5879 29.6993L50.2879 28.0993L49.2879 26.8993C48.9879 26.4993 48.2879 26.3993 47.8879 26.7993C46.2879 28.0993 43.9879 27.7993 42.6879 26.2993C41.3879 24.7993 41.5879 22.3993 43.0879 21.0993C43.4879 20.6993 43.5879 20.0993 43.1879 19.6993L39.9879 15.7993C38.7879 14.3993 36.7879 14.1993 35.3879 15.3993L26.6879 22.5993L10.6879 35.8993L8.18794 37.9993C6.78794 39.1993 6.58794 41.1993 7.78794 42.5993L10.9879 46.4993C11.2879 46.9993 11.9879 46.9993 12.3879 46.6993C13.9879 45.3993 16.2879 45.6993 17.5879 47.1993C18.8879 48.6993 18.6879 51.0993 17.1879 52.3993C16.7879 52.7993 16.6879 53.3993 17.0879 53.7993L20.2879 57.6993C21.4879 59.0993 23.4879 59.2993 24.8879 58.0993L52.1879 35.4993C53.5879 34.2993 53.7879 32.2993 52.5879 30.8993L51.5879 29.6993ZM50.8879 33.9993L23.5879 56.5993C22.9879 56.9993 22.1879 56.9993 21.7879 56.3993L19.0879 53.1993C19.7879 52.2993 20.2879 51.1993 20.3879 50.0993C20.4879 48.5993 20.0879 47.0993 19.0879 45.9993C18.0879 44.7993 16.7879 44.0993 15.2879 43.9993C14.0879 43.7993 12.9879 43.9993 11.9879 44.5993L9.28794 41.3993C8.78794 40.8993 8.88794 39.9993 9.48794 39.5993L31.6879 21.2993L36.7879 16.9993C37.2879 16.4993 38.1879 16.5993 38.5879 17.1993L41.2879 20.3993C40.5879 21.2993 40.0879 22.3993 39.9879 23.4993C39.8879 24.9993 40.2879 26.4993 41.2879 27.5993C42.2879 28.7993 43.5879 29.4993 45.0879 29.5993C46.2879 29.6993 47.3879 29.4993 48.3879 28.8993L48.8879 29.5993L50.9879 32.1993C51.4879 32.6993 51.3879 33.4993 50.8879 33.9993Z" fill="#141515" />
        </svg>
        <h5 className="title">Compra realizada</h5>
        {amount > 0 &&(
          <Status text={`${paymentPerPix ? 'Aguardando pagamento' : 'Pagamento em análise'}`} type="warning" />
        )}
        {amount <= 0 &&(
          <Status text={ 'Ingresso adquirido'} type="success" />
        )}
      </div> 
      {!paymentPerPix && amount > 0 && (
        <div className="text">
          <p className="text">
            Seu pedido
            {' '}
            {idPurchase}
            {' '}
            foi realizado com sucesso e o pagamento está em análise.
          </p>
          <p className="text">
            Você receberá um e-mail de confirmação juntamente com as instruções de acesso.
          </p>
        </div>
      )}
      {amount <= 0 &&(
        <div className="text">
          <p className="text">
            Seu pedido
            {' '}
            {idPurchase}
            {' '}
            foi realizado com sucesso e o seu ingresso foi adquirido.
          </p>
        </div>
       )}
      {paymentPerPix && amount > 0 && (
        <div className="text pix">
          <p className="text">
            Aguardando confirmação do pagamento via Pix para liberação dos bilhetes do pedido.
          </p>
        </div>
      )}

      {paymentPerPix && (
        <div className="pix-copy">
          <p className="amount">
            Valor a pagar
            {' '}
            {amount.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              style: 'currency',
              currency: 'BRL',
            })}
          </p>
          <div className="qrcode">
            <p>Escaneie o QR code</p>
            <img src={paymentPerPix.qrCode} alt="QR Code" />
          </div>
          <div className="copy-paste">
            <p>ou se preferir, você pode pagar copiando e colando o seguinte código</p>
            <div className="copy">
              <textarea rows={7} value={paymentPerPix.textoPix} readOnly id="chave-pix" />
            </div>
            <ButtonForm type="button" text="Copiar código" variant="outline" onClick={handleCopyPix} />
          </div>
        </div>
      )}
      <div className="btn"> 
          <Button 
          onClick={() => router.push('/profile?tab=orders')}
          text="Ver meus pedidos" variant="outline-medium" /> 
      </div>
    </ContainerStepThree>
  );
};
