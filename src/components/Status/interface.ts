export type Status = 'warning' | 'success';

export interface IStatus {
    type: Status;
    text: string;
}
