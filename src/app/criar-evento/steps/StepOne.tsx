'use-client';
import React, { useEffect, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Input } from "@/components/Form/Input";
import { cpf, data, telefone, telefoneWithoutDDD } from "@/shared/config/regex";
import { CPFMask, DATEMaskStart, TELEFONEMask, TelefoneMaskWithoutDDD } from "@/shared/config/mask";
import { useFormContext } from "react-hook-form";
import { useAuth } from "@/shared/hooks/useAuth";
import { SelectModal } from "@/components/Form/SelectModal";
import { Select } from "@/components/Form/Select";
import { useRegister } from "@/shared/hooks/useRegister"; 
import { format, isAfter, parseISO } from "date-fns";
import Link from "next/link";
import { Radio } from "@/components/Form/Radio/Radio";
import { findFlagUrlByIso2Code } from "country-flags-svg";
import { validateCPF } from "@/shared/config/validateCPF";
import {tipos, categories} from '@/utils'

export const StepOne: React.FC = () => {
  const { watch, setValue, getValues, setFocus } = useFormContext();
  const {
    isLoading,
    countries, 
    loadingCountry, 
    selectCountry, 
  } = useAuth(); 
 
  

  useEffect(() => {
      setValue("DD", selectCountry.codigoArea);
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
    setValue("idPais", +e.target.value);
    // 
    // setValue("idPais", +e.target.value);
    // // onSelectCountry(countries?.find((country) => country.id === e.target.value));
    // setValue("DD", countries?.find((country) => country.id === e.target.value)?.codigoArea);
    // setShowNome(true);
   };
 
  

  return (
    <div
      className='flex flex-col gap-2 md:gap-0'
    >

      
          <Select
              name="idPais"
              id='idPais'
              defaultValue={selectCountry.id} 
              disabled={isLoading || loadingCountry}
              loading={false}
              label="País"
              onChange={handleChangeCountry}
              options={
                countries?.map((country) => ({
                  value: country.id,
                  innerText: country.nomePais,
                })) ?? []
              }
              rules={{
                required: {
                  value: true,
                  message: 'País inválido. Verifique',
                },
              }}
      />
      
      {/* <SelectModal
        name="idPais"
        id="idPais"
        label="País"
        disabled={isLoading || loadingCountry || haveCpf}
        options={
          countries?.map((country) => ({
            innerText: (
              <>
                <img
                  style={{ width: "32px", height: "16px", marginRight: "4px" }}
                  src={findFlagUrlByIso2Code(country.codigoIso)}
                  alt={country.codigoIso}
                />
                {country.nomePais}
              </>
            ),
            value: country.id,
          })) || [
            {
              innerText: (
                <>
                  <img
                    style={{
                      width: "24px",
                      height: "16px",
                      marginRight: "4px",
                    }}
                    src={findFlagUrlByIso2Code("BR")}
                    alt={"BR"}
                  />
                  Brasil
                </>
              ),
              value: 0,
            },
          ]
        }
        loading={loadingCountry}
        titleModal="Selecione o país"
        onChange={handleChangeCountry}
        defaultOption={{
          innerText: (
            <>
              <img
                style={{ width: "32px", height: "16px", marginRight: "4px" }}
                src={findFlagUrlByIso2Code(selectCountry.codigoIso)}
                alt={selectCountry.codigoIso}
              />
              {selectCountry.nomePais}
            </>
          ),
          value: selectCountry.id,
        }}
      /> */}
             
      <div>
        <Select
          name="participantesExpectativa"
          id="participantesExpectativa"
          label="Quantidade de participantes"
          disabled={isLoading}
          loading={false}
          options={[
            { value: 0, innerText: "Até 50" },
            { value: 1, innerText: "Até 100" },
            { value: 2, innerText: "Até 500" },
            { value: 3, innerText: "Até 1000" },
            { value: 4, innerText: "Acima de 1000" },
          ]}
          rules={{
            required: {
              value: true,
              message: "Quantidade de participantes inválida. Verifique",
            },
          }}
        />
      </div>
      <div>
        <Input
          name="nomeEvento"
          id="nomeEvento"
          label="Nome do evento"
          disabledClean
          disabled={isLoading}
          type='text'
          rules={{
            required: {
              value: true,
              message: "Nome do evento inválido. Verifique",
            },
          }}
        />
      </div> 
      <div
        className='flex gap-1 md:gap-4 flex-col md:flex-row'
      >
        <Select
          name="tipoEvento"
          id="tipoEvento"
          label="Tipo de evento"
          disabled={isLoading}
          loading={false}
          options={
            tipos.map((tipo) => ({
              value: tipo.id,
              innerText: tipo.name,
            }))
          }
          rules={{
            required: {
              value: true,
              message: "Tipo de evento inválido. Verifique",
            },
          }}
        /> 
        <Select
          name="idCategoria"
          id="idCategoria"
          label="Categoria"
          disabled={isLoading}
          loading={false}
          options={
            categories?.map((category) => ({
              value: category.id,
              innerText: category.name,
            })) ?? []
          }
          rules={{
            required: {
              value: true,
              message: "Categoria inválida. Verifique",
            },
          }}
        />
      </div>

      <div
        className='px-4 py-2 flex flex-col'
      >
        <p className="text-primary text-xs">
          Seu evento é:
        </p>
        <div
          className='flex gap-3 items-center'
        >
          <Radio id="eventoOnline" name="eventoOnline" label="Online" value="0"
          />
          <Radio id="eventoOnline" label="Presencial" name="eventoOnline" value="1" />
          <Radio id="eventoOnline" label="Híbrido" name="eventoOnline" value="2" />
        </div>
      </div>
    </div>
  );
};
