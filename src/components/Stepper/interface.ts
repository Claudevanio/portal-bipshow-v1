import { IStepper as IStepperProps } from '@/types';

export interface IStepper {
    steps: IStepperProps[];
    currentStep: IStepperProps
}
