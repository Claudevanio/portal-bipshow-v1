import { IUser } from './IUser';
import { IValuePerTypePayment } from './IValuePerTypePayment';

export interface ITicketPurchase {
    id: number;
    qtde: number;
    lote?: number;
    index: number;
    valor: number;
    nome?: string;
    user?: IUser;
    singleId?: string;
    ehMeia: boolean | boolean[];
    cadeiras?: number[];
    isTables?: number[];
    valoresPorFormaPagamento?: IValuePerTypePayment;
    taxaPadrao?: number;
}
