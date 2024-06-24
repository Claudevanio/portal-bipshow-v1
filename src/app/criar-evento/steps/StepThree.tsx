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
import { GradientBorder } from '@/components';
import { Checkbox } from '@mui/material';

const necessities = [
  {
    id: 0,
    img: '/criar-evento-ticket.svg',
    title: 'Ingressos',
    description: 'Atraia mais participantes com inscrições por categorias e lotes de uma forma rápida e segura.'
  },
  {
    id: 1,
    img: '/criar-evento-credenciamento.svg',
    title: 'Credenciamento',
    description:
      'Nada de filas. Garanta a entrada mais rápida dos participantes com ingresso por reconhecimento facial, sem fraudes ou venda por terceiros não autorizados (cambismo).'
  },
  {
    id: 2,
    img: '/criar-evento-programacao.svg',
    title: 'Programação',
    description: 'Cadastre diversas atividades. Organize valores, horários e palestrantes em poucos passos.'
  }
];

export const StepThree: React.FC = () => {
  const { watch, setValue, getValues } = useFormContext();

  const necessidadesEvento = watch('necessidadesEvento');

  function handleNecessities(title: string) {
    if (!necessidadesEvento) return;

    const newNecessities = necessidadesEvento.includes(title)
      ? necessidadesEvento.filter((necessity: string) => necessity !== title)
      : [...necessidadesEvento, title];
    setValue('necessidadesEvento', newNecessities);
  }

  // useEffect(() => {
  //   if(!haveCpf)
  //     return
  //
  //   setTimeout(() => {
  //     dataNascimentoRef.current?.firstChild?.dispatchEvent(new Event('blur', { bubbles: true }));
  //   }, 3000);

  // }, [haveCpf]);

  return (
    <div className="flex flex-col gap-4">
      {necessities.map(necessity => (
        <GradientBorder
          innerStyle={{
            padding: '1px'
          }}
          borderStyle={{
            padding: necessidadesEvento && necessidadesEvento.includes(necessity.title) ? '1px' : '0px'
          }}
        >
          <div key={necessity.id} className="flex gap-4 p-4 items-center justify-between text-black min-h-[7rem] ">
            <div className="min-w-[4rem]">
              <img src={necessity.img} alt={necessity.title} className="w-12 h-12" />
            </div>
            <div>
              <h6 className="font-bold">{necessity.title}</h6>
              <p>{necessity.description}</p>
            </div>
            <div className="flex items-start h-full  self-start">
              <Checkbox
                value={necessity.id}
                checked={necessidadesEvento && necessidadesEvento.includes(necessity.title)}
                onChange={() => handleNecessities(necessity.title)}
              />
            </div>
          </div>
        </GradientBorder>
      ))}
    </div>
  );
};
