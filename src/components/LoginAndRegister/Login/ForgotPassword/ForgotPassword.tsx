import React, { useEffect, useState } from "react";
import { useAuth } from "@/shared/hooks/useAuth";
import { ContainerForgotPassword } from "./styles";
import { useFormContext } from "react-hook-form";
import { CPFMask, DATEMaskStart } from "@/shared/config/mask";
import { InputCode } from "@/components/Form/Input-code";
import { ButtonBack } from "@/components/ButtonBack";
import { cpf, data } from "@/shared/config/regex";
import { Button } from "@/components/Form/Button";
import { Input } from "@/components/Form/Input";
import { format, isAfter, parseISO } from "date-fns";
import { useRegister } from "@/shared/hooks/useRegister";
import { theme } from "@/shared";
import { useRouter } from 'next/navigation';
import { validateCPF } from "@/shared/config/validateCPF";
import { ArrowRightOutlined, CheckCircle, SmartphoneOutlined } from '@mui/icons-material';
import { CheckPassword } from '@/components/icons/CheckPassword';

export const ForgotPassowrd: React.FC = () => {
  const {
    dataForgotPassword,
    handleValidationPhone,
    handleValidationEmail,
    setIsStepper,
    isStepper,
    handleInfoCpf,
    setIsForgotPassword,
    handleForgotPassword,
    handleSendEmailForgotPassword,
    handleUpdateEmail,
    checkEmailExistente,
  } = useAuth();

  const { watch, formState, setValue, getValues } = useFormContext();

  const methods = useFormContext();
  const [validPhoneOrEmail, setValidPhoneOrEmail] = useState<boolean>(false);
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [dispositivoCheckado, setDispositivoCheckado] =
    useState<boolean>(false);
  const [dataInvalida, setDataInvalida] = useState<boolean>(true);
  const [insideStepper, setInsideStepper] = useState<number>(0);
  const [cpf, setCpf] = useState<String>("");
  const [nascimentoCpf, setNascimentoCpf] = useState<string>("");
  const { defaultValues } = useRegister();
  const isDataNascimento = watch("dataNascimento")
  const { push } = useRouter();

  const isCpf = watch("emailOrCpf");

  const handleClickBack = () => {
    if (insideStepper == 0) {
      setIsStepper(isStepper - 1);
      setIsForgotPassword(false);
    } else if(insideStepper == 2) {
      setInsideStepper(insideStepper - 2);
    } else {
      setInsideStepper(insideStepper - 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isCpf?.length === 14) {
        const { usuario } = await handleInfoCpf(isCpf);
        setNascimentoCpf(
          format(parseISO(usuario?.dataNascimento), "dd/MM/yyyy")
        );
      }
    };

    fetchData();
  }, [isCpf]);


  const handleGetEmail = () =>{
    if(dataForgotPassword?.email) {
      return dataForgotPassword?.email;
    }

    return getValues("email")
  }

  const handleChangeEmail = React.useCallback((e: any) => {
    setValue("email", e.target.value);
  }, []);

  const handleChoose = React.useCallback((data: boolean) => {
   
    setIsEmail(data);

    setInsideStepper(2);
  }, []);

  useEffect(() => {
    if(isDataNascimento?.length < 10){
      setDataInvalida(false)
    }
  }, [isDataNascimento]);

  const handleClick = React.useCallback(async () => {
    if (insideStepper == 0) {
      const  data : any = await handleForgotPassword(isCpf);
      setCpf(isCpf);

      if(dataForgotPassword?.email || data?.usuario?.email) {
        setIsEmail(true);
      } else {
        if(!data?.usuario?.telefone) {
          push("/register");
          return;
        }
        setIsEmail(false);
      }
      setInsideStepper(2);
      return;
    }

    if (isEmail) {
      if(!dataForgotPassword?.email) {
        await handleUpdateEmail(
          getValues("email"),
          dataForgotPassword?.uzerId || 0
        );
      }
      handleSendEmailForgotPassword(
        dataForgotPassword?.token || "",
        dataForgotPassword?.email || getValues("email") || "  ",
      );

      setInsideStepper(3);
      return;
    }


    if (dispositivoCheckado && !dataForgotPassword?.email) {
      const existe = await checkEmailExistente(getValues("email"));

      if(existe) {
        return;
      }

      setIsEmail(true);
      setDispositivoCheckado(false);
      setInsideStepper(2);
      return;
    }

    if(dispositivoCheckado && dataForgotPassword?.email) {
      handleSendEmailForgotPassword(
        dataForgotPassword?.token || "",
        dataForgotPassword.email
      );

      setInsideStepper(3);
    }

    setDispositivoCheckado(true);
  }, [insideStepper, isCpf, dispositivoCheckado, setIsEmail, dataForgotPassword, setDispositivoCheckado]);

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

  return (
    <ContainerForgotPassword>
      <div>
        {insideStepper == 0 && (
          <div>
            <h6 className="title">Recuperar senha</h6>
            <div className="input-cpf">
              <Input
                type="tel"
                name="emailOrCpf"
                id="emailOrCpf"
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
                    value: cpf as any,
                    message: "CPF inválido. Verifique",
                  },
                  validate: (value: string) => {
                    if (!validateCPF(value)){
                      return 'CPF inválido. Verifique';
                    }
                    return true;
                  }
                }}                
                mask={CPFMask}
                disabled={true}
                errorText={
                  methods.formState.errors.cpf &&
                  (methods.formState.errors.cpf.message as string)
                }
              />
            </div>
            <div className="input-data">
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
                }}
                mask={DATEMaskStart}
                errorText={
                  formState.errors.dataNascimento && (
                  dataInvalida ? ("Data não confere com o cpf." as string) : 
                  ("Data de nascimento inválida. Verifique" as string))
                }
                disabled={false}
              />
            </div>
          </div>
        )}
        {insideStepper == 1 && (
          <div>
            <h6 className="title">Redefinição de senha</h6>
            <p className="text-input">
              Escolha um dos canais abaixo para receber um codigo de validação e
              prosseguir com a troca da sua senha no Aplicativo SynPass
            </p>
            <div className="body-box">
              {dataForgotPassword?.telefone && (
                <div className="box" onClick={() => handleChoose(false)}>
                  <div>
                    {<SmartphoneOutlined className="icon" width={24} height={24} />}
                  </div>
                  <div className="box-text">
                    <div className="telefone-title">Com seu telefone</div>
                    <div className="telefone">
                      {dataForgotPassword?.telefone}
                    </div>
                  </div>
                  <div>
                    <ArrowRightOutlined
                      className="icon"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
              )}
              <div className="body-box">
                {dataForgotPassword?.email && (
                  <div className="box" onClick={() => handleChoose(true)}>
                    <div>
                      {<SmartphoneOutlined className="icon" width={24} height={24} />}
                    </div>
                    <div className="box-text">
                      <div className="telefone-title">Com seu email</div>
                      <div className="telefone">
                        {dataForgotPassword?.email}
                      </div>
                    </div>
                    <div>
                      <ArrowRightOutlined
                        className="icon"
                        width={24}
                        height={24}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {insideStepper == 2 && (
          <div>
            {!dispositivoCheckado && (
              <h6 className="title">Validação de dispositivo</h6>
            )}

            <p className="text">
              {!isEmail && !dispositivoCheckado && (
                <div>
                  Enviamos um codigo para o seu telefone{" "}
                  {dataForgotPassword?.telefone}
                </div>
              )}
              {isEmail && !dispositivoCheckado && (
                <div>
                  Enviamos um codigo para o seu email{" "}
                  {handleGetEmail()}
                </div>
              )}
              {dispositivoCheckado && (
                <h6 className="title">Redefinição de senha</h6>
              )}
              {dispositivoCheckado && (
                <div className="email">
                  <Input
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
                        value:
                          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?)*$/,
                        message: "E-mail inválido. Verifique",
                      },
                    }}
                    onChange={handleChangeEmail}
                    errorText={
                      formState.errors.email &&
                      (formState.errors.email.message as string)
                    }
                    disabled={false}
                  />
                </div>
              )}
            </p>
            {!dispositivoCheckado && (
              <InputCode
                setCodigoValido={setValidPhoneOrEmail}
                getCode={
                  isEmail ? handleValidationEmail : handleValidationPhone
                }
                dispositivo={
                  isEmail
                    ? dataForgotPassword?.email || getValues("email")
                    : dataForgotPassword?.telefone || ""
                }
              />
            )}
          </div>
        )}
        {insideStepper == 3 && (
          <div className="redefinicao-body">
            <CheckCircle
              className='text-primary !text-[4rem]'/>
            <h6 className="title">
              O e-mail de redefinição de senha foi enviado para{" "}
              <strong> {getValues("email") || dataForgotPassword?.email}</strong>
            </h6>
            <div className="body-button">
              <ButtonBack              
              onClick={() => {
                setIsStepper(isStepper - 1);
                setIsForgotPassword(false);
              }}
              />
              {/* <Button
                className="submit"
                type="button"
                variant="medium"
                text="Voltar para tela inicial"
              /> */}
            </div>
          </div>
        )}
        {insideStepper != 1 && insideStepper != 3 && (
          <div className="body-button">
            <ButtonBack
              onClick={() => {
                handleClickBack();
              }}
            />
            <Button
              className="submit"
              type="button"
              variant="medium"
              text={insideStepper == 0 ? "Confirmar" : "Enviar"}
              disabled={insideStepper == 0 ? dataInvalida || !!formState.errors.dataNascimento  : !validPhoneOrEmail}
              onClick={handleClick}
            />
          </div>
        )}
      </div>
    </ContainerForgotPassword>
  );
};
