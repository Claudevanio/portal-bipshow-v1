import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Close } from '@/components/icons/Close';
import { IconButton } from '@/components/IconButton'; 
import { Input } from '@/components/Form/Input';
import { cpf, email, telefone } from '@/shared/config/regex';
import { CPFMask, TELEFONEMask } from '@/shared/config/mask';
import { Button } from '@/components/Form/Button';
import { Alert } from '@/components/Alert';
import { IAlert, IUser } from '@/types';
import { useTickets } from '@/shared/hooks/useTickets'; 
import { IModalTransfer } from './interface'; 
import { useRegister } from '@/shared/hooks/useRegister';
import { validateCPF } from '@/shared';  
import { ContainerModal } from './styles';

export const ModalTransfer: React.FC<IModalTransfer> = ({ onHide, show }) => {
  const methods = useForm<IUser>();
  const { handleTranferTickets, loadingTransfer } = useTickets();
  const { user } = useRegister()
  const onHandleSubmit = async (data: any) => {
    onHide();
    handleTranferTickets(data);
  };

  return (
    <ContainerModal
      open={show}
      onClose={onHide}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className='flex items-center justify-center'
    >
      <div
        className='bg-white p-4 rounded-lg w-full md:max-w-[60%] h-full md:h-fit'
      >
        <div className="header flex !w-full !justify-between !items-center">
          <h6 className="title">Dados do titular</h6>
          <IconButton onClick={onHide} className="close">
            <Close width={24} height={24} color={'#8779F8'} />
          </IconButton>
        </div>
        <div className="body">
          <Alert
            variant={IAlert.WARNING}
            html={
              <p
              
              >
                Cadastre os dados da pessoa que deseja transferir a titularidade corretamente. <br/> Após a transferência somente esse titular poderá acessar o ingresso através do app BipShow
                <span
                  className='  !text-warning block'
                >
                Após confirmação, essa operação é irreversível
                </span>
              </p>
            }
          />
          <form onSubmit={methods.handleSubmit(onHandleSubmit)}
            className='md:grid md:grid-cols-2 gap-2'
          >
            <FormProvider {...methods}>
              <Input
                disabledClean
                name="nome"
                id="nome"
                label="Nome completo"
                type="text"
                rules={{
                  required: {
                    value: true,
                    message: 'Nome inválido. Verifique',
                  },
                }}
                disabled={loadingTransfer}
                errorText={methods.formState.errors.nome && methods.formState.errors.nome.message as string}
              />
              <Input
                disabledClean
                type="tel"
                name="telefone"
                id="telefone"
                label="Telefone"
                rules={{
                  required: {
                    value: true,
                    message: 'Telefone inválido. Verifique',
                  },
                  minLength: {
                    value: 15,
                    message: 'Telefone inválido. Verifique',
                  },
                  maxLength: {
                    value: 15,
                    message: 'Telefone inválido. Verifique',
                  },
                  pattern: {
                    value: telefone,
                    message: 'Telefone inválido. Verifique',
                  },
                }}
                disabled={loadingTransfer}
                mask={TELEFONEMask}
                errorText={methods.formState.errors.telefone && methods.formState.errors.telefone.message as string}
              />
              <Input
                disabledClean
                type="tel"
                name="CPF"
                id="CPF"
                label="CPF"
                rules={{
                  required: {
                    value: true,
                    message: 'Documento CPF inválido. Verifique',
                  },
                  minLength: {
                    value: 14,
                    message: 'CPF inválido. Verifique',
                  },
                  maxLength: {
                    value: 14,
                    message: 'CPF inválido. Verifique',
                  },
                  pattern: {
                    value: cpf,
                    message: 'CPF inválido. Verifique',
                  },
                  validate: async (value: string) => {
                    if (!validateCPF(value)){
                      return 'CPF inválido. Verifique';
                    }
                    const formattedCPF = value?.replace(/\D/g, "");

                    if (formattedCPF === user?.cpf) {
                      return 'CPF inválido. Deve ser diferente do CPF do usuário logado.';
                    }
                    return true;
                  }
                }}
                disabled={loadingTransfer}
                mask={CPFMask}
                errorText={methods.formState.errors.CPF && methods.formState.errors.CPF.message as string}
              />
              <Input
                disabledClean
                type="email"
                name="email"
                id="email"
                label="E-mail"
                rules={{
                  required: {
                    value: true,
                    message: 'E-mail inválido. Verifique',
                  },
                  pattern: {
                    value: email,
                    message: 'E-mail inválido. Verifique',
                  },
                }}
                disabled={loadingTransfer}
                errorText={methods.formState.errors.email && methods.formState.errors.email.message as string}
              />
              <div className="md:col-span-2 flex flex-col-reverse md:flex-row md:justify-end gap-8">
                <Button
                  type="button"
                  text="Cancelar"
                  onClick={onHide}
                  variant="outline"
                  className='md:!w-40'
                />
                <Button
                  type="submit"
                  text="Confirmar"
                  variant="medium"
                  disabled={loadingTransfer}
                  loading={loadingTransfer}
                  className='md:max-w-[30%]'
                />
              </div>
            </FormProvider>
          </form>
        </div>
      </div>
    </ContainerModal>
  );
};
