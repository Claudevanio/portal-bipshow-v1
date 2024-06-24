export interface Evento {
  id: number;
  nome: string;
  link: string;
  linkCompleto: string;
  hide?: boolean;
  multipleIds?: boolean;
  eventosIds?: number[];
  dataRealizacao: string;
  inicio: string;
  horaInicio: string;
  tipo: string;
  localId: number;
  categoria?: {
    nome: string;
    id: number;
  };
  endereco: string;
  localizacao: string;
  mapa: {
    longitude: string;
    latitude: string;
  };
  nomeDoLugar: string;
  localidade: string;
  cep: string;
  estado: string;
  imagens: {
    foto: Imagem;
    capa: Imagem;
    minicapa: Imagem;
    destaque: Imagem;
    mobiledestaque: Imagem;
  };
  foto: string;
  capa: Imagem;
  minicapa: string;
  prioridade: number;
  rotativo: boolean;
  fixo: boolean;
  bipshow: boolean;
  bipfut: boolean;
}

export interface Imagem {
  tipo: string;
  link: string;
  top: null | any; // Você pode ajustar o tipo correto aqui
  id: number;
  novoTamanho: number;
  linkCompleto: string;
}

export interface EventosResponse {
  eventos: Evento[];
  total: number;
}
