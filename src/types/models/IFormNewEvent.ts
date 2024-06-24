export interface IFormNewEvent {
  idPais?: number;
  participantesExpectativa?: number;
  nomeEvento?: string;
  tipoEvento?: string;
  categoria?: string;
  eventoOnline?: 'presencial' | 'online' | 'hibrido';
  nome?: string;
  idPaisContato?: number;
  cpf?: string;
  CPF?: string;
  email?: string;
  telefone?: string;
  necessidadesEvento?: string[];
}