import { IAlert } from '@/types';

export interface IAlertComponent {
    variant: IAlert;
    text?: string;
    html?: React.ReactNode;
}
