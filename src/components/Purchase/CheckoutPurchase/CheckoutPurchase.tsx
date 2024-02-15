import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Stepper } from '@/components/Stepper';
import { stepperCheckoutPurchase } from '@/shared/config/stepper';
import { useTicketPurchase } from '@/shared/hooks/useTicketPurchase';
import { ArrowLeft } from '@/components/icons/ArrowLeft';
import { theme } from '@/shared';
import { IconButton } from '@/components/IconButton';
import { useEventTicket } from '@/shared/hooks/useEventTicket';
import { ContainerCheckoutPurchase } from './styles';
import { StepOne } from './StepOne';
import { StepTwo } from './StepTwo';
import { StepThree } from './StepThree';
import { ICheckoutPurchase } from './interface';
import { usePathname } from 'next/navigation';

const COUNT_INITIAL_TIME_IN_SECONDS = 15 * 60; // 15 MINUTOS

export const CheckoutPurchase: React.FC<ICheckoutPurchase> = ({ handleClickCheckoutNotPurchase }) => {
  const pathname = usePathname();
  const {
    stepper, purchaseSuccess, setIsStepper, dataOrder, handleLoadPurchaseFlowTicket, webView,
  } = useTicketPurchase();
  const { ticketsPurchase, guidePurchase } = useEventTicket();
  const [isSecondsAmount, setIsSecondsAmount] = useState(COUNT_INITIAL_TIME_IN_SECONDS);

  useEffect(() => {
    if (isSecondsAmount <= 0) {
      setIsSecondsAmount(0);
      return;
    }
    if (((ticketsPurchase && ticketsPurchase.length > 0 && ticketsPurchase[0].cadeiras) || (dataOrder && dataOrder.pedido && dataOrder.pedido.prereserva)) && stepper > 1) {
      setTimeout(() => {
        setIsSecondsAmount((state) => state - 1);
      }, 1000);
    }
  }, [isSecondsAmount, ticketsPurchase, dataOrder, stepper]);

  const minutes = Math.floor(isSecondsAmount / 60);
  const seconds = isSecondsAmount % 60;

  useEffect(() => {
    if (stepper === 1 && pathname === '/profile/tickets' && guidePurchase) {
      handleLoadPurchaseFlowTicket(guidePurchase.guide);
    }
  }, [pathname, guidePurchase, handleLoadPurchaseFlowTicket, stepper]);

  return (
    <ContainerCheckoutPurchase>
      {((ticketsPurchase && ticketsPurchase.length > 0 && ticketsPurchase[0].cadeiras) || (dataOrder && dataOrder.pedido && dataOrder.pedido.prereserva)) && stepper > 1 && (
        <div className="time">
          <p className="text-light">
            Você tem
            {' '}
            <b>
              {String(minutes).padStart(2, '0')}
              :
              {String(seconds).padStart(2, '0')}
            </b>
            {' '}
            para confirmar o pagamento
          </p>
        </div>
      )}
      <div className="header">
        {
          false && 
        <div className="header-checkout-purchase">
          {!purchaseSuccess && !webView && stepperCheckoutPurchase[stepper].number > 1 && (
            <IconButton onClick={() => {
              if (stepper > 1) {
                setIsStepper(1);
              } else {
                handleClickCheckoutNotPurchase();
              }
            }}
            >
              <ArrowLeft width={24} height={24} color={'#8779F8'} />
            </IconButton>
          )}
          <h4 className="title">{purchaseSuccess ? 'Pronto!' : stepperCheckoutPurchase[stepper].stage}</h4>
        </div>
        }
        <Stepper
          steps={stepperCheckoutPurchase}
          currentStep={purchaseSuccess ? {
            number: 3,
            stage: 'Pronto!',
          } : stepperCheckoutPurchase[stepper]}
        />
      </div>
      <div className="content-steps">
        {stepper === 1 && (
        <StepOne />
        )}
        {stepper === 2 && (
          purchaseSuccess ? (
            <StepThree />
          ) : <StepTwo />
        )}
      </div>
    </ContainerCheckoutPurchase>
  );
};
