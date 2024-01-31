import { IAddress } from './IAddress';

export interface IEvent {
    startDate?: string;
    endDate?: string;
    title?: string;
    image?: string;
    nomeDoLugar?: string;
    localidade?: string;
    address?: IAddress;
    hour?: string;
    id?: number | string;
    slug?: string;
}
