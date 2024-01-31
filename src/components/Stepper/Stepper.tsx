import React from 'react';
import { Check } from '@/components/icons/Check';
import { theme } from '@/shared';
import { ContainerStepper } from './styles';
import { IStepper } from './interface';

export const Stepper: React.FC<IStepper> = ({ currentStep, steps }) => {
  return (
    <ContainerStepper currentStep={currentStep} steps={steps}>
      {steps.map((step) => (
        <div key={`${step.stage}${step.number}`} className={`container-stepper ${step.number > 0 ? '' : 'disabled'} ${step.number <= currentStep.number ? 'active' : ''} ${step.number === currentStep.number ? 'actual' : ''}`}>
           <div className={`line ${step.number <= currentStep.number ? 'active' : ''} ${step.number === currentStep.number ? 'actual' : ''} `} />
           <div>
            <div className={`circle ${currentStep.number > step.number ? 'check' : ''} ${step.number === currentStep.number ? 'actual' : ''} `}>
              {currentStep.number === step.number && <div />}
              {currentStep.number > step.number && <Check width={18} height={18} color={"#FFFFFF"} />}
           </div>
              <span
                className='text-xs'
              >
                {step.stage}
              </span>

          </div>
        </div>
      ))}
    </ContainerStepper>
  );
};
