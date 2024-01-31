import { AddressProps } from '@/types';

export type FormAddressVariantType = 'register' | 'normal'

export interface FormAdressProps {
    defaultValue?: AddressProps;
    variant?: FormAddressVariantType;
    loading: boolean;
}
