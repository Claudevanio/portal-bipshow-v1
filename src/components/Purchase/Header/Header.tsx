import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/icons/Logo';
import { useEventTicket } from '@/shared/hooks/useEventTicket';
import { Button } from '@/components/Form/Button';
import { Cancel } from '@/components/icons/Cancel';
import { theme } from '@/shared';
import { useTicketPurchase } from '@/shared/hooks/useTicketPurchase';
import { ContainerHeader, Image } from './styles';
import { IHeader } from './interface';
import { CancelOutlined, CancelRounded, Close } from '@mui/icons-material';
import dayjs from 'dayjs';
import ptBr from 'dayjs/locale/pt-br';

dayjs.locale(ptBr);

export const Header: React.FC<IHeader> = ({ handleClose }) => {
  const { ticket, eventTicket } = useEventTicket();
  const {
    setIsStepper, setIsPurchaseSuccess, webView, purchaseSuccess,
  } = useTicketPurchase();

  return (
    <ContainerHeader className={webView ? 'webview' : ''}>
      <div
        className="flex justify-center  items-center h-full px-6 md:p-0"
      >
        <div className="flex justify-between bg-white p-6 h-full gap-5 items-center relative w-full md:w-1/2"
          style={{
            boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.08)'
          }}
        >
          <Image image={`${eventTicket?.imagens?.minicapa?.link}`}
            className=' w-1/2 md:w-40 h-20 '
          />
          <div className="flex flex-col gap-1 w-1/2 font-medium ">
            <p className="text-dark text-sm">
              {eventTicket && eventTicket.nome}
            </p>
            <p className='text-textPrimary text-xs'>
              {
                eventTicket && eventTicket?.localidade
              } - 
              {
                eventTicket && eventTicket?.nomeDoLugar
              }
            </p>
            <p className='text-textPrimary text-sm'>
              {
                ticket && ticket.tiposDeIngresso[0]?.dataUtilizacaoTexto?.split(' ')[1]
              }
            </p>
            <p className="text-textPrimary text-xs">
              {ticket && dayjs(ticket.tiposDeIngresso[0]?.dataUtilizacao).format('DD [de] MMMM [de] YYYY')}
            </p>
          </div>
          {!webView && !purchaseSuccess && (
            <div
              className='hidden md:flex'
            >
              <Button
                variant="outline-medium"
                className="hidden md:flex !text-[#2C2E2F] border-[#2C2E2F]"
                text="Cancelar"
                icon={<CancelOutlined width={16} height={16} className='text-danger' />}
                onClick={() => {
                  if (handleClose) handleClose();
                  setTimeout(() => {
                    setIsStepper(1);
                    setIsPurchaseSuccess(false);
                  }, 2000);
                }}
              />
            </div>
          )}
        {!webView && !purchaseSuccess && (
          <Close
            width={16} height={16}
            className='flex md:!hidden !text-danger h-8 w-8 rounded-full items-center justify-center cursor-pointer absolute top-[-12px] md:top-0 right-[-10px] md:right-0 border-2 border-gray'
            onClick={() => {
              if (handleClose) handleClose();
              setTimeout(() => {
                setIsStepper(1);
                setIsPurchaseSuccess(false);
              }, 2000);
            }}
          />
        // <Button
        //   variant="outline-medium"
        //   className="flex absolute top-0 right-0 md:!hidden"
        //   text=""
        //   icon={<Cancel width={16} height={16} color={"#F65252"} />}
          // onClick={() => {
          //   if (handleClose) handleClose();
          //   setTimeout(() => {
          //     setIsStepper(1);
          //     setIsPurchaseSuccess(false);
          //   }, 2000);
          // }}
        // />
        )}
        </div>
      </div>
    </ContainerHeader>
  );
};
