import { IEventProps } from './IEventProps';
import { IUser } from './IUser';

export interface ITicketPurchaseUser {
    evento: IEventProps;
    guid: string;
    horario: string;
    id: number;
    ingressos: any[];
    localizador: null
    pagamento: any;
    pedidosDependentes: any[];
    qtdeBilhetes: number
    reservado: boolean;
    status: string;
    ultimaAtualizacao: string;
    usuario: IUser;
    valor: number;
}
