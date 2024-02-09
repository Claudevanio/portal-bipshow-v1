import React from 'react';
import { ITicketSale } from '@/types';
import { QRCodeSVG } from 'qrcode.react';
import { Logo } from '@/components/icons/Logo';
import { ContainerCardQRCODE } from './styles';
import { Button } from '@/components/Form/Button';

export const CardQRCODE: React.FC<ITicketSale> = ({
  nome,
  comprador,
  utilizador,
  valorIngresso,
  facial,
  valorTaxa,
  codigo,
  id,
  podeTransferir,
  onClickTransfer,
  onClickCancel

}) => {
  return (
    <div
      className=' border-gray border-l-2 pl-4 flex flex-col gap-2 '
    >
      <p
        className='font-medium text-textPrimary'
      >
        {
          facial ? 'O acesso ao evento será feito exclusivamente por reconhecimento facial' : 'Acesse este QR Code para ter acesso ao seu evento'
        }

      </p>
      <div
        className='flex gap-8'
      >
        <div className="qrcode">
          {facial && 
          (
            <svg width="100" height="100" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M5.81815 5H10.679V6.64292H6.64347V10.7337H5V5.81815C5 5.37153 5.37098 5 5.81815 5ZM21.3215 5H26.1824C26.629 5 27.0005 5.37098 27.0005 5.81815V10.727H25.3576V6.64347H21.3149V5H21.3215ZM21.2663 25.3571H25.3571V21.3144H27V26.1752C27 26.629 26.629 26.9934 26.1818 26.9934H21.273V25.3571H21.2663ZM5 21.2663H6.64292V25.3571H10.6856V27H5.81815C5.37153 27 5 26.629 5 26.1819V21.2663Z" fill="#05B59D" />
              <path fillRule="evenodd" clipRule="evenodd" d="M19.4718 18.8131C19.6507 18.4764 20.0631 18.3455 20.3998 18.5244C20.7366 18.6961 20.8674 19.1156 20.6885 19.4524C19.781 21.1919 17.9934 22.2778 16.027 22.2778C14.0539 22.2778 12.273 21.1985 11.3588 19.4524C11.1871 19.1156 11.3108 18.6961 11.6541 18.5244C11.9909 18.3455 12.4105 18.4764 12.5822 18.8131C13.2557 20.1055 14.5762 20.9032 16.0264 20.9032C17.4778 20.9032 18.7978 20.0988 19.4718 18.8131ZM15.3673 18.0159H17.1962C17.5744 18.0159 17.8835 17.7068 17.8835 17.3286C17.8835 16.9505 17.5744 16.6413 17.1962 16.6413H16.0551V14.2482C16.0551 13.87 15.746 13.5608 15.3678 13.5608C14.9897 13.5608 14.6805 13.87 14.6805 14.2482V17.3281C14.6794 17.7134 14.9819 18.0159 15.3673 18.0159ZM11.9092 11.1478C12.5695 11.1478 13.1055 11.6838 13.1055 12.3441C13.1055 13.0044 12.5695 13.5404 11.9092 13.5404C11.2489 13.5404 10.7129 13.0044 10.7129 12.3441C10.7129 11.6838 11.2489 11.1478 11.9092 11.1478ZM18.901 12.3369C18.901 11.6767 19.437 11.1406 20.0973 11.1406C20.7576 11.1406 21.2936 11.6767 21.2936 12.3369C21.2936 12.9972 20.7576 13.5332 20.0973 13.5332C19.437 13.5332 18.901 12.9972 18.901 12.3369Z" fill="#141515" />
            </svg>
          )
          
          }
          {!facial && 
          (
            <div>
            <p className="text-dark">{codigo}</p>
            <QRCodeSVG
              className="qrcode"
              value={`${process.env.URL_API}/imprima/bilhete/mobile?c=${codigo}&eid=${id}`}
            />
            <Logo width={63} height={10} />
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between w-full font-medium text-textPrimary">
          <div> 
            <p className="text-tertiary text-sm"><span
              className='hidden md:inline'
            >Nome:</span>  {utilizador.nome}
            </p>
          </div>
          <div
            className="flex flex-col gap-2 text-xs"
          >
            <p className="">Valor:   {(valorIngresso + valorTaxa).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                style: 'currency',
                currency: 'BRL',
              })}
            
            </p>
            <p className=""><span
              className='hidden md:inline'
            >Tipo:</span> {nome}</p> 
          </div>
        </div>
        <div
          className="flex flex-col md:flex-row gap-4 justify-between w-full"
        >
        {
          onClickCancel && (
            <Button
              variant="outline"
              type="button"
              text="Cancelar"
              // className="!border-[#F65252] !text-[#F65252]"
              onClick={onClickCancel}
            />
          )
        }
          {podeTransferir && (
                      <Button
                        variant="medium"
                        type="button"
                        text="Transferir"
                        onClick={onClickTransfer}
                      />
            )}
        </div>
    </div>
        <p>
          válido como comprovante de aquisição
        </p>
  </div>
  );
};
