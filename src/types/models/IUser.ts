import { AddressProps } from './AddressProps';

export interface IUser {
    conta?: {
        saldo?: number;
    };
    id?: number;
    senha?: string;
    idPais?: number;
    idTipoDocumento?: number;
    telefoneDDI?: number;
    nome?: string;
    cpf?: string;
    CPF?: string;
    emailOrCpf?: any;
    email?: string;
    gender?: number;
    telefone?: string;
    dataNascimento?: string;
    comprouBilhete?: boolean;
    criouEvento?: boolean;
    compradorVerificado?: boolean;
    organizadorVerificado?: boolean;
    foto?: string;
    rg?: string;
    fotoCamera?: string;
    login?: any;
    senhaExpirada?: any;
    admin?: any;
    adminPdv?: any;
    superAdmin?: any;
    tokenIndicacao?: any;
    inserido?: any;
    banido?: any;
    nacionalidade?: string;
    emailConfirmado?: string;
    numeroDoc?: string;
    documentoEstrangeiro?: string;
    DD?: number;
    endereco?: AddressProps;
    type?: string;
    imagem?: string;
}
