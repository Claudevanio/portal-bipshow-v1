import React, {
  useEffect, useMemo, useState,
} from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Input } from '@/components/Form/Input';
import { CARDMask, CVVMask, VALIDATIONCARDMask } from '@/shared/config/mask';
import { Button } from '@/components/Form/Button';
import { IPurchase } from '@/types';
import { Radio } from '@/components/Form/Radio';
import { useTicketPurchase } from '@/shared/hooks/useTicketPurchase';
import { validationFlag } from '@/shared/config/validationFlag';
import { format } from 'date-fns';
import { useRegister } from '@/shared/hooks/useRegister';
import { Alert } from '@/components/Alert';
import { IAlert } from '@/types';
import { LoadingSmall } from '@/components/LoadingSmall';
import { ModalEditAddress } from './ModalEditAddress';
import { ContainerAccordionThree } from './styles';
import { ModalPurchaseSummary } from './ModalPurchaseSummary';
import { OptionsPayment } from './OptionsPayment';
import { Coupon } from './Coupon';
import { PIX } from './PIX';
import { Modal } from '@mui/material';
import { LoadingPayment } from '@/components/LoadingPayment';

export const AccordionThree: React.FC = () => {
  const methods = useForm<IPurchase>();
  const {
    loading, selectedPayment, handleQuantityinstallment, installments, loadinginstallment, setInstallment, amount, onChangePaymentCardType, optionCardPayment, handleSubmitIngressoCortesia,
    guide, handleLoadPurchase
  } = useTicketPurchase();
  const cardNumber = methods.watch('cartao');
  const installment = methods.watch('parcelas');
  const { user } = useRegister();
  const [isOpenModalEditAddress, setIsOpenModalEditAddress] = useState<boolean>(false);
  const [isPurchaseSummary, setIsPurchaseSummary] = useState<boolean>(false);
  const [isDataPurchase, setIsDataPurchase] = useState<IPurchase>();

  const handleIsOpenModalEditAddress = () => setIsOpenModalEditAddress(true);
  const handleIsCloseModalEditAddress = () => setIsOpenModalEditAddress(false);

  const handleIsOpenModalPurchaseSummary = () => setIsPurchaseSummary(true);
  const handleIsClsoeModalPurchaseSummary = () => setIsPurchaseSummary(false);

  const onSubmit = async (data: IPurchase) => {
    if (amount <= 0) {
      handleSubmitIngressoCortesia();
      return;
    }

    setIsDataPurchase(data);

    debugger;
    if(guide)
      await handleLoadPurchase(guide.guide, guide.id, data)
    
  };

  const isTypePayment = useMemo(() => {
    switch (selectedPayment?.formaPagamento) {
      case 'CartaoCredito':
        return 'Cartão';
      case 'DebitoOnline':
        return 'Débito Online';
      case 'Boleto':
        return 'Para pagamentos com boleto, o processamento do pagamento pode demorar em até 3 dias úteis.';
      default:
        return 'Dinheiro';
    }
  }, [selectedPayment]);

  useEffect(() => {
    if (document.getElementById('parcelas-1')) {
      (document.getElementById('parcelas-1') as HTMLInputElement).click();
    }
  }, [installments]);

  useEffect(() => {
    if (cardNumber && cardNumber.length >= 19) {
      handleQuantityinstallment(cardNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardNumber, setInstallment]);

  useEffect(() => {
    if (installment) {
      const isInstallment = installments?.find((item) => item.quantity === Number(installment));

      if (isInstallment) {
        setInstallment(isInstallment);
      }
    }
  }, [installment, installments, setInstallment]);

  return (
    <ContainerAccordionThree>
     <Modal open={isOpenModalEditAddress} onClose={handleIsCloseModalEditAddress} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description"> 
        <ModalEditAddress onClose={handleIsCloseModalEditAddress} />
    </Modal>
      <Modal open={isPurchaseSummary} onClose={handleIsClsoeModalPurchaseSummary} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <ModalPurchaseSummary dataPurchase={isDataPurchase} onClose={handleIsClsoeModalPurchaseSummary} />
      </Modal>
      
      <LoadingPayment open={loading} />
      
      {/* <OptionsPayment /> */}
      {selectedPayment && selectedPayment?.formaPagamento === 'Boleto' && (
        <div className="alert-container">
          <Alert variant={IAlert.INFO} text={isTypePayment} />
        </div>
      )}
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {selectedPayment && selectedPayment.formaPagamento === 'CartaoCredito' && amount > 0 && (
          <div>
            <FormProvider {...methods}>
              {/* <div className="options_cartao">
                <Radio
                  id="CREDIT_CARD"
                  checked={optionCardPayment === 'CREDIT_CARD'}
                  label="Cartão de crédito"
                  name="CREDIT_CARD"
                  value="CREDIT_CARD"
                  onClick={() => onChangePaymentCardType('CREDIT_CARD')}
                />
                <Radio
                  id="DEBIT_CARD"
                  label="Cartão de débito"
                  name="DEBIT_CARD"
                  checked={optionCardPayment === 'DEBIT_CARD'}
                  value="CREDIT_CARD"
                  onClick={() => onChangePaymentCardType('DEBIT_CARD')}
                />
              </div> */}
              <div className="input-card">
                <h6 className="title">Dados do cartão</h6>
                <div className="form-data-card">
                  <div className="card-number">
                    <Input
                      type="tel"
                      name="cartao"
                      id="cartao"
                      label="Número do cartão de crédito"
                      rules={{
                        required: {
                          value: true,
                          message: 'Número do cartão inválido. Verifique',
                        },
                        minLength: {
                          value: 19,
                          message: 'Número do cartão inválido. Verifique',
                        },
                        maxLength: {
                          value: 19,
                          message: 'Número do cartão inválido. Verifique',
                        },
                        max: {
                          value: 19,
                          message: 'Número do cartão inválido. Verifique',
                        },
                        min: {
                          value: 19,
                          message: 'Número do cartão inválido. Verifique',
                        },
                        validate: (number: string) => {
                          if (number) {
                            return Boolean(validationFlag(number));
                          }
                          return false;
                        },
                      }}
                      mask={CARDMask}
                      disabled={loading}
                      errorText={methods.formState.errors.cartao && 'Número do cartão inválido. Verifique' as string}
                    />
                  </div>
                  <div className="validation">
                    <Input
                      type="tel"
                      name="validade"
                      id="validade"
                      label="Validade"
                      rules={{
                        required: {
                          value: true,
                          message: 'Inválido',
                        },
                        minLength: {
                          value: 5,
                          message: 'Inválido',
                        },
                        maxLength: {
                          value: 5,
                          message: 'Inválido',
                        },
                        max: {
                          value: 5,
                          message: 'Inválido',
                        },
                        min: {
                          value: 5,
                          message: 'Inválido',
                        },
                        pattern: /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/,
                        validate: (data: string) => {
                          if (Number(data.split('/')[1]) > Number(format(new Date(), 'yy'))) {
                            return true;
                          }
                          return false;
                        },
                      }}
                      mask={VALIDATIONCARDMask}
                      disabled={loading}
                      disabledClean
                      errorText={methods.formState.errors.validade && 'Inválido' as string}
                    />
                  </div>
                  <div className="cvv">
                    <Input
                      type="tel"
                      name="cvv"
                      id="cvv"
                      label="CVV"
                      rules={{
                        required: {
                          value: true,
                          message: 'Inválido',
                        },
                        minLength: {
                          value: 3,
                          message: 'Inválido',
                        },
                        maxLength: {
                          value: 3,
                          message: 'Inválido',
                        },
                      }}
                      mask={CVVMask}
                      disabled={loading}
                      disabledClean
                      errorText={methods.formState.errors.cvv && 'Inválido' as string}
                    />
                  </div>
                </div>
              </div>
              <div className="name-holder">
                <h6 className="title">Dados do titular do cartão</h6>
                <div className="name-holder-input">
                  <Input
                    type="text"
                    name="nome"
                    id="nome"
                    label="Nome impresso no cartão"
                    rules={{
                      required: {
                        value: true,
                        message: 'Nome impresso no cartão inválido. Verifique',
                      },
                      pattern: /^[a-zA-Z]+(?:[\s.]+[a-zA-Z]+)*$/,
                    }}
                    disabled={loading}
                    errorText={methods.formState.errors.nome && 'Nome impresso no cartão inválido. Verifique' as string}
                  />
                </div>
                {/* {user && user.endereco && (
                  <div className="address-holder">
                    <h6 className="title">Endereço de cobrança</h6>
                    <div>
                      <Radio
                        id="address"
                        checked
                        readonly
                        label={`${user.endereco.cep} - ${user.endereco.bairro}${user.endereco.complemento ? ` ${user.endereco.complemento}` : ''}, ${user.endereco.localidade}`}
                        name="parcelas"
                        value="1"
                      />
                      <Button type="button" variant="outline-text" text="Alterar" onClick={handleIsOpenModalEditAddress} />
                    </div>
                  </div>
                )} */}
              </div>
              {/* <Coupon /> */}
              {loadinginstallment && (
                <div className="loading-installment">
                  <LoadingSmall />
                </div>
              )}
              {installments && (
                <div className="installment">
                  <h6 className="title">Parcelamento</h6>
                  <div className="name-holder-input">
                    {installments && installments.length > 0 && optionCardPayment === 'CREDIT_CARD' && (
                      installments.map((item) => (
                        <Radio
                          remainColor
                          key={`key-${item.quantity}`}
                          id="parcelas"
                          label={`${item.quantity}x de ${(item.installmentAmount).toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                            style: 'currency',
                            currency: 'BRL',
                          })}`}
                          
                          // - ${!item.interestFree ? `total de ${item.totalAmount.toLocaleString('pt-BR', {
                          //   minimumFractionDigits: 2,
                          //   style: 'currency',
                          //   currency: 'BRL',
                          // })}` : `sem juros ${item.quantity > 1 ? `total de ${item.totalAmount.toLocaleString('pt-BR', {
                          //   minimumFractionDigits: 2,
                          //   style: 'currency',
                          //   currency: 'BRL',
                          // })}` : ''}`}

                          name="parcelas"
                          value={item.quantity}
                          checked={Number(installment) === item.quantity}
                        />
                      ))
                    )}
                  </div>
                  {((installments && installments.length <= 0) || optionCardPayment === 'DEBIT_CARD') && (
                    <Radio
                      key="key-1"
                      id="parcelas"
                      label={`1x de ${(amount).toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                        style: 'currency',
                        currency: 'BRL',
                      })}`}
                      name="parcelas"
                      checked
                      value={1}
                    />
                  )}
                </div>
              )}
              <div className="btn-submit">
                <Button type="submit" text="Pagar" variant="medium" disabled={!installments} />
                <div className="logo-pagseguro">
                  {/* <img src="/assets/pagseguro.png" alt="Logo do Pagseguro" /> */}
                </div>
              </div>
            </FormProvider>
          </div>
        )}
        {amount <= 0 && (
          <Button type="submit" text="Confirmar" variant="medium" />
        )}
      </form>

      {selectedPayment && selectedPayment.formaPagamento === 'PIX' && amount > 0 && (
        <PIX handleIsOpenModalPurchaseSummary={handleIsOpenModalPurchaseSummary} />
      )}
    </ContainerAccordionThree>
  );
};
