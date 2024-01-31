import { IValuePerTypePayment } from '@/types';

export interface ISector {
    nome?: string;
    preco?: number;
    setorId?: number;
    valoresPorFormaPagamento?: IValuePerTypePayment;
    taxaPadrao?: number;
    valores?: number[]
}
