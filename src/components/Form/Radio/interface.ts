import { InputHTMLAttributes } from 'react';

export interface IRadio extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    name: string;
    label: string;
    remainColor?: boolean;
    readonly?: boolean;
    defaultValue?: any
}
