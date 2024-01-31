export interface ITicketPurchaseConfirmationUser {
    id: number;
    nome: string;
    comprador: {
        conta: {
            saldo: number;
        };
        nome: string;
        telefone: string;
        email: string;
        cpf: string;
        imagem: any;
        id: number;
    },
    codigo: '3jJkGYvE4cg';
    jaUtilizado: boolean;
    numero: number;
    valorIngresso: number;
    valorTaxa: number;
    nomeDestinatario: string;
    cpfDestinatario: number;
    documentoDestinatario: string;
    utilizador: {
        documento: string;
        nome: string;
    };
    ehDeSocio: boolean;
    status: string;
    podeTransferir: boolean;
    evento: {
        id: number;
        nome: string;
        descricao: string;
        descricaoTexto: string;
        status: string;
        link: string;
        tipo: string;
        linkCompleto: string;
        dataRealizacao: string;
        dataFim: any;
        formulario: any;
        inicio: string;
        diaInicio: string;
        vendeQuarto: boolean;
        fim: any;
        disponivel: boolean;
        tiposDeIngresso: any[]
        restrito: boolean,
        endereco: string;
        mapa: any;
        nomeDoLugar: string;
        estado: string;
        imagens: Array<{
            tipo: string;
            link: string;
            top: any;
            id: number;
        }>;
        exibirQtdes: boolean;
        taxaIncluso: boolean;
        taxa: number;
        taxas: any[];
        opcoesDeParcelamento: any[];
        maxBilhetePorUsuario: number;
        podeVenderBoleto: boolean;
        voucherPorEmail: boolean;
        pixelFacebook: any;
        comValidacaoFacial: boolean;
    };
    pedido: {
        id: number;
        guid: string;
    };
    facial?: boolean;
}
