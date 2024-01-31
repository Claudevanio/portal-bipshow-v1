import { IValuePerTypePayment } from '@/types';

export interface ISector {
    nome?: string;
    preco?: number;
    setorId?: number;
    idTypeEvent: number;
    valoresPorFormaPagamento?: IValuePerTypePayment;
    taxaPadrao?: number;
}
