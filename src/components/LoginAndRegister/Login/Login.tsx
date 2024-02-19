import React, { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/Form/Input';
import { CPFMask, senhaMask } from '@/shared/config/mask';
import { Button } from '@/components/Form/Button';
import { useAuth } from '@/shared/hooks/useAuth';
import { cpf, email } from '@/shared/config/regex';
import { Button as ButtonLink } from '@/components';
import { theme } from '@/shared';
import { ArrowLeft } from '@mui/icons-material';
import { useRegister } from '@/shared/hooks/useRegister';
import { Avatar } from '@/components';
import { Interrogation } from '@/components/icons/Interrogation';
import { ButtonBack } from '@/components/ButtonBack';
import Link from 'next/link';
import { StepFive } from '@/components/LoginAndRegister/Register/StepFive';
import Image from 'next/image';
import { ContainerLogin, ContainerButton, ContainerLoginV2 } from './styles';
import { ILogin } from './interface';
import { ForgotPassowrd } from './ForgotPassword';
import { ForgotPasswordSuccess } from './ForgotPasswordSuccess';

export const Login: React.FC<ILogin> = ({
  onClickPurchase,
  handleChangeType,
}) => {
  const methods = useFormContext();
  const {
    handleNextStep,
    isStepper,
    setIsStepper,
    isLoading,
    userNotExist,
    setUserNotExist,
    handleForgotPassword,
    forgotPassword,
    handleForgotPasswordBack,
    dataForgotPassword,
    handleDataForgotPasswordBack,
    successSendEmail,
    notUserPhoto,
    setIsNotUserPhoto,
    onToPhoto,
    toPhoto,
    photoAvatar,
    onAddPhoto,
    handleDeleteUser,
  } = useAuth();
  const [isTypePassordView, setIsTypePassoed] = useState<'password' | 'text'>(
    'password',
  );

  /* useEffect(() => {
    handleDeleteUser();
  }, []); */

  const { user } = useRegister();
  const [isCpf, setIsCpf] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { push } = useRouter();
  const pathname = usePathname();
  const [error, setError] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [beforePassword, setBeforePassword] = useState<boolean>(false);
  const [enter, setEnter] = useState<boolean>(false);

  const handleCheckboxChange = (event: any) => {
    setIsChecked(event.target.checked);
    if (event.target.checked === true) {
      setError(false);
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const isBeforeLogin = React.useCallback(() => {
    return isStepper === 0 && !enter;
  }, [isStepper, enter]);

  const handleCheck = () => {
    if (!isChecked) {
      setError(true);
    } else {
      push('/register');
    }
  };

  const onSubmit = (data: any) => {
    
    
    if (isCpf) {
      data.cpf = data.emailOrCpf;
      data.type = 'cpf';
      data.email = null;
    } else {
      data.cpf = null;
      data.email = data.emailOrCpf;
      data.type = 'email';
    }

    if (enter) {
      setEnter(false);
      return;
    }

    if (photoAvatar && notUserPhoto) {
      handleNextStep(notUserPhoto, photoAvatar, onClickPurchase);
    } else {
      handleNextStep(data, undefined, onClickPurchase);
    }
  };

  const isWatchCPF = methods.watch('emailOrCpf');
  const isWatchPASSWORD = methods.watch('senha');
  const isWatchEmailOrCpf = methods.watch('emailOrCpf');

  const handleForgotAccount = () => {
    handleForgotPassword('');
  };

  const handleCpf = (e: boolean) => {
    setIsCpf(e);
  };

  const identificado = React.useCallback(() => {
    return isStepper === 1 && !forgotPassword && beforePassword;
  }, [isStepper, forgotPassword, beforePassword]);

  const hasForgotPassword = React.useCallback(() => {
    return isStepper === 1 && forgotPassword;
  }, [isStepper, forgotPassword, dataForgotPassword]);

  const informarSenha = React.useCallback(() => {
    return isStepper === 1 && !forgotPassword && !beforePassword;
  }, [isStepper, forgotPassword, beforePassword]);

  const handleProsseguir = () => {
    setBeforePassword(false);
  };

  const cpfOrEmailValid = React.useCallback(() => {
    if(!isWatchEmailOrCpf)
      return
    if(isWatchEmailOrCpf.length == 0) return false;
    if(isWatchEmailOrCpf.length > 0 ){
      // is 1st letter a number?
      const firstLetterNumberRegex = /^\d/;
      if(firstLetterNumberRegex.test(isWatchEmailOrCpf)){
        setIsCpf(true);
      } else{
        setIsCpf(false);
      }
    }

    const firstLetterNumberRegex = /^\d/;

    if (!isCpf && !firstLetterNumberRegex.test(isWatchEmailOrCpf)) {
      const emailRegex = /^\S+@\S+.\S+$/;
      if (emailRegex.test(isWatchEmailOrCpf)) {
        return true;
      }

      return false;
    }
    const cpfRegex = /^\d{3}.\d{3}.\d{3}-\d{2}$/;
    if (cpfRegex.test(isWatchEmailOrCpf)) return true;

    return false;
  }, [isWatchEmailOrCpf]);

  const isTypeButton = useMemo(() => {
    switch (isStepper) {
      case 0:
        if (enter) {
          return {
            text: 'Prosseguir',
          };
        }
        return {
          disabled: !cpfOrEmailValid() || isWatchEmailOrCpf?.length == 0,
          text: 'Entrar',
        };
      case 1:
        if (beforePassword) {
          return {
            text: 'Prosseguir',
          };
        }
        return {
          disabled: isLoading ? isLoading : !isWatchPASSWORD,
          text: 'Confirmar',
        };
      case 2:
        return {
          disabled: false,
          text: 'Sim, continuar',
        };
      default:
        return {
          disabled: !isWatchCPF,
          text: 'Entrar',
        };
    }
  }, [isStepper, isWatchPASSWORD, isWatchCPF, isLoading]);

  useEffect(() => {
    if (user && user.nome) {
      setIsStepper(2);
    }
  }, [user, setIsStepper]);

  const formRef = React.useRef<HTMLFormElement>(null);

  const LoginContainer = (
    <>
      {pathname === '/login' && (
        <Link href="/"
        legacyBehavior>
          <a className="home-back">
            <ArrowLeft width={32} height={32} 
              className='text-primary'
            />
          </a>
        </Link>
      )}
      <div className={'form-container'}>
        <div className={isStepper === 0 && !enter ? 'card' : 'card2'}>
          {isStepper === 0 && !notUserPhoto && !enter && (
            <div className="pai">
              {/* <img className="logo-login" src="/assets/logo3.png" />
              <Image
                className="robo-login"
                width={1500}
                height={1000}
                object-fit="cover"
                src="/assets/faceid.gif"
              /> */}
            </div>
          )}
          <div
            className={
              identificado() || hasForgotPassword() || informarSenha()
                ? 'body-login'
                : 'body-login'
            }
          >
            {isStepper === 0 && enter && (
              <div style={{ textAlign: 'center' }}>
                {/* <Image
                  width={200}
                  height={200}
                  object-fit="cover"
                  src="/assets/logo-SynPass-06.svg"
                /> */}
                <div className="text-pre-login">
                  Bem vindo a plataforma de acesso único por reconhecimento
                  facial
                  <br />
                  <br />
                  Você é sua própria identidade!
                  <br />
                  <br />
                  Você é o caminho!
                  <br />
                  <br />
                  <p className="prosseguir">
                    Clique em prosseguir para login ou cadastro!
                  </p>
                  <br />
                  <br />
                </div>
              </div>
            )}
            {isStepper === 0 && !notUserPhoto && !enter && !userNotExist && (
              <div
                className='flex flex-col items-center justify-center gap-2'
              >
                <p className="title-login">Entrar</p>
                <div
                  className='flex items-center justify-center gap-2'
                >
                  {/* <Avatar
                    size='small'
                    className=' !h-20 !w-20 border-none'
                    src='/person-2.svg'
                  /> */}
                  <Image
                    alt='avatar'
                    src='/Entrar.svg'
                    width={120}
                    height={120}
                  />
                </div>
              </div>
            )}
            {(!userNotExist || notUserPhoto) && (
              <form 
                onSubmit={methods.handleSubmit(onSubmit)}
                ref={formRef}
              >
                {identificado() && (
                  <div
                    className="body-before-login flex items-center"
                    style={{ textAlign: 'center' }}
                  >
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="70"
                        viewBox="0 0 24 24"
                        width="70"
                        fill="#8779F8"
                      >
                        <path
                          d="M0 0h24v24H0z"
                          fill="none"
                          fill-rule="evenodd"
                        />
                        <g fill-rule="evenodd">
                          <path d="M9 17l3-2.94c-.39-.04-.68-.06-1-.06-2.67 0-8 1.34-8 4v2h9l-3-3zm2-5c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4" />
                          <path d="M15.47 20.5L12 17l1.4-1.41 2.07 2.08 5.13-5.17 1.4 1.41z" />
                        </g>
                      </svg>
                    </div>
                    <div>Olá! É bom te ver novamente</div>
                    <div>
                      <div className="text-password h-24">
                        Bem-vindo(a) de volta. Para fazer o login, clique em
                        prosseguir.
                      </div>
                    </div>
                    <div className="forgot-password">
                      {/* <Button
                        text="NÃO LEMBRO DO MEU CADASTRO"
                        variant="outline-text"
                        onClick={handleForgotAccount}
                      /> */}
                    </div>
                    <div className="buttons">
                      <ButtonBack
                        onClick={() => {
                          if (isStepper > 0) {
                            methods.clearErrors('senha');
                            setIsStepper(isStepper - 1);
                            // setBeforePassword(true);
                          }
                        }}
                      />
                      <Button
                        text="Prosseguir"
                        variant="medium"
                        className="submit"
                        disabled={
                          !forgotPassword
                            ? isTypeButton.disabled
                            : isLoading
                              ? isLoading
                              : !isCpf
                                ? !isWatchEmailOrCpf
                                : !isWatchCPF
                        }
                        onClick={handleProsseguir}
                        loading={isLoading}
                      />
                    </div>
                  </div>
                )}
                {informarSenha() && (
                  <div className="body-login">
                    <div
                      className='w-full text-center font-normal text-black text-lg '
                    >Informe sua senha</div>
                    <Input
                      type={isTypePassordView}
                      name="senha"
                      id="senha"
                      label="Senha"
                      password={{
                        onClick: () => setIsTypePassoed(
                          isTypePassordView === 'password'
                            ? 'text'
                            : 'password',
                        ),
                        value: isTypePassordView,
                      }}
                      rules={{
                        required: {
                          value: true,
                          message: 'Senha inválida. Verifique',
                        },
                        minLength: {
                          value: 6,
                          message: 'Senha inválida. Verifique',
                        },
                      }}
                      // onChange={(event) => {
                        // const isNumber = /^[0-9]+$/;
                        // if (!isNumber.test(event.target.value) && event.target.value.length > 0) {
                        //   return;
                        // }
                        // handleChangePassword(event.target.value);
                      // }}
                      mask={senhaMask}
                      maxLength={6}
                      max={6}
                      disabled={isLoading}
                      errorText={
                        methods.formState.errors.senha
                        && (methods.formState.errors.senha.message as string)
                      }
                    />
                    <div className="forgot-password">
                      <Button
                        text="Esqueceu a senha?"
                        variant="outline-text"
                        onClick={handleForgotAccount}
                        className='decoration-primary !text-primary text-underline'
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <ButtonBack
                        onClick={() => {
                          if (isStepper > 0) {
                            methods.clearErrors('senha');
                            setIsStepper(isStepper - 1);
                            setBeforePassword(true);
                          }
                        }}
                      />
                      <Button
                        text={!forgotPassword ? isTypeButton.text : 'Enviar'}
                        type="submit"
                        variant="medium"
                        className="submit w-full"
                        disabled={
                          !forgotPassword
                            ? isTypeButton.disabled
                            : isLoading
                              ? isLoading
                              : !isCpf
                                ? !isWatchEmailOrCpf
                                : !isWatchCPF
                        }
                        loading={isLoading}
                      />
                    </div>
                  </div>
                )}
                <h6 className="title">
                  {notUserPhoto && 'Mantenha seu rosto dentro do frame'}
                  {isStepper === 2 && !notUserPhoto && 'Este(a) é você?'}
                </h6>
                {!notUserPhoto ? (
                  <React.Fragment>
                    {(isStepper === 0 || isStepper === 2) && !enter && (
                      <>
                        {isStepper === 0 && (
                          <Input
                            type={isCpf ? 'tel' : 'email'}
                            name="emailOrCpf"
                            id="emailOrCpf"
                            label="CPF ou Email"
                            //disable autocomplete
                            autoComplete="off" 

                            // rules={
                            //     isCpf
                            //       ? {
                            //         required: {
                            //           value: true,
                            //           message: 'CPF inválido. Verifique',
                            //         },
                            //         minLength: {
                            //           value: 14,
                            //           message: 'CPF inválido. Verifique',
                            //         },
                            //         maxLength: {
                            //           value: 14,
                            //           message: 'CPF inválido. Verifique',
                            //         },
                            //         pattern: {
                            //           value: cpf,
                            //           message: 'CPF inválido. Verifique',
                            //         },
                            //       }
                            //       : {
                            //         required: {
                            //           value: true,
                            //           message: 'E-mail inválido. Verifique',
                            //         },
                            //         pattern: {
                            //           value: email,
                            //           message: 'E-mail inválido. Verifique',
                            //         },
                            //       }
                            //   }
                            setIsCpf={handleCpf}
                            defaultValue={user?.emailOrCpf}
                            disabled={isLoading}
                            mask={isCpf ? CPFMask : undefined}
                            errorText={
                                isCpf
                                  ? methods.formState.errors.cpf
                                    && (methods.formState.errors.cpf
                                      .message as string)
                                  : methods.formState.errors.email
                                    && (methods.formState.errors.email
                                      .message as string)
                              }
                          />
                        )}

                        <p>
                            Ainda não possuo conta. <span
                            className='!text-primary cursor-pointer'
                            onClick={() => {
                              handleChangeType && handleChangeType('register');
                            }}
                            >
                              Criar conta
                            </span>
                        </p>

                      </>
                    )}
                    {isStepper === 2 && user && (
                      <div className="info-user">
                        <p className="text-dark">{user.nome}</p>
                        <span className="light">{user.email}</span>
                      </div>
                    )}

                    {isStepper === 1 && hasForgotPassword() && (
                      <ForgotPassowrd />
                    )}
                    <ContainerButton
                      isStepper={isStepper}
                      userNotExist={userNotExist}
                    >
                      {isStepper === 0 && (
                        <div className="stepper-one-btn">
                          <Button
                            text={isTypeButton.text}
                            type="submit"
                            variant="medium"
                            disabled={
                              isLoading ? isLoading : isTypeButton.disabled
                            }
                            loading={isLoading}
                          />
                        </div>
                      )}
                      {isStepper === 2
                        && (onClickPurchase ? (
                          <Button
                            // type="button"
                            onClick={onClickPurchase}
                          >
                                  {isTypeButton.text}
                          </Button>
                        ) : (
                          <ButtonLink
                            // href="/home"
                            onClick={onClickPurchase}
                          >
                            {
                              isTypeButton.text
                            }
                          </ButtonLink>
                        ))}
                      {isStepper === 2 && (
                        <Button
                          type="button"
                          variant="outline"
                          text="Não sou eu"
                          onClick={() => {
                            setIsStepper(0);
                          }}
                        />
                      )}
                    </ContainerButton>
                  </React.Fragment>
                ) : (
                  <StepFive 
                    handleChangeType={handleChangeType}
                  />
                )}
                {notUserPhoto && !toPhoto && (
                  <ContainerButton isStepper={1} userNotExist={false}>
                    <button
                      type="button"
                      className="back"
                      onClick={() => {
                        if (photoAvatar) {
                          onAddPhoto(undefined);
                        } else {
                          setIsStepper(1);
                          setUserNotExist(false);
                          setIsNotUserPhoto(undefined);
                        }
                      }}
                    >
                      <ArrowLeft
                        width={24}
                        height={24}
                        className='text-primary'
                      />
                    </button>
                    {photoAvatar ? (
                      <Button
                        text={`${photoAvatar ? 'Finalizar' : 'Tirar foto'}`}
                        type="submit"
                        variant="medium"
                        className={`submit ${
                          photoAvatar ? 'photo-avatar' : ''
                        }`}
                        disabled={isLoading ? isLoading : isTypeButton.disabled}
                        loading={isLoading}
                      />
                    ) : (
                      <Button
                        text={`${photoAvatar ? 'Finalizar' : 'Tirar foto'}`}
                        type="button"
                        variant="medium"
                        className={`submit ${
                          photoAvatar ? 'photo-avatar' : ''
                        }`}
                        disabled={isLoading ? isLoading : isTypeButton.disabled}
                        loading={isLoading}
                        onClick={() => onToPhoto(true)}
                      />
                    )}
                  </ContainerButton>
                )}
              </form>
            )}
            {userNotExist && (
              <div className="user-not-exists">
                <h2
                  className='text-textPrimary text-center font-medium'
                >Você não possui cadastro</h2>
                <div className="flex items-center justify-center">
                  {/* <Avatar 
                  size='medium'
                  src={user?.imagem}
                  // image={user?.imagem} 
                  />
                  <div className="icon">
                    <Interrogation
                      color={'#8779F8'}
                      width={22}
                      height={39}
                    />
                  </div> */}

                  <Image
                    alt='avatar'
                    src={'/NaoCadastrado.svg'}
                    width={120}
                    height={120}
                  />
                </div>
                <div className="infos">
                  {/* <span className="dark">
                    {isCpf ? 'CPF' : 'E-mail'}
                    {' '}
                    {isCpf
                      ? CPFMask(methods.getValues('emailOrCpf'))
                      : methods.getValues('emailOrCpf')}
                  </span> */}
                  <p className="text-textPrimary text-center px-8 md:px-12 max-w-[24rem]">
                  Faça seu cadastro, leva apenas alguns minutinhos :{')'}
                  </p>
                  {/* <p className="text">
                    Ao criar sua conta você concorda com os
                    {' '}
                    <a
                      target="_blank"
                      href="https://hml.synpass.com.br/viewer/termos/Termos%20de%20Uso"
                      rel="noreferrer"
                    >
                      Termos de Serviço
                    </a>
                  </p> */}
                  {/* <div>
                    <input
                      className="checkbox"
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                      required
                    />
                    <label className="text">Aceito os termos de serviço</label>
                    <p className="text error">
                      {error
                        ? 'É necessário aceitar os termos de serviço.'
                        : ''}
                    </p>
                  </div> */}
                </div>
                <ContainerButton
                  isStepper={isStepper}
                  userNotExist={userNotExist}
                >
                  <ButtonBack
                    onClick={() => {
                      setUserNotExist(false);
                      
                      setIsStepper(0);
                    }}
                  />
                  <Button
                    text="Cadastrar"
                    type="button"
                    variant="medium"
                    className="submit"
                    // disabled={isLoading ? isLoading : isTypeButton.disabled}
                    // loading={isLoading}
                    onClick={
                      () => handleChangeType && handleChangeType('register')
                    }
                  />
                  {/* <button
                    type="button"
                    className="back"
                    onClick={() => {
                      setUserNotExist(false);
                      setIsStepper(0);
                    }}
                  >
                    <ArrowLeft
                      width={24}
                      height={24}
                      className='text-primary'
                    />
                  </button> */}
                  {/* <ButtonLink
                    onClick={
                      () => handleChangeType && handleChangeType('register')
                    }
                    className="cadastro"
                    // href="/register"
                  >
                    Cadastrar
                  </ButtonLink> */}
                </ContainerButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );

  return !isBeforeLogin() ? (
    <ContainerLogin>{LoginContainer}</ContainerLogin>
  ) : (
    <ContainerLogin>{LoginContainer}</ContainerLogin>
  );
};
