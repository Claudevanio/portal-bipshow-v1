'use client'
import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/Form/Input';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/Form/Button';
import { ArrowLeft } from '@/components/icons/ArrowLeft'; 
import { IDataForm, useResetPassword } from '@/shared/hooks/useResetPassword';
import { Close } from '@/components/icons/Close';
import { Check } from '@/components/icons/Check';
import { CheckPassword } from '@/components/icons/CheckPassword'; 
import { Stepper } from '@/components/Stepper'; 
import { ContainerResetPassword } from './styles';
import { senhaMask } from '@/shared';

const stepperResetPassword = [
  {
    stage: 'Redefinir sua senha',
    number: 0,
  },
  {
    stage: '',
    number: 1,
  },
];

export const ResetPassword: React.FC = () => {
  const methods = useFormContext<IDataForm>();
  const {
    getValues, watch, setValue, formState
  } = methods;
  const [isTypePasswordView, setIsTypePassword] = useState<'password' | 'text'>('password');
  const [isTypePasswordViewConfirm, setIsTypePasswordConfirm] = useState<'password' | 'text'>('password');
  const [isMin, setIsMin] = useState<boolean>(true);
  const [isNumbers, setIsNumbers] = useState<boolean>(true);
  const [isConfirmPassword, setIsConfirmPassword] = useState<boolean>(true);
  const {
    handleSubmitResetPassword, loading, success, stepper,
  } = useResetPassword();

  const onSubmit = (data: IDataForm) => handleSubmitResetPassword(data);

  const isPassword = watch('senha');
  const isPasswordConfirm = watch('confirmarSenha');

  useEffect(() => {
    methods.reset({
      senha: '',
      confirmarSenha: '',
    });
  }, []);

  const handleChangePassword = useCallback((password: string) => {
    if (password.length >= 6) {
      setIsMin(false);
    } else {
      setIsMin(true);
    }
    if (/^[0-9]+$/.test(password)) {
      setIsNumbers(false);
    } else {
      setIsNumbers(true);
    }
    if (getValues('confirmarSenha') === getValues('senha')) {
      setIsConfirmPassword(false);
    } else {
      setIsConfirmPassword(true);
    }
    if (password.length <= 0) {
      setIsConfirmPassword(true);
      setIsNumbers(true);
      setIsMin(true);
    }
    if (password.length > 16) {
      return;
    }
    setValue('senha', senhaMask(password));
  }, [setIsNumbers, setValue, getValues]);

  useEffect(() => {
    if (isPassword) {
      handleChangePassword(isPassword);
    }
  }, [isPassword, handleChangePassword, isPasswordConfirm]);

  return (
    <ContainerResetPassword>
      <Link href="/" legacyBehavior>
        <a className="back-home">
          <ArrowLeft width={24} height={24} color={'#8779F8'} />
        </a>
      </Link>
      <div className="container">
        <Stepper steps={stepperResetPassword} currentStep={stepperResetPassword[stepper]} />
        <div className="card">
          {success ? (
            <div className="success">
              <CheckPassword width={82} height={82} color={'#8779F8'} />
              <h6 className="title">Senha atualizada!</h6>
              <p className="text-light">Você alterou a senha com sucesso. Agora você já pode acessar com os novos dados.</p>
              <Link href="/"
                className='rounded-md bg-primary text-white px-4 py-2 mt-4 text-center w-full'
              >
                Acessar
              </Link>
              {/* <ButtonLink href="/login" variant="contained" text="Acessar" /> */}
            </div>
          ) : (
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <h6 className="title">
                Alterar sua senha
              </h6>
              <p className="text-light">
                Digite abaixo uma nova senha
              </p>
              <div className="help">
                <ul>
                  <li>
                    <p>
                    {(isMin || isNumbers) && <Close width={18} height={18} color={'#F65252'} />}
                      {!isMin &&  !isNumbers && <Check width={18} height={18} color={'#8779F8'} />}
                       A senha precisa ter: 06 números
                    </p>
                  </li> 
                  <li>
                    <p>
                      {isConfirmPassword && <Close width={18} height={18} color={'#F65252'} />}
                      {!isConfirmPassword && <Check width={18} height={18} color={'#8779F8'} />}
                      Confirmação de Senha
                    </p>
                  </li>
                </ul>
              </div>
              <Input
                type={isTypePasswordView}
                name="senha"
                id="senha"
                label="Senha"
                rules={{
                  required: {
                    value: true,
                    message: 'Senha inválida. Verifique',
                  },
                  minLength: {
                    value: 6,
                    message: 'Senha inválida. Verifique',
                  },
                  maxLength: {
                    value: 16,
                    message: 'Senha inválida. Verifique',
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: 'A senha deve conter somente números. Verique',
                  },
                }}
                onChange={(event) => {
                  
                  handleChangePassword(event.target.value);
                }}
                password={{
                  value: isTypePasswordView,
                  onClick: () => setIsTypePassword(isTypePasswordView === 'password' ? 'text' : 'password'),
                }}
                disabled={loading}
                errorText={formState.errors.senha && formState.errors.senha.message as string}
              />
              <Input
                type={isTypePasswordViewConfirm}
                name="confirmarSenha"
                id="confirmarSenha"
                label="Confirmação de senha"
                rules={{
                  required: {
                    value: true,
                    message: 'Senha inválida. Verifique',
                  },
                  validate: (password: string) => {
                    if (password === isPassword) {
                      return undefined;
                    }
                    return 'Confirmação de senha deve ser igual a senha.';
                  },
                }}
                password={{
                  value: isTypePasswordViewConfirm,
                  onClick: () => setIsTypePasswordConfirm(isTypePasswordViewConfirm === 'password' ? 'text' : 'password'),
                }}
                onChange={(event) => {
                  setValue('confirmarSenha', senhaMask(event.target.value));
                }}
                disabled={loading}
                errorText={formState.errors.confirmarSenha?.message as string}
              />
              <div className="submit">
                <Button text="Confirmar" variant="medium" type="submit" disabled={loading} loading={loading} />
              </div>
            </form>
          )}
        </div>
      </div>
    </ContainerResetPassword>
  );
};
