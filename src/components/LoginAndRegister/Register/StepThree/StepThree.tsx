import React, { useCallback, useEffect, useState } from 'react';
import { Input } from '@/components/Form/Input';
import { useFormContext } from 'react-hook-form';
import { CEPMask } from '@/shared/config/mask';
import { Select } from '@/components/Form/Select';
import { api, GET_STATES, GET_CITYS, VIACEP } from '@/services';
import { IState, ISelect } from '@/types';
import axios from 'axios';
import { states } from '@/shared/config/states';
import { useAuth } from '@/shared/hooks/useAuth';
import { ContainerStepThree } from './styles';
import { TypeEnum, useError } from '@/shared/hooks/useDialog';

export const StepThree: React.FC = () => {
  const { formState, getValues, setValue, watch } = useFormContext();
  const [isStates, setIsStates] = useState<ISelect[]>();
  const [isLoadingState, setIsLoadingState] = useState<boolean>(false);
  const [isCitys, setIsCitys] = useState<ISelect[]>();
  const [isLoadingCity, setIsLoadingCity] = useState<boolean>(true);
  const [isCity, setIsCity] = useState<{
    id: number | undefined;
    nome: string | undefined;
  }>();
  const { isLoading } = useAuth();
  const { showErrorDialog } = useError();
  const callErrorDialogComponent = (message: string, type: string) => {
    showErrorDialog(message, type ?? TypeEnum.INFO);
  };

  const handleLoadCitys = useCallback(
    async (id: number) => {
      try {
        setIsLoadingCity(true);
        const { data } = (await api.get(`${GET_CITYS}/${id}/cidades`)) as { data: IState[] };

        if (data.length > 0) {
          setIsCitys(
            data.map(state => {
              return {
                value: state.valor,
                innerText: state.descricao
              };
            }) as ISelect[]
          );
          setIsLoadingCity(false);
          return data.map(state => {
            return {
              value: state.valor,
              innerText: state.descricao
            };
          });
        }
        setIsLoadingCity(false);
      } catch (err) {
        setIsLoadingCity(false);
        callErrorDialogComponent('As cidades não foram encontrados.', TypeEnum.INFO);
      }
    },
    [showErrorDialog]
  );

  const handleLoadStates = useCallback(async () => {
    try {
      setIsLoadingState(true);
      const { data } = (await api.get(GET_STATES)) as { data: IState[] };

      if (data.length > 0) {
        setIsStates(
          data.map(state => {
            return {
              value: state.valor,
              innerText: state.descricao
            };
          }) as ISelect[]
        );
      }
      setIsLoadingState(false);
    } catch (err) {
      setIsLoadingState(false);
      callErrorDialogComponent('Os estados não foram encontrados.', TypeEnum.INFO);
    }
  }, [showErrorDialog]);

  const handleLoadCEP = useCallback(
    async (cep: string) => {
      const result = await axios.get(`${VIACEP}/${cep}/json`);

      if (result.data && isStates && isCitys) {
        if (result.data.logradouro) setValue('endereco.logradouro', result.data.logradouro);
        if (result.data.complemento) setValue('endereco.complemento', result.data.complemento);
        if (result.data.bairro) setValue('endereco.bairro', result.data.bairro);
        setValue(
          'endereco.estado',
          isStates?.find(item => item.innerText === states.find(state => state.uf === result.data.uf)?.estado)?.value || isStates[0].value
        );
        const citys = await handleLoadCitys(
          Number(isStates?.find(item => item.innerText === states.find(state => state.uf === result.data.uf)?.estado)?.value || 0)
        );
        if (citys) {
          setIsCity({
            id: citys.find(city => city.innerText === result.data.localidade)?.value || citys[0].value,
            nome: citys.find(city => city.innerText === result.data.localidade)?.innerText || citys[0].innerText
          });
        }
      }
    },
    [isStates, setValue, isCitys, handleLoadCitys]
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
    handleLoadStates();
  }, [handleLoadStates]);

  useEffect(() => {
    if (isStates && isStates?.length > 0) {
      handleLoadCitys(getValues('endereco.estado') || 1);
    }
  }, [isStates, getValues, handleLoadCitys]);

  useEffect(() => {
    if (isCity) {
      setValue('endereco.cidade.id', isCity.id);
      setValue('endereco.cidade.nome', isCity.nome);
    }
  }, [isCity, setValue]);

  useEffect(() => {
    if (getValues('endereco.cidade.id') && getValues('endereco.cidade.id')) {
      setValue('endereco.cidade.id', getValues('endereco.cidade.id'));
      setValue('endereco.cidade.nome', getValues('endereco.cidade.id'));
    }
  }, [getValues, setValue]);

  return (
    <ContainerStepThree>
      <Input
        disabledClean
        type="tel"
        name="endereco.cep"
        id="endereco.cep"
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
        disabled={isLoading}
        errorText={
          formState.errors.endereco && (formState.errors.endereco as { cep: any }).cep && (formState.errors.endereco as { cep: any }).cep.message
        }
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
        disabled={isLoading}
        errorText={
          formState.errors.endereco &&
          (formState.errors.endereco as { logradouro: any }).logradouro &&
          (formState.errors.endereco as { logradouro: any }).logradouro.message
        }
      />
      <div className="complement-number">
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
          disabled={isLoading}
        />
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
          disabled={isLoading}
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
        disabled={isLoading}
        errorText={
          formState.errors.endereco &&
          (formState.errors.endereco as { bairro: any }).bairro &&
          (formState.errors.endereco as { bairro: any }).bairro.message
        }
      />
      <div className="state-city">
        <Select
          name="endereco.estado"
          id="endereco.estado"
          loading={isLoadingState}
          disabled={isLoadingState}
          label="Estado"
          options={isStates || [{ innerText: 'Vazio', value: 0 }]}
          rules={{
            required: {
              value: true,
              message: 'Estado inválido. Verifique'
            }
          }}
          onChange={event => {
            handleLoadCitys(Number(event.target.value));
            setValue('endereco.estado', event.target.value);
          }}
        />
        <Select
          loading={isLoadingCity}
          name="endereco.cidade.id"
          id="endereco.cidade.id"
          disabled={isLoadingState}
          label="Cidade"
          options={isCitys || [{ innerText: 'Vazio', value: 0 }]}
          onChange={event => {
            setValue('endereco.cidade.id', event.target.value);
            setValue('endereco.cidade.nome', isCitys?.find(item => item.value === Number(event.target.value))?.innerText);
          }}
          rules={{
            required: {
              value: true,
              message: 'Cidade inválido. Verifique'
            }
          }}
        />
      </div>
    </ContainerStepThree>
  );
};
