export interface IButtonQDT {
    current: number;
    max: number;
    onClick: (type: 'next' | 'prev') => void
}
