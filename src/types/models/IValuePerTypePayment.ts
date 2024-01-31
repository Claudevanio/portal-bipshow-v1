export interface IValuePerTypePayment {
    [key: string]: {
        taxaConveniencia: number;
        taxaServico: number;
        valorUnitario: number;
        valorVenda: number
    }
}
