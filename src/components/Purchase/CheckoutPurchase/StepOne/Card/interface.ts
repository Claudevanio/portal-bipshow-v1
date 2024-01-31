import { TicketSelectUserProps } from '@/types';

export interface ICard {
    nome: string;
    index: number;
    user?: TicketSelectUserProps;
}