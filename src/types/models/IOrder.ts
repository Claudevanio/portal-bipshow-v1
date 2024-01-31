export interface IOrder {
    sucesso: boolean,
    pedido?: {
        id: number,
        guid: string,
        valor: number,
        horario?: string,
        ultimaAtualizacao: string,
        status: string,
        reservado: boolean,
        localizador?: any,
        prereserva?: boolean,
        evento: {
            id: number,
            nome?: string,
            descricao?: string,
            link?: string,
            dataRealizacao?: string,
            dataDescricao: string,
            horaInicio?: string,
            foto?: string,
            pixelFacebook?: any,
            local?: string,
            localizacao?: string,
            bilhetesNomeados?: boolean,
            exigirDocumento?: boolean,
            endereco?: string,
            mapa?: {
                longitude?: string,
                latitude?: string
            },
            soCarga?: any,
            podeEditar?: boolean
        },
        usuario?: {
            id?: number,
            nome: string,
            cpf: string,
            email?: string
        },
        ingressos?: [
            {
                id?: number,
                tipoDeIngresso?: {
                    qtdeGera?: number,
                    qtdeMinima?: number,
                    dias?: any[],
                    lotes?: any[],
                    tipo?: string,
                    id?: number,
                    nome?: string,
                    qtde?: number,
                    valorUnitario?: number,
                    qtdeMeia?: number,
                    limitePorUsuario?: any,
                    limitePorIngresso?: any,
                    exigeMatricula?: boolean,
                    prepago?: boolean,
                    taxaFixa?: any,
                    precadastro?: any,
                    evento?: {
                        excluido?: boolean,
                        vendaParcelada?: boolean,
                        parcelaFixa?: boolean,
                        qtdeParcelaFixa?: any,
                        franquia?: {
                            nome?: string,
                            id?: number
                        },
                        naoAprovar?: true,
                        exibirQtdes?: boolean,
                        vendeQuarto?: boolean,
                        voucherPorEmail?: boolean,
                        formulario?: any,
                        taxa?: number,
                        taxaMinima?: number,
                        maxBilhetePorUsuario?: number,
                        taxaIncluso?: boolean,
                        tiposDeIngresso?: any[],
                        gruposDeTipo?: any[],
                        taxas?: any[],
                        opcoesDeParcelamento?: any[],
                        bilhetesNomeados?: boolean,
                        exigirDocumento?: boolean,
                        preferencias?: {
                            confirmarCheckin?: boolean,
                            tocarSons?: boolean,
                            fecharAvisoCheckinAutomaticamente?: boolean,
                            tempoAvisoCheckin?: number,
                            fecharAvisoErroCheckinAutomaticamente?: boolean,
                            tempoAvisoErroCheckin?: number
                        },
                        aceitaBoleto?: boolean,
                        cartaoInternacional?: boolean,
                        vendaMeiaBloqueada?: boolean,
                        numeracaoPorIngresso?: boolean,
                        saldoCartao?: boolean,
                        utilizadorResponsavel?: boolean,
                        soCargaCarteirinha?: any,
                        pixelFacebook?: any,
                        id?: number,
                        nome?: string,
                        imagens?: any[]
                    },
                    mesas?: any[],
                    planos?: any[],
                    credenciais?: any[],
                    camposAdicionais?: any[],
                    ingressos?: any[],
                    subsetores?: any[]
                },
                cadeira?: {
                    id: number
                };
                qtde?: number,
                ehMeia?: boolean,
                associado?: boolean,
                tiposDoPassaporte?: any[],
                formaRetirada?: any,
                nome?: string,
                valorUnitario?: 11.5,
                total?: 11.5;
                mesa?: {
                    id: number;
                };
            }
        ],
        qtdeBilhetes?: number,
        pedidosDependentes?: any[],
        bilhetesPreencher?: [
            {
                descricao?: string,
                editarRG?: boolean,
                editarCPF?: boolean,
                editarNome?: boolean,
                nomeTipo?: string,
                idTipo: number,
                tipo?: string,
                esconder?: boolean,
                nome?: string,
                email?: string;
                rg?: any,
                cpf?: string
            }
        ],
        valoresPorForma?: [
            {
                id?: number,
                formaPagamento?: string,
                desconto?: number,
                acrescimo?: number,
                total?: number
            },
            {
                id?: number,
                formaPagamento?: string,
                desconto?: number,
                acrescimo?: number,
                total?: number
            },
            {
                id?: number,
                formaPagamento?: string,
                desconto?: number,
                acrescimo?: number,
                total?: number
            },
            {
                id?: number,
                formaPagamento?: string,
                desconto?: number,
                acrescimo?: number,
                total?: number
            },
            {
                id?: number,
                formaPagamento?: string,
                desconto?: number,
                acrescimo?: number,
                total?: number
            }
        ],
        pagamento: {
            status: string;
            qrCode?: string;
            textoPix?: string;
            urlPagamento?: string;
        }
        pagarNoBoleto?: boolean,
        pagarNoDebitoOnline?: boolean
    };
    mensagem?: string;
}
