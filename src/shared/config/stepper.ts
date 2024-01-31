import { IStepper } from '@/types';

export const stepperLogin: IStepper[] = [
  {
    stage: 'cpf',
    number: 0,
  },
  {
    stage: 'password',
    number: 1,
  },
  {
    stage: 'info',
    number: 2,
  },
];

export const StepperRegister: IStepper[] = [
  {
    stage: 'nome',
    number: 0,
  },
  {
    stage: 'telefone',
    number: 1,
  },
  {
    stage: 'endereco',
    number: 2,
  },
  {
    stage: 'foto',
    number: 3,
  },
  {
    stage: 'senha',
    number: 4,
  },
];

export const stepperCheckoutPurchase = [
  {
    stage: 'Identificação',
    number: 0,
  },
  {
    stage: 'Titulares',
    number: 1,
  },
  {
    stage: 'Pagamento',
    number: 2,
  },
];

export const stepperCheckoutPurchaseAgain = [
  {
    stage: 'Pagamentos',
    number: 0,
  },
];

export const stepperResetPassword = [
  {
    stage: 'Redefinir sua senha',
    number: 0,
  },
  {
    stage: 'Redefinir sua senha',
    number: 1,
  },
];
