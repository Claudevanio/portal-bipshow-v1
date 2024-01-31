export interface AddressProps {
    idPais?: number;
    cep?: string;
    logradouro?: string;
    complemento?: string;
    localidade?: string;
    bairro?: string;
    numero?: string;
    estado?: string;
    nomeCidade?: string;
    cidade?: {
        id: number;
        nome: string;
    };
    uf?: string;
    codigoIbge?: number;
    uzerId?: number;
}
