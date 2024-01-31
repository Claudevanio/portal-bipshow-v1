import { IImage } from './IImage';
import { ITicket } from './ITicket';

export interface IEventTicket {
    id?: number,
    nome?: string,
    descricao?: string,
    descricaoTexto?: string,
    qtdeParcelaFixa?: number,
    status?: string,
    link?: string,
    tipo?: string,
    linkCompleto?: string,
    dataRealizacao?: string,
    dataRealizacaoTexto?: string,
    website?: any,
    dataFim?: any,
    formulario?: any,
    inicio?: string,
    diaInicio?: string,
    horaInicio?: string,
    vendeQuarto?: boolean,
    fim?: any,
    horaFim?: any,
    disponivel?: boolean,
    tiposDeIngresso?: Array<ITicket>,
    restrito?: boolean,
    endereco?: string,
    localizacao?: string,
    mapa?: {
        longitude?: string,
        latitude?: string
    },
    nomeDoLugar?: string,
    localidade?: string,
    cep?: string,
    estado?: string,
    possuiLogoRodape?: boolean,
    exibirCadeiras?: boolean,
    local?: {
        selecaoDeSetorNoEstadio?: boolean;
        nome?: string,
        capacidade?: any,
        endereco?: {
            id?: number,
            bairro?: string,
            cep?: string,
            localidade?: string,
            complemento?: any,
            localizacao?: string,
            logradouro?: string,
            nomeDoLugar?: string,
            numero?: string
        },
        alvaraFuncionamento?: string,
        alvaraBombeiros?: any,
        setores?: [
            {
                nome?: string,
                capacidade?: number,
                cadeiras?: any[],
                subsetores?: any[],
                cor?: any,
                id?: number,
                observacao?: any
            },
            {
                nome?: string,
                capacidade?: number,
                cadeiras?: any[],
                subsetores?: any[],
                cor?: any,
                id?: number,
                observacao?: any
            },
            {
                nome?: string,
                capacidade?: number,
                cadeiras?: any[],
                subsetores?: any[],
                cor?: any,
                id?: number,
                observacao?: any
            }
        ],
        portarias?: any[],
        id?: number,
        tipo?: string,
        mapa?: {
            html?: string,
            grande?: {
                imagem?: string,
                highlight?: string,
                coordenadas?: string
            },
            pequeno?: {
                imagem?: string,
                highlight?: string,
                coordenadas?: string
            },
            coordenadas?: string;
            imagem?: string;
        },
        sortearCadeira?: null
    },
    imagens?: IImage,
    foto?: string,
    capa?: {
        tipo?: string,
        link?: string,
        top?: number,
        id?: number,
        novoTamanho?: number
    },
    exibirQtdes?: boolean,
    taxaIncluso?: boolean,
    taxa?: number,
    taxas?: [
        {
            formaPagamento?: string,
            taxa?: number,
            valor?: number,
            qtdeParcelas?: any,
            id?: number
        },
        {
            formaPagamento?: string,
            taxa?: number,
            valor?: number,
            qtdeParcelas?: number,
            id?: number
        },
        {
            formaPagamento?: string,
            taxa?: number,
            valor?: number,
            qtdeParcelas?: any,
            id?: number
        }
    ],
    opcoesDeParcelamento?: any[],
    maxBilhetePorUsuario?: number,
    responsavel?: {
        id?: number,
        nome?: string
    },
    encerrouOnline?: boolean,
    valorTaxaIncluso?: boolean,
    infoVendas?: {
        total?: number,
        totalMeia?: number,
        InferiorOuro?: {
            total?: number,
            totalMeia?: number,
            totalInteira?: number
        },
        totalInteira?: any,
        InferiorPrata?: {
            total?: number,
            totalMeia?: number,
            totalInteira?: number
        },
        Superior?: {
            total?: number,
            totalMeia?: number,
            totalInteira?: number
        },
        variosDias?: any
    },
    podeVenderBoleto?: boolean,
    ratingCompra?: any,
    voucherPorEmail?: any,
    pixelFacebook?: any
}
