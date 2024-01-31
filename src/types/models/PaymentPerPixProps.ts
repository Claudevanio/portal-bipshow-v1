export interface PaymentPerPixProps {
    sucesso: boolean;
    qrCode: string;
    textoPix: string;
    idPagamento: string;
    status: string;
    mensagem?: string;
}
