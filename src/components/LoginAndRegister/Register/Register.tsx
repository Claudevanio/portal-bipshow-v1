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
import { usePathname, useSearchParams } from 'next/navigation';
import { ButtonBack } from '@/components/ButtonBack';
import { useRegister } from '@/shared/hooks/useRegister';
import { Checkbox, Modal } from '@mui/material';

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
    typesDoc,
    setIsLoading
  } = useAuth();

  const { defaultValues } = useRegister();

  const [isSubmiting, setIsSubmiting] = useState(false);

  interface IRegisterUser extends IUser{
    DDD: string;
  }

  const { handleSubmit, getValues, setValue, watch, reset, formState } = useFormContext<IRegisterUser>();
  // const [formData, setFormData] = useState();
  const pathname = usePathname();

  const gender = watch('gender');

  const onSubmit = React.useCallback(
    async (data: IUser) => { 
      if(isLoading || isSubmiting) {
        console.log('parei aqui')
        return;
      }
      if(isStepper ===4){
        setIsLoading(true);
      } 

      setIsSubmiting(true);
      
      if (photoInvalida === 400) {
        onAddPhoto(undefined);
        setPhotoInvalida(undefined);
        setIsSubmiting(false);
        setIsLoading(false)
        return;
      }

      if (isStepper === 0) {
        const existe = await checkEmailExistente(getValues('email') || '');
        setIsSubmiting(false); 
        if (existe) { 
          return;
        }
      }
      if (isStepper === 1 && !validateEmail) {
        setValidateEmail(true);
        setIsSubmiting(false);
      }
      if(isStepper === 0 && typesDoc?.length > 0){
        setValidateEmail(true);
        setIsSubmiting(false);
      }

      if (isStepper === 4 && photo && !isInvalidPicture && createdUser) { 
        const ddd = getValues('DDD')
        data.telefone = !ddd ? data.telefone : data.telefone?.startsWith(ddd) ? data.telefone : `${ddd}${data.telefone}`;
        handleNextStepRegister(data, onClickPurchase, true);
        setIsSubmiting(false);
        setIsLoading(false);
        return;
      }
      if (onClickPurchase || photo) {
        const ddd = getValues('DDD')
        data.telefone = data.telefone?.startsWith(ddd) ? data.telefone : `${ddd}${data.telefone}`;
        handleNextStepRegister(data, onClickPurchase);
        setIsSubmiting(false);
        setIsLoading(false);
      } else {
        handleNextStepRegister(data);
        setIsSubmiting(false);
        setIsLoading(false);
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

  const query = useSearchParams()

  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  useEffect(() => {
    if (query.get('payload')){
      setIsStepper(4);
    }
  }, [query, setIsStepper])

  
  const [isTermosModalOpen, setIsTermosModalOpen] = useState<boolean>(false);

  const [currentFilePath, setCurrentFilePath] = useState<string | undefined>(undefined);

  const handleCloseTermosModal = () => {
    setIsTermosModalOpen(false);
  }
  const handleOpenTermosModal = () => {
    setIsTermosModalOpen(true);
  }
  

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
            
      {
        isStepper === 0 && <div
          className='text-sm py-4' 
        >
        Ao criar sua conta você concorda com nosso <span className='text-primary cursor-pointer' 
        onClick={
          () => {
            handleOpenTermosModal()
            setCurrentFilePath('termos.html')
          }
        }
        >Termos de Uso</span> e <span className='text-primary cursor-pointer'
        onClick={
          () => {
            handleOpenTermosModal()
            setCurrentFilePath('privacidade.html')
        }}
        >Política de Privacidade</span>
        <div>
          <Checkbox
            checked={isTermsAccepted}
            onChange={(e) => setIsTermsAccepted(e.target.checked)}
          />
          <span>
            Aceito os termos
          </span>
        </div>

      </div>}
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

            {isStepper === 4 && <StepFive
              handleChangeType={handleChangeType}
            />}
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
                    // if(isStepper === 1) {
                    //   reset()
                    // }

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
                        formState.isSubmitting || isLoading
                        || !gender || (isStepper === 0 && !isTermsAccepted) || (!emailValidado
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
      
      <Modal
          open={isTermosModalOpen}
          onClose={handleCloseTermosModal}
          className='w-full h-full flex items-center justify-center'
        >
          <div
            className=' h-full w-full md:w-1/2 md:h-1/2  bg-background p-4'
          >
          <ButtonBack
            onClick={handleCloseTermosModal}
          />
            <iframe
              src={`html/${currentFilePath}`}
              className='w-full h-[80%]'
            />
          </div>
        </Modal>
    </ContainerRegister>
  );
};
