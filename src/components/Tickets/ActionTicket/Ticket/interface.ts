import { ITicket } from '@/types';

export interface ITicketComponent {
    data: {
        nome: string | undefined;
        tiposDeIngresso: ITicket[];
        valores: number[];
    };
    type: 'normal' | 'chairs'
}
