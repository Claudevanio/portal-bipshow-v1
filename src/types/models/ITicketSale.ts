export interface ITicketSale {
    id: number,
    nome: string,
    comprador: {
        conta: {
            saldo: number;
        };
        nome: string;
        telefone: string;
        email: string;
        cpf: string;
        imagem: any;
        id: number;
    },
    codigo: string,
    jaUtilizado: boolean,
    utilizador: {
        nome:string
    },
    numero: number,
    valorIngresso: number,
    valorTaxa: number,
    nomeDestinatario: string,
    cpfDestinatario?: number,
    compradoOnline?: boolean,
    ehDeSocio: boolean,
    status?: string,
    podeEditar?: boolean
    facial?: boolean
}
