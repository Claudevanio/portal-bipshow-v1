import { ISelect } from '@/types';
import { ISelect as ISelectForm } from '@/components/Form/Select/interface';

export type SelectModalProps = ISelectForm & {
    titleModal: string;
    defaultOption: ISelect
}
