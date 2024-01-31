export interface IImage {
    foto?: {
        tipo?: string;
        link?: string;
        top?: any;
        id?: number;
        novoTamanho?: number;
    },
    capa?: {
        tipo?: string;
        link?: string;
        top?: number;
        id?: number;
        novoTamanho?: number;
    },
    minicapa?: {
        tipo?: string;
        link?: string;
        top?: number;
        id?: number;
        novoTamanho?: number;
    },
    mobiledestaque?: {
        tipo?: string;
        link?: string;
        top?: number;
        id?: number;
        novoTamanho?: number;
    },
    destaque: {
        link?: string;
    }
}
