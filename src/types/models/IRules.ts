import { ValidationRule } from 'react-hook-form';

export interface IValidation<V, M = string> {
    value: V,
    message: M
}

export interface IRules {
    required: IValidation<boolean, string>;
    min?: IValidation<number, string>;
    max?: IValidation<number, string>;
    minLength?: IValidation<number, string>;
    maxLength?: IValidation<number, string>;
    pattern?: ValidationRule<RegExp>;
    validate?: ValidationRule<any>;
}
