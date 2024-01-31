export interface IResponsible {
    conta: {
        saldo: number;
    };
    nome: string;
    email: string;
    cpf?: string;
    comprouBilhete: boolean;
    criouEvento: boolean;
    compradorVerificado: boolean;
    rg?: string;
    senha?: string;
    id: number;
}
