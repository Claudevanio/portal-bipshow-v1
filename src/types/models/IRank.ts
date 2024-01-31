export type Rack = {
    regiao: string,
    numero: number,
    cadeirante: any,
    obeso: boolean,
    acompanhante: boolean,
    deslocamento: number,
    mobilidade: boolean,
    ordemReversa: boolean,
    alinhamento: any,
    id: number,
    ordem: any,
    identificador: string,
    excluida: boolean
}

export interface IRack {
    letra: string;
    cadeiras: Rack[];
    id: number;
}
