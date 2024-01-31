import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Input } from '@/components/Form/Input';
import { Button } from '@/components/Form/Button';
import { useTicketPurchase } from '@/shared/hooks/useTicketPurchase';
import { ContainerCoupon } from './styles';

export const Coupon: React.FC = () => {
  const methods = useForm<{
    coupon: string
  }>();
  const {
    handleSubmitCouponDiscount, loadingCouponDiscount, couponAppliep, handleRemoveCoupon,
  } = useTicketPurchase();
  const [isCoupon, setIsCoupon] = useState<string>();
  const [isError, setIsError] = useState<string>();

  const onSubmit = () => {
    if (isCoupon === '' || !isCoupon) {
      setIsError('Insira um valor');
    } else {
      handleSubmitCouponDiscount(isCoupon);
    }
  };

  return (
    <ContainerCoupon>
      <h6 className="title">{couponAppliep ? 'Cupom aplicado' : 'Incluir cupom de desconto'}</h6>
      {couponAppliep && (
        <div className="coupon-applied">
          <p className="information">
            {couponAppliep.coupon}
          </p>
          <div className="btn">
            {loadingCouponDiscount && (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
            {!loadingCouponDiscount && (
              <Button type="button" variant="outline-text" text="Remover cupom" onClick={handleRemoveCoupon} />
            )}
          </div>
        </div>
      )}
      {!couponAppliep && (
        <form>
          <FormProvider {...methods}>
            <div className="input-coupon">
              <Input
                onClean={() => {
                  setIsCoupon("");
                }}
                value={isCoupon}
                disabled={loadingCouponDiscount}
                id="coupon"
                name="coupon"
                label="Cupom de desconto"
                rules={{
                  required: {
                    message: 'Insira um valor',
                    value: true,
                  },
                }}
                type="text"
                onChange={(event) => {
                  setIsCoupon(event.target.value);
                  methods.setValue('coupon', event.target.value);
                }}
                errorText={isError}
              />
            </div>
            <div className="btn">
              {!loadingCouponDiscount && (
                <Button type="button" variant="outline-text" text="Aplicar" onClick={onSubmit} />
              )}
              {loadingCouponDiscount && (
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
            </div>
          </FormProvider>
        </form>
      )}
      {couponAppliep && (
        <div className="discount">
          <h6 className="title">Valor de desconto</h6>
          <p className="information">
            {couponAppliep.valorDesconto.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              style: 'currency',
              currency: 'BRL',
            })}
          </p>
        </div>
      )}
    </ContainerCoupon>
  );
};
