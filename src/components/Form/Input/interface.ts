import { IRules } from '@/types';
import { InputHTMLAttributes } from 'react';

export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  id: string;
  type: string;
  disabled: boolean;
  isCpf?: boolean;
  setIsCpf?: (value: boolean) => void;
  mask?: (value: string) => string;
  rules?: IRules;
  errorText?: string | null;
  password?: {
    value: 'text' | 'password';
    onClick: () => void;
  };
  defaultValue?: string;
  disabledClean?: boolean;
  onClean?: () => void;
  pseudoDisabled?: boolean;
  ref?: any;
}
