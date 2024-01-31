import { IPlace } from '@/types';
import { IValuePerTypePayment } from '@/types';

export interface IAction {
    lote?: string;
    nome?: string;
    valor?: number;
    taxaFixa?: number;
    taxaServico?: number;
    taxaConveniencia?: number;
    qtd?: number;
    limitePorUsuario?: number;
    totalDisponivel?: number;
    id?: number;
    index: number;
    tipo?: string;
    mapa?: {
        coordenadas: string;
        imagens: {
            mesas: string;
            reservadas: string;
            selecionadas: string;
        };
        mapId: string;
        padding: number;
    };
    description?: string;
    mesas?: IPlace[];
    valoresPorFormaPagamento?: IValuePerTypePayment;
    exibirTaxaSomada?: boolean;
}
