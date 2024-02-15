export interface IFormNewEvent {
  idPais?: number;
  participantesExpectativa?: number;
  nomeEvento?: string;
  tipoEvento?: string;
  idCategoria?: number;
  eventoOnline?: 0 | 1 | 2;
  nome?: string;
  idPaisContato?: number;
  cpf?: string;
  CPF?: string;
  email?: string;
  telefone?: string;
  necessidadesEvento?: number[];
}