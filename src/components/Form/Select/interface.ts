import { IRules, ISelect as ISelectProps } from '@/types';
import { SelectHTMLAttributes } from 'react';

export interface ISelect extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    name: string;
    id: string;
    disabled: boolean;
    rules?: IRules;
    errorText?: string | null;
    options: ISelectProps[];
    loading: boolean
}
