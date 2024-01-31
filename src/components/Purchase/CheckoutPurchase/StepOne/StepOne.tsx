import React, { useEffect, useMemo } from 'react';
import { Button } from '@/components/Form/Button';
import { useTicketPurchase } from '@/shared/hooks/useTicketPurchase';
import { LoadingSmall } from '@/components/LoadingSmall';
import { ContainerStepOne } from './styles';
import { Card } from './Card';

export const StepOne: React.FC = () => {
  const { ticketSelectedUser, setIsStepper, loadingOrder, handleLoadPurchaseFlowTicket } = useTicketPurchase();

  const disabledButtonNext = useMemo((): boolean => {
    const findExistFilled = ticketSelectedUser?.find((item) => item.filled);

    return !!findExistFilled;
  }, [ticketSelectedUser]);

  useEffect(() => {
    console.log('ticketSelectedUser', ticketSelectedUser)
    // handleLoadPurchaseFlowTicket()
  }, [ticketSelectedUser])

  return (
    <ContainerStepOne>
      <div>
        <p className="text-light">Se o ingresso for para seu uso, clique em ”Meu ingresso”, caso contrário, clique em ”Transferir”</p>
      </div>
      {loadingOrder ? (
        <div className="loading-order">
          <LoadingSmall />
        </div>
      ) : (
        <ul>          
          {ticketSelectedUser && ticketSelectedUser.map((item) => (
            <Card key={item.index} nome={item.nomeEvento || ''} index={item.index} user={item} />
          ))}
        </ul>
      )}
      <div className="btn-next">
        <Button variant="medium" text="Prosseguir" onClick={() => setIsStepper(2)} disabled={disabledButtonNext || loadingOrder} />
      </div>
    </ContainerStepOne>
  );
};
