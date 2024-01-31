export interface IPurchase {
    cartao: string;
    validade: string;
    cvv: number;
    nome: string;
    parcelas: string;
    brand?: string;
    token?: string;
    senderHash?: string;
    tipoDoCartao?: string;
}
