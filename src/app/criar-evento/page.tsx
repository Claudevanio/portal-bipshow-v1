'use client'
import { Stepper } from '@/components/Stepper';
import { stepperNewEvent } from '@/shared';
import { IFormNewEvent } from '@/types'
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { StepOne } from './steps/StepOne';
import { ButtonBack } from '@/components/ButtonBack';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Form/Button';
import { StepTwo } from './steps/StepTwo';
import { StepThree } from './steps/StepThree';
import { StepFour } from './steps/StepFour';
import { ConfirmDialog } from '@/components/Dialog/ConfirmDialog';

export default function Home(){
  const methods = useForm<IFormNewEvent>({
    defaultValues: {
      necessidadesEvento: []
    }
  })

  const [currentStep, setCurrentStep] = useState(0)

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)

  const router = useRouter()

  function onSubmit(data: IFormNewEvent){
    if(currentStep < 3){
      setCurrentStep(currentStep + 1)
      return
    }
    if(!isConfirmDialogOpen){
      setIsConfirmDialogOpen(true)
      console.log(data)
      return
    }
  }

  return (
    <div
      className='bg-gradient h-full w-full flex items-center justify-center min-h-[90vh] p-8'
    >
      
      <FormProvider {...methods}>
        <div
          className='bg-background w-full md:w-[50%] p-8 md:rounded-2xl flex flex-col gap-8 fixed z-20 h-full max-h-[100vh] md:max-h-full overflow-y-auto top-0 md:relative'
        >
          <h1
            className='text-3xl text-textPrimary flex gap-8 items-center'
          >
            <ButtonBack
              onClick={
                () => router.push('/')
              }
            />
            Criar meu evento
          </h1>

          <Stepper
              steps={stepperNewEvent}
              currentStep={{
                number: currentStep,
                stage: stepperNewEvent[currentStep].stage
              }}
              fontSize='14px'
              hideNotCurrentMobile
            />
          <form
            className='flex flex-col gap-8'
            onSubmit={methods.handleSubmit(onSubmit)}
          >
          {currentStep === 0 && <StepOne/>}
          {currentStep === 1 && <StepTwo/>}
          {currentStep === 2 && <StepThree/>}
          {currentStep === 3 && <StepFour/>}
            <div
              className='flex flex-col-reverse md:flex-row gap-8 items-center justify-center w-full h-full'
            > 
              {
                currentStep > 0 && currentStep!== 3 && (
                  <Button
                    text='Voltar'
                    type='button'
                    variant='outline-text'
                    className='md:max-w-[5%]'
                    onClick={
                      () => setCurrentStep(currentStep - 1)
                    }
                  />
                )
              }
              <Button
                type='submit'
                text={currentStep === 3 ? 'Enviar informações' : 'Continuar'}
                className='md:max-w-[50%] w-full'
              />          
            </div>
            <ConfirmDialog
              title="Pronto!"
              message="Suas informações para criar evento foram enviadas, em breve entraremos em contato."
              confirmButtonText="Entendido"
              open={isConfirmDialogOpen}
              handleClose={() => setIsConfirmDialogOpen(false)}
              onConfirm={() => router.push('/')}
            />
          </form>

        </div>

      </FormProvider>
    </div>
  )
}