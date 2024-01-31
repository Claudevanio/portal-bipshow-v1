import { IPlace } from '@/types';

export interface IModalTicketTypeMesa {
    onClose: () => void;
    id: number;
    nome?: string;
    mapa: {
        coordenadas: string;
        imagens: {
            mesas: string;
            reservadas: string;
            selecionadas: string;
        };
        mapId: string;
        padding: number;
    };
    valor?: number;
    taxaFixa?: number;
    taxaServico?: number;
    taxaConveniencia?: number;
    quantityMax?: number;
    handleChangeQTD: (type: 'next' | 'prev', idTable?: number) => void;
    description?: string;
    mesas?: IPlace[];
}
