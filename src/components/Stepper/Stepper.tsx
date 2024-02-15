import React from 'react';
import { Check } from '@/components/icons/Check';
import { theme } from '@/shared';
import { ContainerStepper } from './styles';
import { IStepper } from './interface';
import { Box, Typography } from '@mui/material';

export const Stepper: React.FC<IStepper> = ({ currentStep, steps, fontSize, hideNotCurrentMobile }) => {
  return (
    <ContainerStepper currentStep={currentStep} steps={steps}>
      {steps.map((step) => (
        <Box key={`${step.stage}${step.number}`} className={`container-stepper ${step.number > 0 ? '' : 'disabled'} ${step.number <= currentStep.number ? 'active' : ''} ${step.number === currentStep.number ? 'actual' : ''}`}
          sx={
            hideNotCurrentMobile && (step.number === currentStep.number) ? {
              '@media (max-width: 768px)': {
                minWidth: '200px',
              }
          } : {}
        }
        >
           <div className={`line ${step.number <= currentStep.number ? 'active' : ''} ${step.number === currentStep.number ? 'actual' : ''} `} />
           <div>
            <div className={`circle ${currentStep.number > step.number ? 'check' : ''} ${step.number === currentStep.number ? 'actual' : ''} `}>
              {currentStep.number === step.number && <div />}
              {currentStep.number > step.number && <Check width={18} height={18} color={"#FFFFFF"} />}
           </div>
              <Typography
                className='text-xs text-textPrimary'
                sx={{
                  fontSize: fontSize || '12px',
                  fontWeight: 'bold',
                  '@media (max-width: 768px)': {
                    display: hideNotCurrentMobile && step.number !== currentStep.number ? 'none' : 'block',
                    fontSize: '10px',
                  },
                }}
              >
                {step.stage}
              </Typography>

          </div>
        </Box>
      ))}
    </ContainerStepper>
  );
};
