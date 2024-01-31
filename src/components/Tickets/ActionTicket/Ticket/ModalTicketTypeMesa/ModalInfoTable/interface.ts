import { CustomArea } from 'react-img-mapper';

export interface IModalInfo {
    valor?: number;
    taxa?: number;
    nome?: string;
    lugar?: CustomArea;
    onClose: () => void;
    handleClickArea: (event: CustomArea) => void;
    description?: string;
}
