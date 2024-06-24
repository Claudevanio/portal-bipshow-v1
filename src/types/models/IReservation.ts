import { AddressProps } from './AddressProps';

export interface IReservation {
  idTipo: number;
  descricao: string;
  nome: string;
  email?: string;
  rg?: string;
  cpf: string;
  telefone?: string;
  pais?: string | number;
  tipoDocumento?: string | number;
  documento?: string;
  dependente: boolean;
  enderecoCobranca?: AddressProps;
}
