'use-client';
import React, { useEffect, useRef, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Input } from '@/components/Form/Input';
import { cpf, data, telefone, telefoneWithoutDDD } from '@/shared/config/regex';
import { CPFMask, DATEMaskStart, TELEFONEMask, TelefoneMaskWithoutDDD } from '@/shared/config/mask';
import { useFormContext } from 'react-hook-form';
import { useAuth } from '@/shared/hooks/useAuth';
import { SelectModal } from '@/components/Form/SelectModal';
import { Select } from '@/components/Form/Select';
import { useRegister } from '@/shared/hooks/useRegister';
import { format, isAfter, parseISO } from 'date-fns';
import Link from 'next/link';
import { Radio } from '@/components/Form/Radio/Radio';
import { findFlagUrlByIso2Code } from 'country-flags-svg';
import { validateCPF } from '@/shared/config/validateCPF';

export const StepTwo: React.FC = () => {
  const { watch, setValue, getValues, formState } = useFormContext();
  const { isLoading, countries, loadingCountry, selectCountry } = useAuth();

  useEffect(() => {
    setValue('DD', selectCountry.codigoArea);
  }, [setValue, selectCountry]);

  // useEffect(() => {
  //   if(!haveCpf)
  //     return
  //
  //   setTimeout(() => {
  //     dataNascimentoRef.current?.firstChild?.dispatchEvent(new Event('blur', { bubbles: true }));
  //   }, 3000);

  // }, [haveCpf]);

  const handleChangeCountry = (e: any) => {
    setValue('idPaisContato', +e.target.value);
    //
    // setValue("idPais", +e.target.value);
    // // onSelectCountry(countries?.find((country) => country.id === e.target.value));
    // setValue("DD", countries?.find((country) => country.id === e.target.value)?.codigoArea);
    // setShowNome(true);
  };

  return (
    <div className="flex flex-col gap-2 md:gap-0">
      <Select
        name="idPaisContato"
        id="idPaisContato"
        defaultValue={selectCountry.id}
        disabled={isLoading || loadingCountry}
        loading={false}
        label="País"
        onChange={handleChangeCountry}
        options={
          countries?.map(country => ({
            value: country.id,
            innerText: country.nomePais
          })) ?? []
        }
        rules={{
          required: {
            value: true,
            message: 'País inválido. Verifique'
          }
        }}
      />

      <Input
        disabledClean
        type="email"
        name="email"
        id="email"
        label="Email"
        rules={{
          required: {
            value: true,
            message: 'E-mail inválido. Verifique'
          },
          pattern: {
            value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?)*$/,
            message: 'E-mail inválido. Verifique'
          }
        }}
        disabled={isLoading}
        errorText={formState.errors.email && (formState.errors.email.message as string)}
      />

      <Input
        disabledClean
        type="tel"
        disabled={isLoading}
        name="telefone"
        id="telefone"
        label="Telefone"
        rules={{
          required: {
            value: true,
            message: 'Telefone inválido. Verifique'
          },
          minLength: {
            value: 15,
            message: 'Telefone inválido. Verifique'
          },
          maxLength: {
            value: 15,
            message: 'Telefone inválido. Verifique'
          },
          pattern: {
            value: telefone,
            message: 'Telefone inválido. Verifique'
          }
        }}
        mask={TELEFONEMask}
        errorText={formState.errors.telefone && (formState.errors.telefone.message as string)}
      />
    </div>
  );
};
