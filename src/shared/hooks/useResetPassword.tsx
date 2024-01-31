import React, {
  createContext, useCallback, useContext, useState,
} from 'react';
import { useRouter } from 'next/router';
import { api, SET_NEW_PASSWORD } from '@/services';
import { TypeEnum, useError } from './useDialog';

export interface IDataForm {
  senha: string;
  confirmarSenha: string;
}

interface IResetPassword {
  handleSubmitResetPassword: (data: IDataForm) => void;
  loading: boolean;
  success: boolean;
  stepper: number;
}

const ResetPasswordContext = createContext({} as IResetPassword);

export const ResetPasswordProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { query: { token } } = useRouter();
  const { showErrorDialog } = useError();
  const callErrorDialogComponent = (message: string, type?: string) => {
    showErrorDialog(message, type ?? TypeEnum.INFO);
  };
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isStepper, setIsStepper] = useState<number>(0);

  const handleSubmitResetPassword = useCallback(async (data: IDataForm) => {
    try {
      setIsLoading(true);
      if (data.confirmarSenha && data.senha && data.senha === data.confirmarSenha) {
        const result = await api.post(SET_NEW_PASSWORD, {
          token,
          novaSenha: data.senha,
        }) as { data: { sucesso: boolean } };

        if (result.data.sucesso) {
          callErrorDialogComponent("Senha atualizada com sucesso.", TypeEnum.SUCCESS)
          setIsSuccess(result.data.sucesso);
          setIsStepper(1);
        } else {
          callErrorDialogComponent("Senha inválida. Verifique.", TypeEnum.ERROR)
        }
      } else {
        callErrorDialogComponent("Senha inválida. Verifique.", TypeEnum.ERROR)
      }

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      callErrorDialogComponent("Ocorreu um erro de comunicação.", TypeEnum.ERROR)
    }
  }, [showErrorDialog, token]);

  return (
    <ResetPasswordContext.Provider value={{
      handleSubmitResetPassword, loading: isLoading, success: isSuccess, stepper: isStepper,
    }}
    >
      {children}
    </ResetPasswordContext.Provider>
  );
};

export const useResetPassword = (): IResetPassword => {
  const context = useContext(ResetPasswordContext);
  return context;
};
