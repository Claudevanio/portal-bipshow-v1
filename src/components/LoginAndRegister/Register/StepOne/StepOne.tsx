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
import { ContainerStepOne } from "./styles";
import { format, isAfter, parseISO } from "date-fns";
import Link from "next/link";
import { Radio } from "@/components/Form/Radio/Radio";
import { findFlagUrlByIso2Code } from "country-flags-svg";
import { validateCPF } from "@/shared/config/validateCPF";

export const StepOne: React.FC = () => {
  const { formState, watch, setValue, getValues, setFocus } = useFormContext();
  const {
    isLoading,
    countries,
    onLoadTypeDocument,
    typesDoc,
    loadingCountry,
    onSelectCountry,
    selectCountry,
    handleInfoCpf,
  } = useAuth();

  const { defaultValues } = useRegister();

  const isCountry = watch("idPais");
  const isCpf = watch("CPF");
  const isDataNascimento = watch("dataNascimento")
  const [haveCpf, setHaveCpf] = useState<boolean>(false);
  const [dataInvalida, setDataInvalida] = useState<boolean>(false);
  const [nascimentoCpf, setNascimentoCpf] = useState<string>("");
  const [showNome, setShowNome] = useState<boolean>(false);
  const [ddd, setDDD] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [haveEmail, setHaveEmail] = useState<boolean>(false);

  const isEmail = watch("email");

  const gender = watch("gender")

  const dataNascimentoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
      if (defaultValues?.email) {
          setHaveEmail(true);
          setValue("email", defaultValues?.email);
          setEmail(defaultValues?.email);
      }
  }, []);

  useEffect(() => {
      setValue("DD", selectCountry.codigoArea);
  }, [setValue, selectCountry]);

  useEffect(() => {
      setValue("email", isEmail);
  }, [isEmail]);

  const handleChangeEmail = React.useCallback((e: any) => {
      setValue("email", e.target.value);
      setEmail(getValues("email"));
  }, [email]);

  const getEmail = React.useCallback(() => {
      return email || isEmail;
  }, [email, isEmail]);

  useEffect(() => {
    

    const fetchData = async () => {
      if (isCpf?.length === 14) {
        const { usuario } = await handleInfoCpf(isCpf);
        setShowNome(false);
        setHaveCpf(true);
        setValue("nome", usuario.nome);
        setNascimentoCpf(
          format(parseISO(usuario?.dataNascimento), "dd/MM/yyyy")
        );
          
        
      }
    };

    fetchData();
  }, [isCpf]);

  useEffect(() => {
    if (defaultValues?.CPF) {
      setHaveCpf(true);
      setValue("CPF", defaultValues?.CPF);
      setValue("nome", defaultValues?.nome);
      return;
    }
  }, []);

  // useEffect(() => {
  //   if(!haveCpf)
  //     return
  //   
  //   setTimeout(() => {
  //     dataNascimentoRef.current?.firstChild?.dispatchEvent(new Event('blur', { bubbles: true }));
  //   }, 3000);

  // }, [haveCpf]);


  useEffect(() => {
    if(isDataNascimento?.length < 10){
      setDataInvalida(false)
    }
  }, [isDataNascimento]);

  const wrongDate = (value: string) => {
    const isFormat = value.split("/");
    const isAfterDateNow = isAfter(
      Date.now(),
      new Date(isFormat.reverse().join("-"))
    );
    let sameDate = value === defaultValues?.dataNascimentoCpf;

    if(!sameDate) {
      setDataInvalida(true)
    } else {
      setDataInvalida(false)
    }

    if (nascimentoCpf != "") {
      sameDate = value === nascimentoCpf;
    }

    if (!defaultValues?.dataNascimentoCpf && nascimentoCpf == "") {
      sameDate = true;
    }

    return isAfterDateNow && sameDate;
  };

  const [cpfInputRef, setCpfInputRef] = useState<HTMLInputElement | null>(null);

  const handleChangeCountry = (e: any) => {
    setValue("idPais", +e.target.value);
    // 
    // setValue("idPais", +e.target.value);
    // // onSelectCountry(countries?.find((country) => country.id === e.target.value));
    // setValue("DD", countries?.find((country) => country.id === e.target.value)?.codigoArea);
    // setShowNome(true);
   };

  useEffect(() => {
    if (isCountry) {
      
      onLoadTypeDocument(isCountry);
      const isFindCountry = countries?.find(
        (country) => country.id === isCountry
      );

      setValue("DD", isFindCountry?.codigoArea);

      if (isFindCountry) {
        onSelectCountry(isFindCountry);

        if (isFindCountry?.codigoIso === "BR") {
          setShowNome(false);
        } else {
          setShowNome(true);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCountry]);

  

  return (
    <ContainerStepOne>

      
          <Select
              name="idPais"
              id='idPais'
              defaultValue={selectCountry.id}
              disabled={haveCpf}
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
      
      <div className="email-input-body">
          <Input
              disabledClean
              type="email"
              name="email"
              id="email"
              label="Email"
              rules={{
                  required: {
                      value: true,
                      message: "E-mail inválido. Verifique",
                  },
                  pattern: {
                      value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?)*$/,
                      message: "E-mail inválido. Verifique",
                  },
              }}
              onChange={handleChangeEmail}
              disabled={isLoading}
              errorText={
                  formState.errors.email &&
                  (formState.errors.email.message as string)
              }
          />
          {/* {haveEmail && (
              <Link href="/login"
              legacyBehavior>
                  <a className="letter">
                      <p>Trocar E-MAIL</p>
                  </a>
              </Link>
          )} */}
      </div>
      {!typesDoc && (
        <Input
          disabledClean
          type="tel"
          name="CPF"
          id="CPF"
          label="CPF"
          rules={{
            required: {
              value: true,
              message: "Documento CPF inválido. Verifique",
            },
            minLength: {
              value: 14,
              message: "CPF inválido. Verifique",
            },
            maxLength: {
              value: 14,
              message: "CPF inválido. Verifique",
            },
            pattern: {
              value: cpf,
              message: "CPF inválido. Verifique",
            },
            validate: (value: string) => {
              if (!validateCPF(value)){
                return 'CPF inválido. Verifique';
              }
              return true;
            }
          }}
          disabled={true}
          mask={CPFMask}
          errorText={
            formState.errors.CPF && (formState.errors.CPF.message as string)
          }
          defaultValue={defaultValues?.CPF ?? ""}
        />
      )}
      {typesDoc &&
        typesDoc.length <= 1 &&
        typesDoc.find((typeDoc) => typeDoc.nomeTipoDocumento === "CPF") && (
          <div className="cpf-body">
            <Input
              disabledClean
              type="tel"
              name="CPF"
              id="CPF"
              label="CPF"
              rules={{
                required: {
                  value: true,
                  message: `Documento ${typesDoc[0].nomeTipoDocumento} inválido. Verifique`,
                },
                minLength: {
                  value: typesDoc[0].nomeTipoDocumento === "CPF" ? 14 : 1,
                  message: `${typesDoc[0].nomeTipoDocumento} inválido. Verifique'`,
                },
                maxLength: {
                  value: typesDoc[0].nomeTipoDocumento === "CPF" ? 14 : 28,
                  message: `${typesDoc[0].nomeTipoDocumento} inválido. Verifique'`,
                },
                pattern: {
                  value:
                    typesDoc[0].nomeTipoDocumento === "CPF"
                      ? cpf
                      : /[a-zA-Z0-9]/,
                  message: `${typesDoc[0].nomeTipoDocumento} inválido. Verifique'`,
                },
                validate: (value: string) => {
                  if (!validateCPF(value)){
                    return 'CPF inválido. Verifique';
                  }
                  return true;
                }
              }}
              style={{
                pointerEvents: (isLoading || haveCpf) ? 'none' : 'auto',
                opacity: (isLoading || haveCpf) ? 0.5 : 1,
              }}
              pseudoDisabled={isLoading || haveCpf}
              disabled={false}
              mask={CPFMask}
              errorText={
                formState.errors.CPF && (formState.errors.CPF.message as string)
              }
              defaultValue={defaultValues?.CPF ?? ""}
            />

            {haveCpf && (
              // <Link href="/login"
              // legacyBehavior>
              //   <a className="letter">
              //     <p>Trocar CPF</p>
              //   </a>
              // </Link>
              <div className="letter"
              onClick={() => {
                setValue("CPF", "");
                setHaveCpf(false);
                setValue("nome", "");
                setNascimentoCpf("");
              }}
              >
                <p
                  className='text-xs cursor-pointer text-center'
                >Trocar CPF</p>
              </div>
            )}
          </div>
        )}
      {typesDoc && typesDoc.length > 1 && (
        <React.Fragment>
          <Select
            name="idTipoDocumento"
            id="idTipoDocumento"
            label="Documento"
            loading={loadingCountry}
            disabled={isLoading || loadingCountry}
            options={typesDoc.map((typeDoc) => ({
              innerText: typeDoc.nomeTipoDocumento,
              value: typeDoc.id,
            }))}
          />
          <Input
            disabledClean
            disabled={isLoading || loadingCountry}
            id="numeroDoc"
            label="Nº do documento"
            name="numeroDoc"
            type="text"
            rules={{
              required: {
                value: true,
                message: "Nº do documento inválido. Verifique",
              },
            }}
            errorText={
              formState.errors.numeroDoc &&
              (formState.errors.numeroDoc.message as string)
            }
          />
        </React.Fragment>
      )}
      {showNome && (
        <Input
          disabledClean
          type="text"
          name="nome"
          id="nome"
          label="Nome completo"
          rules={{
            required: {
              value: true,
              message: "Nome inválido. Verifique",
            },
          }}
          disabled={isLoading || loadingCountry || haveCpf}
          errorText={
            formState.errors.nome && (formState.errors.nome.message as string)
          }
        />
      )}
      <div
        className='w-full h-fit'
        ref={dataNascimentoRef}
      >
        <Input
          type="tel"
          name="dataNascimento"
          id="dataNascimento"
          label="Data de nascimento"
          rules={{
            max: {
              value: 10,
              message: "Data de nascimento inválida. Verifique",
            },
            min: {
              value: 10,
              message: "Data de nascimento inválida. Verifique",
            },
            minLength: {
              value: 10,
              message: "Data de nascimento inválida. Verifique",
            },
            required: {
              value: true,
              message: "Data de nascimento inválida. Verifique",
            },
            validate: wrongDate,
            pattern: data,
          }}
          mask={DATEMaskStart}
          disabled={isLoading}
          errorText={
            formState.errors.dataNascimento && (
            dataInvalida ? ("Data não confere com o cpf informado." as string) : 
            ("Data de nascimento inválida. Verifique" as string))
          }
          disabledClean
        />
      </div>

      
      <div className="phone">
                        <Input
                            disabledClean
                            type="tel"
                            name="DDD"
                            id="DDD"
                            maxLength={2}
                            label="DDD"
                            rules={{
                                required: {
                                    value: true,
                                    message: "DDD inválido",
                                },
                                pattern: {
                                    value: /[0-9]/,
                                    message: "DDD inválido",
                                },
                                minLength: {
                                    value: 2,
                                    message: "DDD inválido",
                                },
                            }}
                            disabled={isLoading}
                            errorText={
                                formState.errors.DDD &&
                                (formState.errors.DDD.message as string)
                            }
                        />
                        {selectCountry.nomePais === "Brasil" ? (
                            <Input
                                disabledClean
                                type="tel"
                                name="telefone"
                                id="telefone"
                                label="Celular"
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Telefone inválido. Verifique",
                                    },
                                    minLength: {
                                        value: 10,
                                        message: "Telefone inválido. Verifique",
                                    },
                                    maxLength: {
                                        value: 10,
                                        message: "Telefone inválido. Verifique",
                                    },
                                    pattern: {
                                        value: telefoneWithoutDDD,
                                        message: "Telefone inválido. Verifique",
                                    },
                                }}
                                max={10}
                                maxLength={10}
                                disabled={isLoading}
                                mask={TelefoneMaskWithoutDDD}
                                errorText={
                                    formState.errors.telefone &&
                                    (formState.errors.telefone
                                        .message as string)
                                }
                            />
                        ) : (
                            <Input
                                disabledClean
                                type="tel"
                                name="telefone"
                                id="telefone"
                                label="CELULAR"
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Telefone inválido. Verifique",
                                    },
                                    pattern: {
                                        value: /[0-9]/,
                                        message: "Telefone inválido. Verifique",
                                    },
                                }}
                                disabled={isLoading}
                                // errorText={
                                //     formState.errors.telefone &&
                                //     (formState.errors.telefone
                                //         .message as string)
                                // }
                            />
                        )}
                    </div>

      <div
        className='bg-[#8779F80A] px-4 py-2 flex flex-col gap-3'
      >
        <p className="text-primary">
          Gênero
        </p>
        <div
          className='flex flex-col'
        >
          <Radio id="gender" name="gender" label="Masculino" value="0"
          />
          <Radio id="gender" label="Feminino" name="gender" value="1" />
          <Radio id="gender" label="Não informar" name="gender" value="2" />
        </div>
      </div>
    </ContainerStepOne>
  );
};
