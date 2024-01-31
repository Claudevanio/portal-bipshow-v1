import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Stepper } from '@/components/Stepper';
import { StepperRegister } from '@/shared/config/stepper';
import { Button } from '@/components/Form/Button';
import { useAuth } from '@/shared/hooks/useAuth';
import { useFormContext } from 'react-hook-form';
import { IUser } from '@/types';
import Link from 'next/link';
import { theme } from '@/shared';
import { FormAddress } from '@/components/FormAddress';
import { StepOne } from './StepOne';
import { ContainerRegister } from './styles';
import { StepTwo } from './StepTwo';
import { IRegister } from './IRegister';
import { StepFour } from './StepFour';
import { StepFive } from './StepFive';
import { ArrowLeft } from '@mui/icons-material';
import { usePathname } from 'next/navigation';
import { ButtonBack } from '@/components/ButtonBack';

const MiniStep: React.FC<({activeTab:number, stepCount: number})> = ({ activeTab, stepCount }) => {
  return (
    <ul
      className='flex gap-3 items-center'
    >
      {new Array(stepCount).fill(0).map((_, index) => (
        <li
          key={index}
          className={`w-4 h-1 rounded-xl ${
            activeTab === index
              ? 'bg-primary'
              : 'bg-[#D9D9D9]'
          }`}
        />
      ))}
    </ul>
  );
}


export const Register: React.FC<IRegister> = ({
  handleChangeType,
  onClickPurchase,
}) => {
  const {
    isStepper,
    handleNextStepRegister,
    setIsStepper,
    isLoading,
    onToPhoto,
    toPhoto,
    photoAvatar,
    photo,
    validateEmail,
    setValidateEmail,
    isInvalidPicture,
    photoInvalida,
    setPhotoInvalida,
    emailValidado,
    createdUser,
    onAddPhoto,
    checkEmailExistente,
    typesDoc
  } = useAuth();

  interface IRegisterUser extends IUser{
    DDD: string;
  }

  const { handleSubmit, getValues, setValue, watch, reset } = useFormContext<IRegisterUser>();
  // const [formData, setFormData] = useState();
  const pathname = usePathname();

  const gender = watch('gender');

  const onSubmit = React.useCallback(
    async (data: IUser) => {
      debugger;
      
      if (photoInvalida === 400) {
        onAddPhoto(undefined);
        setPhotoInvalida(undefined);
        return;
      }

      if (isStepper === 0) {
        const existe = await checkEmailExistente(getValues('email') || '');
        if (existe) { 
          return;
        }
      }
      if (isStepper === 1 && !validateEmail) {
        setValidateEmail(true);
      }
      if(isStepper === 0 && typesDoc?.length > 0){
        setValidateEmail(true);
      }

      if (isStepper === 4 && photo && !isInvalidPicture && createdUser) {
        const ddd = getValues('DDD')
        data.telefone = `${ddd}${data.telefone}`;
        handleNextStepRegister(data, onClickPurchase, true);
        return;
      }
      if (onClickPurchase || photo) {
        handleNextStepRegister(data, onClickPurchase);
      } else {
        handleNextStepRegister(data);
      }
    },
    [
      isStepper,
      validateEmail,
      photo,
      photoInvalida,
      isInvalidPicture,
      createdUser,
    ],
  );

  //   useEffect(() => {
  //     if (photoAvatar) {
  //       handleSubmit(onSubmit)(formData);
  //     }
  //   }, [photoAvatar]);

  return (
    <ContainerRegister>
      {pathname === '/register' && (
        <Link href="/"
        legacyBehavior>
          <a className="home-back" href="#">
            <ArrowLeft
              width={32}
              height={32}
              className='text-primary'
            />
          </a>
        </Link>
      )}
      <div className="w-full flex flex-col items-center justify-center">
        {/* <h4 className="title">Registro</h4> */}
        {/* <Stepper
          steps={StepperRegister}
          currentStep={StepperRegister[isStepper]}
        /> */}
        <div className="card">
          <div
            className='w-full justify-center flex'
          >
            <MiniStep
              activeTab={isStepper}
              stepCount={StepperRegister.length}
              />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h6 className="title">
              {isStepper === 4
                ? 'Foto do rosto'
                : isStepper === 1
                  ? 'Endereço'
                  : 'Criar conta'}
            </h6>
            {isStepper === 0 && <StepOne />}
            {isStepper === 1 && (
            <FormAddress
              variant="register"
              defaultValue={{
                idPais: 76
              }}
              loading={isLoading}
            />
            )}
            {isStepper === 2 && <StepTwo />}
            {isStepper === 3 && <StepFour />}

            {isStepper === 4 && <StepFive />}
            {!toPhoto && !(isStepper === 4 && !photoAvatar) ? (
              <div
                className={`${
                  isStepper >= 0
                    ? 'buttons'
                    : 'is-stepper-one-btn-custom'
                }`}
              >
                {isStepper >= 0 && (isStepper <= 4) && !(isStepper === 4 && photoAvatar) && (
                <ButtonBack
                  onClick={() => {
                    if(isStepper === 0 && handleChangeType) {
                      handleChangeType('login');
                      return;
                    }
                    if(isStepper === 2 && typesDoc?.length > 2 ){
                      setIsStepper(0);
                      return;
                    }
                    if(isStepper === 1) {
                      reset()
                    }

                    setIsStepper(isStepper - 1);
                }
                }
                />
                // <ArrowLeft
                //   width={32}
                //   height={32}
                //   className='text-primary'
                //   onClick={() => {
                //     setIsStepper(isStepper - 1);
                //   }}
                //   />
                )}
                {isStepper === 4 && !photoAvatar ? (
                  <Button
                    text="Tirar foto"
                    variant="medium"
                    type="button"
                    onClick={() => onToPhoto(true)}
                  />
                ) : (
                  <React.Fragment>
                    <Button
                      type="submit"
                      variant="medium"
                      text={
                        isStepper === 4
                          ? photoInvalida === 400
                            ? 'Nova foto'
                            : 'Finalizar'
                          : 'Avançar'
                        }
                      disabled={
                        isLoading
                        || !gender || 
                        (!emailValidado
                            && isStepper === 2
                            && validateEmail)
                            || (isStepper === 4 && !photoAvatar)
                        }
                      loading={isLoading}
                    />
                    {/* {handleChangeType
                            && isStepper === 0 && (
                            <Button
                              type="button"
                              variant="outline-text"
                              text="Entrar"
                              onClick={() => handleChangeType(
                                'login',
                              )}
                            />
                    )} */}
                  </React.Fragment>
                )}
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </ContainerRegister>
  );
};
