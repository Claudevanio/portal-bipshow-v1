import { ITicket } from './ITicket';

export interface IPurchaseSuccess {
    associado: boolean;
    ehMeia: boolean;
    formaRetirada: any;
    id: number;
    nome: string;
    qtde: number
    tipoDeIngresso: ITicket;
    tiposDoPassaporte: any[];
    total: number;
    valorUnitario: number;
}
