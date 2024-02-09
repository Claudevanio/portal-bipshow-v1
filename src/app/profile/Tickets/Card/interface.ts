import { ITicketUser } from '@/types';

export interface ICard {
    tickets: ITicketUser;
    active?: boolean;
    onClick: () => void;
    idEvento: number;
    endereco?: string;
    canceled?: boolean;
}
