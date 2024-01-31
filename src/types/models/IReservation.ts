export interface IReservation {
    idTipo: number,
    descricao: string,
    nome: string,
    email?: string,
    rg?: string,
    cpf: string,
    telefone?: string,
    dependente: boolean
}
