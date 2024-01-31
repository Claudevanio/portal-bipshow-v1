import { IAddress } from './IAddress';
import { IImage } from './IImage';
import { IPreferences } from './IPreferences';
import { IResponsible } from './IResponsible';

export interface IEventProps {
    status: string;
    responsavel: IResponsible;
    excluido?: boolean;
    vendaParcelada: boolean;
    parcelaFixa: boolean;
    qtdeParcelaFixa?: any;
    franquia?: {
        nome?: string;
        id?: number
    };
    naoAprovar?: boolean;
    formulario?: any;
    destaque?: string;
    taxa?: number;
    taxaMinima?: number;
    maxBilhetePorUsuario?: number;
    taxaIncluso?: boolean;
    tiposDeIngresso?: Array<any>;
    gruposDeTipo?: Array<any>;
    taxas?: Array<any>;
    opcoesDeParcelamento?: Array<any>;
    bilhetesNomeados?: boolean;
    exigirDocumento?: boolean;
    preferencias?: IPreferences;
    tipo?: string;
    id: number;
    nome?: string;
    dataRealizacao?: string;
    dataFim?: string;
    descricao?: string;
    link?: string;
    site?: boolean;
    horarioLimiteVenda?: any;
    tipoDeCodigo?: any;
    exibirNumeroDoBilhete?: boolean;
    qtdDigitosNumeroDoBilhete?: number;
    vendaOffline?: boolean;
    linkExtra?: any;
    cancelado?: any;
    encerrado?: any;
    valorTaxaIncluso?: boolean;
    abrirNoSite?: boolean;
    endereco?: IAddress | string;
    imagens?: IImage;
    nomeDoLugar?:string;
    localidade:string;
    pontosDeVenda?: Array<any>;
    tags?: Array<any>;
    diasEvento?: Array<any>;
    setores?: Array<any>;
    horaInicio?: string;
    dataDescricao?: string;
    horaFim?: any;
    restrito?: boolean;
    diasRestantes?: number;
    foto?: string;
    capa?: {
        tipo?: string;
        link?: string;
        top?: number;
        id?: number;
        novoTamanho?: number
    };
    fotoCapa?: string;
    alturaFotoCapa?: number;
    linkCompleto?: string;
}
