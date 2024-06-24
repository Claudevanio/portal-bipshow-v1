import React, { useCallback, useEffect } from 'react';
import { Input } from '@/components/Form/Input';
import { Controller, useFormContext } from 'react-hook-form';
import { CEPMask } from '@/shared/config/mask';
import { VIACEP } from '@/services';
import axios from 'axios';
import { states } from '@/shared/config/states';
import { ContainerFormAddress } from './styles';
import { FormAdressProps } from './interface';
import { Select } from '../Form/Select';
import { useAuth } from '@/shared/hooks/useAuth';

export const FormAddress: React.FC<FormAdressProps> = ({ defaultValue, variant = 'normal', loading }) => {
  const { formState, getValues, setValue, control, watch } = useFormContext();

  const { countries, onSelectCountry } = useAuth();

  const handleLoadCEP = useCallback(
    async (cep: string) => {
      const result = await axios.get(`${VIACEP}/${cep}/json`);

      if (!result.data?.erro) {
        setValue('endereco.logradouro', result.data.logradouro === '' ? defaultValue?.logradouro : result.data.logradouro);
        setValue('endereco.complemento', result.data.complemento === '' ? defaultValue?.complemento : result.data.complemento);
        setValue('endereco.bairro', result.data.bairro === '' ? defaultValue?.bairro : result.data.bairro);
        const isStates = states.find(i => i.uf === result.data.uf);
        setValue('endereco.estado', isStates ? isStates.estado : result.data.uf);
        setValue('endereco.nomeCidade', result.data.localidade);
        setValue('endereco.codigoIbge', result.data.ibge);
      } else {
        setValue('endereco.logradouro', '');
        setValue('endereco.complemento', '');
        setValue('endereco.bairro', '');
        setValue('endereco.estado', '');
        setValue('endereco.nomeCidade', '');
        setValue('endereco.codigoIbge', '');
      }
    },
    [setValue, defaultValue]
  );

  const handleChangeCEP = useCallback(
    (cep: string) => {
      if (cep.length >= 8) {
        handleLoadCEP(CEPMask(cep));
      }

      setValue('endereco.cep', CEPMask(cep));
    },
    [setValue, handleLoadCEP]
  );

  useEffect(() => {
    if (getValues('endereco.cidade.id') && getValues('endereco.cidade.id')) {
      setValue('endereco.cidade.id', getValues('endereco.cidade.id'));
      setValue('endereco.cidade.nome', getValues('endereco.cidade.id'));
    }
  }, [getValues, setValue]);

  return (
    <ContainerFormAddress variant={variant}>
      <Input
        type="tel"
        name="endereco.cep"
        id="endereco.cep"
        disabledClean
        label="CEP"
        rules={{
          required: {
            value: true,
            message: 'CEP inválido. Verifique'
          },
          minLength: {
            value: 9,
            message: 'CEP inválido. Verifique'
          },
          maxLength: {
            value: 9,
            message: 'CEP inválido. Verifique'
          },
          max: {
            value: 9,
            message: 'CEP inválido. Verifique'
          },
          min: {
            value: 9,
            message: 'CEP inválido. Verifique'
          }
        }}
        mask={CEPMask}
        onChange={e => {
          handleChangeCEP(e.target.value);
        }}
        onBlur={() => {
          if (getValues('endereco.cep')) {
            handleChangeCEP(CEPMask(getValues('endereco.cep')));
          }
        }}
        disabled={loading}
        errorText={
          formState.errors.endereco && (formState.errors.endereco as { cep: any }).cep && (formState.errors.endereco as { cep: any }).cep.message
        }
        defaultValue={defaultValue?.cep ? CEPMask(defaultValue?.cep) : undefined}
      />
      <Input
        disabledClean
        type="text"
        name="endereco.logradouro"
        id="endereco.logradouro"
        label="Logradouro"
        rules={{
          required: {
            value: true,
            message: 'Logradouro inválido. Verifique'
          }
        }}
        disabled={loading}
        errorText={
          formState.errors.endereco &&
          (formState.errors.endereco as { logradouro: any }).logradouro &&
          (formState.errors.endereco as { logradouro: any }).logradouro.message
        }
        defaultValue={defaultValue?.logradouro}
      />
      <div className="complement-number">
        <Input
          type="number"
          name="endereco.numero"
          id="endereco.numero"
          label="Nº"
          disabledClean
          rules={{
            required: {
              value: false,
              message: 'Número inválido. Verifique'
            }
          }}
          disabled={loading}
          defaultValue={defaultValue?.numero !== 'S/N' ? defaultValue?.numero : undefined}
        />
        <Input
          disabledClean
          type="text"
          name="endereco.complemento"
          id="endereco.complemento"
          label="Complemento"
          rules={{
            required: {
              value: false,
              message: 'Complemento inválido. Verifique'
            }
          }}
          disabled={loading}
          defaultValue={defaultValue?.complemento}
        />
      </div>
      <Input
        disabledClean
        type="text"
        name="endereco.bairro"
        id="endereco.bairro"
        label="Bairro"
        rules={{
          required: {
            value: true,
            message: 'Bairro inválido. Verifique'
          }
        }}
        disabled={loading}
        errorText={
          formState.errors.endereco &&
          (formState.errors.endereco as { bairro: any }).bairro &&
          (formState.errors.endereco as { bairro: any }).bairro.message
        }
        defaultValue={defaultValue?.bairro}
      />
      <div className="state-city">
        <Input
          disabledClean
          type="text"
          name="endereco.nomeCidade"
          id="endereco.nomeCidade"
          defaultValue={defaultValue?.nomeCidade}
          label="Cidade"
          rules={{
            required: {
              value: true,
              message: 'Cidade inválida. Verifique'
            }
          }}
          disabled={loading}
          errorText={
            formState.errors.endereco &&
            (formState.errors.endereco as { nomeCidade: any }).nomeCidade &&
            (formState.errors.endereco as { nomeCidade: any }).nomeCidade.message
          }
        />
        <Input
          disabledClean
          type="text"
          name="endereco.estado"
          id="endereco.estado"
          defaultValue={
            defaultValue?.localidade
              ? states.find(state => state.uf === defaultValue?.localidade?.split('/')[1])?.estado ?? defaultValue?.localidade.split('/')[1]
              : undefined
          }
          label="Estado"
          rules={{
            required: {
              value: true,
              message: 'Estado inválido. Verifique'
            }
          }}
          disabled={loading}
          errorText={
            formState.errors.endereco &&
            (formState.errors.endereco as { estado: any }).estado &&
            (formState.errors.endereco as { estado: any }).estado.message
          }
        />
      </div>
      <Controller
        name="endereco.codigoIbge"
        control={control}
        defaultValue={defaultValue?.codigoIbge}
        render={({ field: { name, onChange, value } }) => <input value={value} onChange={onChange} name={name} hidden />}
      />
    </ContainerFormAddress>
  );
};
