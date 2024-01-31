import { ISelect } from '@/types';
import { OffcanvasProps } from 'react-bootstrap';

export interface ModalOptionsProps extends OffcanvasProps {
    options: ISelect[];
    onSelect: (option: ISelect) => void;
    titleModal: string;
    selectOption: ISelect;
}
