import React from 'react';
import { Button } from '@/components/Form/Button';
import { IconButton } from '@/components/IconButton';
import { Close } from '@/components/icons/Close';
import { theme } from '@/shared';
import { FormProvider, useForm } from 'react-hook-form';
import { useRegister } from '@/shared/hooks/useRegister';
import { FormAddress } from '@/components/FormAddress';
import { ContainerModalEditAddress } from './styles';
import { IModalEditAddress } from './interface';

export const ModalEditAddress: React.FC<IModalEditAddress> = ({ onClose }) => {
  const methods = useForm();
  const { user, handleUpdateUser, isLoadingUpdatedAddress } = useRegister();

  const onSubmit = async (data: any) => {
    if (user) {
      await handleUpdateUser({
        ...user,
        ...data,
      });
      onClose();
    }
  };

  return (
    <ContainerModalEditAddress>
      <div className="header">
        <h6 className="title">Alterar endereço de cobrança</h6>
        <div className="on-close">
          <IconButton onClick={onClose}>
            <Close color={'#8779F8'} width={24} height={24} />
          </IconButton>
        </div>
      </div>
      <div className="content-modal">
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormProvider {...methods}>
            <FormAddress defaultValue={user?.endereco} loading={isLoadingUpdatedAddress} />
            <div className="buttons">
              <Button type="button" text="Cancelar" variant="outline" onClick={onClose} />
              <Button type="submit" text="Confirmar" variant="small" disabled={isLoadingUpdatedAddress} loading={isLoadingUpdatedAddress} />
            </div>
          </FormProvider>
        </form>
      </div>
    </ContainerModalEditAddress>
  );
};
