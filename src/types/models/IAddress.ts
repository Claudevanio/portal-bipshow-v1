export interface IAddress {
    id?: number;
    bairro?: string;
    cep?: string;
    localidade?: string;
    complemento?: string;
    localizacao?: string;
    logradouro?: string;
    nomeDoLugar?: string;
    numerow: string;
    cidade?: {
        id: number;
        nome: string;
    }
}
