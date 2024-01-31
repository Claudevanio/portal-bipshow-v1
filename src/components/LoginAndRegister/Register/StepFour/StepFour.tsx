import React, { useCallback, useEffect, useState } from 'react';
import { Input } from '@/components/Form/Input';
import { useFormContext } from 'react-hook-form';
import { useAuth } from '@/shared/hooks/useAuth';
import { ContainerStepFour } from './styles';
import { Check, Close } from '@mui/icons-material';
import { senhaMask } from '@/shared';

export const StepFour: React.FC = () => {
  const {
    formState, setValue, getValues, watch,
  } = useFormContext();
  const [isMin, setIsMin] = useState<boolean>(true);
  const [isNumbers, setIsNumbers] = useState<boolean>(true);
  const [isConfirmPassword, setIsConfirmPassword] = useState<boolean>(true);
  const [isTypeView, setIsTypeView] = useState <'text' | 'password'>('password');
  const [isTypeViewConfirmatinPassword, setIsTypeViewConfirmationPassword] = useState <'text' | 'password'>('password');
  const { isLoading } = useAuth();
  const isPassword = watch('senha');
  const isPasswordConfirm = watch('confirmacaoSenha');

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
    if (getValues('confirmacaoSenha') === getValues('senha')) {
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
    setValue('senha', password);
  }, [setIsNumbers, setValue, getValues]);

  useEffect(() => {
    if (isPassword) {
      handleChangePassword(isPassword);
    }
  }, [isPassword, handleChangePassword, isPasswordConfirm]);

  return (
    <ContainerStepFour>
      <div className="help mt-4">
        <ul>
          <li>
            <p>
              {(isMin || isNumbers) && <Close width={18} height={18} className='text-danger' />}
              {!isMin &&  !isNumbers && <Check width={18} height={18} className='text-primary' />}
              A senha precisa ter: 06 números
            </p>
          </li>
          <li>
            <p>
              {isConfirmPassword && <Close width={18} height={18} className='text-danger' />}
              {!isConfirmPassword && <Check width={18} height={18} className='text-primary' />}
              Confirmação de Senha
            </p>
          </li>
        </ul>
      </div>
      <Input
        disabledClean
        type={isTypeView}
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
        max={6}
        maxLength={6}
        onChange={(event) => {
          const isNumber = /^[0-9]+$/;
          if (!isNumber.test(event.target.value) && event.target.value.length > 0) {
            return;
          }
          handleChangePassword(event.target.value);
        }}
        mask={senhaMask}
        password={{
          value: isTypeView,
          onClick: () => setIsTypeView(isTypeView === 'password' ? 'text' : 'password'),
        }}
        disabled={isLoading}
        errorText={formState.errors.senha && formState.errors.senha.message as string}
      />
      <Input
        disabledClean
        type={isTypeViewConfirmatinPassword}
        name="confirmacaoSenha"
        id="confirmacaoSenha"
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
          value: isTypeViewConfirmatinPassword,
          onClick: () => setIsTypeViewConfirmationPassword(isTypeViewConfirmatinPassword === 'password' ? 'text' : 'password'),
        }}
        mask={senhaMask}
        max={6}
        maxLength={6}
        disabled={isLoading}
        onChange={(event) => {
          const isNumber = /^[0-9]+$/;
          if (!isNumber.test(event.target.value) && event.target.value.length > 0) {
            return;
          }
          setValue('confirmacaoSenha', event.target.value);
        }
        }
        errorText={formState.errors.confirmacaoSenha?.message as string}
      />
    </ContainerStepFour>
  );
};
