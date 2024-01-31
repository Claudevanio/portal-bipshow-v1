import { EventosResponse } from "@/types";
import { api } from ".";
import { appToken } from "@/constants";

export const landingPageService = {
  getEventos: async () => {
    const response = await api.get("/eventos", {
      headers: {
        Authorization: appToken,
        "X-App-Context": "bipshow",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
    });
    return response.data;
    // return {
    //   "eventos": [
    //     {
    //       "status": "NAO_PUBLICADO",
    //       "responsavel": {
    //         "conta": {
    //           "saldo": 0
    //         },
    //         "nome": "Ruither J Queiroz",
    //         "telefone": "62981043475",
    //         "email": "ruither@solucoesageis.com.br",
    //         "comprouBilhete": false,
    //         "criouEvento": false,
    //         "compradorVerificado": false,
    //         "rg": null,
    //         "uzerId": null,
    //         "imagem": null,
    //         "idPais": null,
    //         "menor": null,
    //         "senha": null,
    //         "id": 1
    //       },
    //       "localidade": "Brasilia/BR",
    //       "nomeDoLugar": "Centro de Convenções Ulysses Guimarães",
    //       "vendaParcelada": true,
    //       "parcelaFixa": false,
    //       "qtdeParcelaFixa": null,
    //       "franquia": {
    //         "nome": "Uzer - Goiânia",
    //         "id": 1
    //       },
    //       "naoAprovar": true,
    //       "exibirQtdes": false,
    //       "comValidacaoFacial": false,
    //       "vendeQuarto": false,
    //       "voucherPorEmail": null,
    //       "formulario": null,
    //       "taxa": 0.15,
    //       "taxaMinima": 2,
    //       "maxBilhetePorUsuario": 5,
    //       "taxaIncluso": false,
    //       "tiposDeIngresso": [
    //         {
    //           "qtdeGera": 1,
    //           "qtdeMinima": 1,
    //           "dias": [
    //             {
    //               "dia": "2024-01-04",
    //               "id": "2024-01-04T00:00:00.000Z"
    //             },
    //             {
    //               "dia": "2024-01-05",
    //               "id": "2024-01-05T00:00:00.000Z"
    //             },
    //             {
    //               "dia": "2024-01-06",
    //               "id": "2024-01-06T00:00:00.000Z"
    //             },
    //             {
    //               "dia": "2024-01-11",
    //               "id": "2024-01-11T00:00:00.000Z"
    //             },
    //             {
    //               "dia": "2024-01-12",
    //               "id": "2024-01-12T00:00:00.000Z"
    //             },
    //             {
    //               "dia": "2024-01-13",
    //               "id": "2024-01-13T00:00:00.000Z"
    //             },
    //             {
    //               "dia": "2024-01-14",
    //               "id": "2024-01-14T00:00:00.000Z"
    //             }
    //           ],
    //           "lotes": [
    //             {
    //               "nome": "1° LOTE",
    //               "valor": 50,
    //               "global": null,
    //               "qtde": 100,
    //               "qtdeMeia": 0,
    //               "ativo": true,
    //               "qtdeVendido": 0,
    //               "taxaFixa": null,
    //               "id": 10,
    //               "numero": 1,
    //               "dataInicio": null,
    //               "dataFim": null
    //             }
    //           ],
    //           "idExterno": null,
    //           "tipo": "individual",
    //           "id": 24,
    //           "nome": "PASSAPORTE",
    //           "qtde": 10,
    //           "valorUnitario": 10,
    //           "descricao": "Ingresso da direito entrar todos dais do evento",
    //           "meia": false,
    //           "quotaMeia": 0,
    //           "qtdeMeia": 0,
    //           "regrasMeia": null,
    //           "pospago": null,
    //           "imagem": null,
    //           "genero": "UNISEX",
    //           "dataInicioVenda": null,
    //           "dataLimiteVenda": null,
    //           "dataUtilizacao": null,
    //           "horarioInicioEntrada": null,
    //           "horarioFimEntrada": null,
    //           "entradaMultipla": null,
    //           "importado": false,
    //           "mensagem": null,
    //           "observacoes": null,
    //           "integrado": null,
    //           "exibirTotal": null,
    //           "limitePorUsuario": null,
    //           "limitePorCpf": null,
    //           "limitePorIngresso": null,
    //           "numeroLeituras": 1,
    //           "logo": null,
    //           "permiteImportar": null,
    //           "exigeMatricula": false,
    //           "exigeCheckinFechamento": false,
    //           "exigeCpf": false,
    //           "prepago": false,
    //           "esconderValor": false,
    //           "layout": null,
    //           "layoutZebra": null,
    //           "ordem": 1,
    //           "idNoEvento": 1,
    //           "taxaFixa": null,
    //           "exibirTaxaSomada": false,
    //           "precadastro": null,
    //           "formaRetirada": null,
    //           "tipoValidacao": null,
    //           "categoria": {
    //             "nome": "PASSAPORTE",
    //             "id": 11
    //           },
    //           "evento": {
    //             "excluido": false,
    //             "vendaParcelada": true,
    //             "parcelaFixa": false,
    //             "qtdeParcelaFixa": null,
    //             "franquia": {
    //               "nome": "Uzer - Goiânia",
    //               "id": 1
    //             },
    //             "naoAprovar": true,
    //             "exibirQtdes": false,
    //             "comValidacaoFacial": false,
    //             "vendeQuarto": false,
    //             "voucherPorEmail": false,
    //             "formulario": null,
    //             "taxa": 0.15,
    //             "taxaMinima": 2,
    //             "maxBilhetePorUsuario": 5,
    //             "taxaIncluso": false,
    //             "tiposDeIngresso": [],
    //             "gruposDeTipo": [],
    //             "taxas": [],
    //             "opcoesDeParcelamento": [],
    //             "bilhetesNomeados": true,
    //             "exigirDocumento": true,
    //             "preferencias": {
    //               "confirmarCheckin": true,
    //               "tocarSons": true,
    //               "fecharAvisoCheckinAutomaticamente": false,
    //               "tempoAvisoCheckin": 1,
    //               "fecharAvisoErroCheckinAutomaticamente": false,
    //               "tempoAvisoErroCheckin": 2
    //             },
    //             "aceitaBoleto": true,
    //             "aceitaPix": true,
    //             "cartaoInternacional": false,
    //             "vendaMeiaBloqueada": false,
    //             "numeracaoPorIngresso": false,
    //             "saldoCartao": true,
    //             "utilizadorResponsavel": true,
    //             "utilizadorUnico": false,
    //             "soCargaCarteirinha": null,
    //             "pixelFacebook": null,
    //             "id": 10,
    //             "nome": "Festival Gyn",
    //             "dataRealizacao": "2024-01-01T12:00:00.000Z",
    //             "utilizadoresPorCpf": null,
    //             "imagens": []
    //           },
    //           "mesas": [],
    //           "planos": [],
    //           "credenciais": [],
    //           "camposAdicionais": [],
    //           "ingressos": [],
    //           "subsetores": []
    //         },
    //         {
    //           "qtdeGera": 1,
    //           "qtdeMinima": 1,
    //           "dias": [
    //             {
    //               "dia": "2024-01-04",
    //               "id": "2024-01-04T12:00:00.000Z"
    //             }
    //           ],
    //           "lotes": [
    //             {
    //               "nome": "1° LOTE",
    //               "valor": 5,
    //               "global": null,
    //               "qtde": 100,
    //               "qtdeMeia": 40,
    //               "ativo": true,
    //               "qtdeVendido": 0,
    //               "taxaFixa": null,
    //               "id": 8,
    //               "numero": 1,
    //               "dataInicio": null,
    //               "dataFim": null
    //             }
    //           ],
    //           "idExterno": null,
    //           "tipo": "individual",
    //           "id": 25,
    //           "nome": "INGRESSO DIA  01",
    //           "qtde": 100,
    //           "valorUnitario": 5,
    //           "descricao": "Entrada valida apenas para o 1° dia",
    //           "meia": true,
    //           "quotaMeia": 40,
    //           "qtdeMeia": 40,
    //           "regrasMeia": "A meia-entrada é destinada a estudantes, idosos, pessoas com deficiência e jovens entre 15 e 29 anos comprovadamente carentes",
    //           "pospago": null,
    //           "imagem": null,
    //           "genero": "UNISEX",
    //           "dataInicioVenda": null,
    //           "dataLimiteVenda": null,
    //           "dataUtilizacao": "2024-01-04T12:00:00.000Z",
    //           "horarioInicioEntrada": null,
    //           "horarioFimEntrada": null,
    //           "entradaMultipla": null,
    //           "importado": false,
    //           "mensagem": null,
    //           "observacoes": null,
    //           "integrado": null,
    //           "exibirTotal": null,
    //           "limitePorUsuario": null,
    //           "limitePorCpf": null,
    //           "limitePorIngresso": null,
    //           "numeroLeituras": 1,
    //           "logo": null,
    //           "permiteImportar": null,
    //           "exigeMatricula": false,
    //           "exigeCheckinFechamento": false,
    //           "exigeCpf": false,
    //           "prepago": false,
    //           "esconderValor": false,
    //           "layout": null,
    //           "layoutZebra": null,
    //           "ordem": 2,
    //           "idNoEvento": 2,
    //           "taxaFixa": null,
    //           "exibirTaxaSomada": false,
    //           "precadastro": null,
    //           "formaRetirada": null,
    //           "tipoValidacao": null,
    //           "evento": {
    //             "excluido": false,
    //             "vendaParcelada": true,
    //             "parcelaFixa": false,
    //             "qtdeParcelaFixa": null,
    //             "franquia": {
    //               "nome": "Uzer - Goiânia",
    //               "id": 1
    //             },
    //             "naoAprovar": true,
    //             "exibirQtdes": false,
    //             "comValidacaoFacial": false,
    //             "vendeQuarto": false,
    //             "voucherPorEmail": false,
    //             "formulario": null,
    //             "taxa": 0.15,
    //             "taxaMinima": 2,
    //             "maxBilhetePorUsuario": 5,
    //             "taxaIncluso": false,
    //             "tiposDeIngresso": [],
    //             "gruposDeTipo": [],
    //             "taxas": [],
    //             "opcoesDeParcelamento": [],
    //             "bilhetesNomeados": true,
    //             "exigirDocumento": true,
    //             "preferencias": {
    //               "confirmarCheckin": true,
    //               "tocarSons": true,
    //               "fecharAvisoCheckinAutomaticamente": false,
    //               "tempoAvisoCheckin": 1,
    //               "fecharAvisoErroCheckinAutomaticamente": false,
    //               "tempoAvisoErroCheckin": 2
    //             },
    //             "aceitaBoleto": true,
    //             "aceitaPix": true,
    //             "cartaoInternacional": false,
    //             "vendaMeiaBloqueada": false,
    //             "numeracaoPorIngresso": false,
    //             "saldoCartao": true,
    //             "utilizadorResponsavel": true,
    //             "utilizadorUnico": false,
    //             "soCargaCarteirinha": null,
    //             "pixelFacebook": null,
    //             "id": 10,
    //             "nome": "Festival Gyn",
    //             "dataRealizacao": "2024-01-01T12:00:00.000Z",
    //             "utilizadoresPorCpf": null,
    //             "imagens": []
    //           },
    //           "mesas": [],
    //           "planos": [],
    //           "credenciais": [],
    //           "camposAdicionais": [],
    //           "ingressos": [],
    //           "subsetores": []
    //         },
    //         {
    //           "qtdeGera": 1,
    //           "qtdeMinima": 1,
    //           "dias": [
    //             {
    //               "dia": "2024-01-11",
    //               "id": "2024-01-11T12:00:00.000Z"
    //             }
    //           ],
    //           "lotes": [
    //             {
    //               "nome": "1° LOTE",
    //               "valor": 5,
    //               "global": null,
    //               "qtde": 100,
    //               "qtdeMeia": 40,
    //               "ativo": true,
    //               "qtdeVendido": 0,
    //               "taxaFixa": null,
    //               "id": 9,
    //               "numero": 1,
    //               "dataInicio": null,
    //               "dataFim": null
    //             }
    //           ],
    //           "idExterno": null,
    //           "tipo": "individual",
    //           "id": 26,
    //           "nome": "INGRESSO DIA 02",
    //           "qtde": 100,
    //           "valorUnitario": 5,
    //           "descricao": "Entrada valida apenas para o 2° dia",
    //           "meia": true,
    //           "quotaMeia": 40,
    //           "qtdeMeia": 40,
    //           "regrasMeia": "A meia-entrada é destinada a estudantes, idosos, pessoas com deficiência e jovens entre 15 e 29 anos comprovadamente carentes",
    //           "pospago": null,
    //           "imagem": null,
    //           "genero": "UNISEX",
    //           "dataInicioVenda": null,
    //           "dataLimiteVenda": null,
    //           "dataUtilizacao": "2024-01-11T12:00:00.000Z",
    //           "horarioInicioEntrada": null,
    //           "horarioFimEntrada": null,
    //           "entradaMultipla": null,
    //           "importado": false,
    //           "mensagem": null,
    //           "observacoes": null,
    //           "integrado": null,
    //           "exibirTotal": null,
    //           "limitePorUsuario": null,
    //           "limitePorCpf": null,
    //           "limitePorIngresso": null,
    //           "numeroLeituras": 1,
    //           "logo": null,
    //           "permiteImportar": null,
    //           "exigeMatricula": false,
    //           "exigeCheckinFechamento": false,
    //           "exigeCpf": false,
    //           "prepago": false,
    //           "esconderValor": false,
    //           "layout": null,
    //           "layoutZebra": null,
    //           "ordem": 3,
    //           "idNoEvento": 3,
    //           "taxaFixa": null,
    //           "exibirTaxaSomada": false,
    //           "precadastro": null,
    //           "formaRetirada": null,
    //           "tipoValidacao": null,
    //           "evento": {
    //             "excluido": false,
    //             "vendaParcelada": true,
    //             "parcelaFixa": false,
    //             "qtdeParcelaFixa": null,
    //             "franquia": {
    //               "nome": "Uzer - Goiânia",
    //               "id": 1
    //             },
    //             "naoAprovar": true,
    //             "exibirQtdes": false,
    //             "comValidacaoFacial": false,
    //             "vendeQuarto": false,
    //             "voucherPorEmail": false,
    //             "formulario": null,
    //             "taxa": 0.15,
    //             "taxaMinima": 2,
    //             "maxBilhetePorUsuario": 5,
    //             "taxaIncluso": false,
    //             "tiposDeIngresso": [],
    //             "gruposDeTipo": [],
    //             "taxas": [],
    //             "opcoesDeParcelamento": [],
    //             "bilhetesNomeados": true,
    //             "exigirDocumento": true,
    //             "preferencias": {
    //               "confirmarCheckin": true,
    //               "tocarSons": true,
    //               "fecharAvisoCheckinAutomaticamente": false,
    //               "tempoAvisoCheckin": 1,
    //               "fecharAvisoErroCheckinAutomaticamente": false,
    //               "tempoAvisoErroCheckin": 2
    //             },
    //             "aceitaBoleto": true,
    //             "aceitaPix": true,
    //             "cartaoInternacional": false,
    //             "vendaMeiaBloqueada": false,
    //             "numeracaoPorIngresso": false,
    //             "saldoCartao": true,
    //             "utilizadorResponsavel": true,
    //             "utilizadorUnico": false,
    //             "soCargaCarteirinha": null,
    //             "pixelFacebook": null,
    //             "id": 10,
    //             "nome": "Festival Gyn",
    //             "dataRealizacao": "2024-01-01T12:00:00.000Z",
    //             "utilizadoresPorCpf": null,
    //             "imagens": []
    //           },
    //           "mesas": [],
    //           "planos": [],
    //           "credenciais": [],
    //           "camposAdicionais": [],
    //           "ingressos": [],
    //           "subsetores": []
    //         }
    //       ],
    //       "gruposDeTipo": [],
    //       "taxas": [
    //         {
    //           "formaPagamento": "CartaoCreditoMaquina",
    //           "taxa": 0.1,
    //           "valor": 0,
    //           "qtdeParcelas": null,
    //           "id": 28
    //         },
    //         {
    //           "formaPagamento": "CartaoCreditoMaquinaParcelado",
    //           "taxa": 0.15,
    //           "valor": 0,
    //           "qtdeParcelas": 3,
    //           "id": 29
    //         },
    //         {
    //           "formaPagamento": "CartaoDebitoMaquina",
    //           "taxa": 0.1,
    //           "valor": 0,
    //           "qtdeParcelas": null,
    //           "id": 30
    //         }
    //       ],
    //       "opcoesDeParcelamento": [],
    //       "bilhetesNomeados": true,
    //       "exigirDocumento": true,
    //       "preferencias": {
    //         "confirmarCheckin": true,
    //         "tocarSons": true,
    //         "fecharAvisoCheckinAutomaticamente": false,
    //         "tempoAvisoCheckin": 1,
    //         "fecharAvisoErroCheckinAutomaticamente": false,
    //         "tempoAvisoErroCheckin": 2
    //       },
    //       "taxaServico": 0,
    //       "taxaConveniencia": 0,
    //       "aceitaBoleto": true,
    //       "aceitaPix": true,
    //       "cartaoInternacional": false,
    //       "vendaMeiaBloqueada": null,
    //       "numeracaoPorIngresso": null,
    //       "saldoCartao": true,
    //       "utilizadorResponsavel": true,
    //       "utilizadorUnico": false,
    //       "soCargaCarteirinha": null,
    //       "pixelFacebook": null,
    //       "qtdeTransferencias": 1,
    //       "tipo": "Show",
    //       "id": 10,
    //       "nome": "Festival Gyn",
    //       "dataRealizacao": "2024-01-01T12:00:00.000Z",
    //       "dataFim": "2024-01-15T12:00:00.000Z",
    //       "horarioLimiteVenda": null,
    //       "horarioLimiteTransferencia": null,
    //       "descricao": "<p><strong>Descri&ccedil;ao</strong>&nbsp;Lorem ipsum&nbsp; &nbsp;Lorem ipsum&nbsp;&nbsp;<strong>Lorem ipsum&nbsp;&nbsp;Lorem ipsum&nbsp;&nbsp;</strong></p>\n\n<p>&nbsp;</p>\n\n<ul>\n\t<li>Lorem ipsum&nbsp;&nbsp;Lorem ipsum&nbsp;&nbsp;Lorem ipsum&nbsp;&nbsp;Lorem ipsum&nbsp;&nbsp;</li>\n\t<li>Lorem ipsum&nbsp;&nbsp;Lorem ipsum&nbsp;&nbsp;Lorem ipsum&nbsp;&nbsp;Lorem ipsum&nbsp;&nbsp;Lorem ipsum&nbsp;&nbsp;</li>\n\t<li>Lorem ipsum&nbsp;&nbsp;Lorem ipsum&nbsp;&nbsp;Lorem ipsum&nbsp;&nbsp;Lorem ipsum&nbsp;&nbsp;Lorem ipsum&nbsp;&nbsp;</li>\n</ul>\n",
    //       "link": "festivalgyn",
    //       "site": null,
    //       "ratingCompra": null,
    //       "tipoDeCodigo": null,
    //       "exibirNumeroDoBilhete": true,
    //       "qtdDigitosNumeroDoBilhete": 5,
    //       "vendaOffline": true,
    //       "enviouCarga": null,
    //       "possuiLogoRodape": false,
    //       "buscavel": true,
    //       "idExterno": null,
    //       "linkExtra": null,
    //       "cancelado": null,
    //       "encerrado": null,
    //       "valorTaxaIncluso": false,
    //       "layoutZebra": null,
    //       "utilizadoresPorCpf": null,
    //       "trackId": null,
    //       "sobretaxar": null,
    //       "ultimaSincronizacao": null,
    //       "erroSincronizacao": null,
    //       "produtor": {
    //         "tipo": "juridica",
    //         "nome": "UZER EVENTOS LTDA",
    //         "email": null,
    //         "telefone": "08006440545",
    //         "links": {
    //           "0": {
    //             "fa": "fa-facebook-square",
    //             "tipo": "Facebook"
    //           },
    //           "1": {
    //             "fa": "fa-instagram",
    //             "tipo": "Instagram"
    //           },
    //           "2": {
    //             "fa": "fa-globe",
    //             "tipo": "Site",
    //             "editarUrl": false,
    //             "urlEdicao": "www.uzer.com.br",
    //             "url": "www.uzer.com.br"
    //           }
    //         },
    //         "foto": "https://uzerticket-imagens.s3.sa-east-1.amazonaws.com/images/produtores/dee31600-57b7-11ee-a768-bb97beaeb916.ebp",
    //         "cpf": null,
    //         "genero": null,
    //         "nomeDaMae": null,
    //         "estadoCivil": null,
    //         "cnpj": "62671628000176",
    //         "nomeFantasia": "UZER",
    //         "inscricaoEstadual": "105211010",
    //         "inscricaoMunicipal": "1111111111",
    //         "dataNascimento": null,
    //         "id": 2
    //       },
    //       "endereco": {
    //         "id": 26,
    //         "bairro": "Residencial Balneário",
    //         "cep": "74591005",
    //         "localidade": "Goiânia/GO",
    //         "complemento": null,
    //         "localizacao": "-16.6869544,-49.263175",
    //         "logradouro": "Rua Jardins Lorena",
    //         "nomeDoLugar": "Campos Party",
    //         "numero": "sn",
    //         "nomeCidade": "Goiânia/GO",
    //         "uf": null
    //       },
    //       "imagens": {
    //         "foto": {
    //           "tipo": "Foto",
    //           "link": "/images/evento/10/As-melhores-dicas-para-curtir-um-festival-1280x720.jpg",
    //           "top": null,
    //           "id": 26,
    //           "novoTamanho": 1
    //         },
    //         "capa": {
    //           "tipo": "Capa",
    //           "link": "/images/evento/10/As-melhores-dicas-para-curtir-um-festival-1280x720.890.jpg",
    //           "top": -106,
    //           "id": 27,
    //           "novoTamanho": 1
    //         },
    //         "minicapa": {
    //           "tipo": "MiniCapa",
    //           "link": "/images/evento/10/As-melhores-dicas-para-curtir-um-festival-1280x720.890.jpg",
    //           "top": null,
    //           "id": 59,
    //           "novoTamanho": 1
    //         }
    //       },
    //       "pontosDeVenda": [],
    //       "tags": [],
    //       "diasEvento": [
    //         {
    //           "dia": "2023-01-01",
    //           "horario": null,
    //           "id": 36
    //         },
    //         {
    //           "dia": "2023-01-05",
    //           "horario": null,
    //           "id": 37
    //         },
    //         {
    //           "dia": "2023-01-06",
    //           "horario": null,
    //           "id": 38
    //         },
    //         {
    //           "dia": "2023-01-07",
    //           "horario": null,
    //           "id": 39
    //         },
    //         {
    //           "dia": "2023-01-08",
    //           "horario": null,
    //           "id": 40
    //         },
    //         {
    //           "dia": "2023-01-10",
    //           "horario": null,
    //           "id": 41
    //         },
    //         {
    //           "dia": "2024-01-04",
    //           "horario": null,
    //           "id": 44
    //         },
    //         {
    //           "dia": "2024-01-05",
    //           "horario": null,
    //           "id": 45
    //         },
    //         {
    //           "dia": "2024-01-06",
    //           "horario": null,
    //           "id": 46
    //         },
    //         {
    //           "dia": "2024-01-11",
    //           "horario": null,
    //           "id": 47
    //         },
    //         {
    //           "dia": "2024-01-12",
    //           "horario": null,
    //           "id": 48
    //         },
    //         {
    //           "dia": "2024-01-13",
    //           "horario": null,
    //           "id": 49
    //         },
    //         {
    //           "dia": "2024-01-14",
    //           "horario": null,
    //           "id": 50
    //         }
    //       ],
    //       "setores": [],
    //       "horaInicio": "12:00",
    //       "dataDescricao": "01(Segunda-feira), janeiro/2024",
    //       "horaFim": "12:00",
    //       "restrito": false,
    //       "diasRestantes": 0,
    //       "foto": "/images/evento/10/As-melhores-dicas-para-curtir-um-festival-1280x720.jpg",
    //       "minicapa": "/images/evento/10/As-melhores-dicas-para-curtir-um-festival-1280x720.890.jpg",
    //       "capa": {
    //         "tipo": "Capa",
    //         "link": "/images/evento/10/As-melhores-dicas-para-curtir-um-festival-1280x720.890.jpg",
    //         "top": -106,
    //         "id": 27,
    //         "novoTamanho": 1
    //       },
    //       "fotoCapa": "/images/evento/10/As-melhores-dicas-para-curtir-um-festival-1280x720.890.jpg",
    //       "alturaFotoCapa": -106,
    //       "controlesDeEntrada": [],
    //       "reservas": []
    //     },
    //     {
    //       "id": 133,
    //       "nome": "BRASIL TICKET",
    //       "link": "brasil",
    //       "linkCompleto": "https://synpass.com.br/brasil",
    //       "dataRealizacao": "2024-02-10 10:00",
    //       "inicio": "Sábado, 10 de fevereiro de 2024",
    //       "horaInicio": "10:00",
    //       "tipo": "Evento",
    //       "endereco": "VIBRA SÃO PAULO -  Avenida das Nações Unidas  N° 17955, Vila Almeida São Paulo/SP - CEP: 04795100",
    //       "localizacao": "-16.6869544,-49.263175",
    //       "mapa": {
    //         "longitude": "-49.263175",
    //         "latitude": "-16.6869544"
    //       },
    //       "nomeDoLugar": "VIBRA SÃO PAULO",
    //       "localidade": "São Paulo/SP",
    //       "cep": "04795100",
    //       "estado": "SP",
    //       "imagens": {
    //         "foto": {
    //           "tipo": "Foto",
    //           "link": "/novasimages/b0c54690-95d7-11ee-afbf-d1e306bf0420.jpeg",
    //           "top": null,
    //           "id": 594,
    //           "novoTamanho": 1,
    //           "linkCompleto": "https://uzerticket-imagens.s3.sa-east-1.amazonaws.com/images/b0c54690-95d7-11ee-afbf-d1e306bf0420.jpeg"
    //         },
    //         "capa": {
    //           "tipo": "Destaque",
    //           "link": "/novasimages/9fd83cc0-95d7-11ee-a44e-f788c021d685.jpg",
    //           "top": null,
    //           "id": 597,
    //           "novoTamanho": 1,
    //           "linkCompleto": "https://uzerticket-imagens.s3.sa-east-1.amazonaws.com/images/9fd83cc0-95d7-11ee-a44e-f788c021d685.jpg"
    //         },
    //         "minicapa": {
    //           "tipo": "MiniCapa",
    //           "link": "/novasimages/856b8ef0-95d7-11ee-a44e-f788c021d685.jpeg",
    //           "top": null,
    //           "id": 596,
    //           "novoTamanho": 1,
    //           "linkCompleto": "https://uzerticket-imagens.s3.sa-east-1.amazonaws.com/images/856b8ef0-95d7-11ee-a44e-f788c021d685.jpeg"
    //         },
    //         "destaque": {
    //           "tipo": "Destaque",
    //           "link": "/novasimages/9fd83cc0-95d7-11ee-a44e-f788c021d685.jpg",
    //           "top": null,
    //           "id": 597,
    //           "novoTamanho": 1,
    //           "linkCompleto": "https://uzerticket-imagens.s3.sa-east-1.amazonaws.com/images/9fd83cc0-95d7-11ee-a44e-f788c021d685.jpg"
    //         },
    //         "mobiledestaque": {
    //           "tipo": "MobileDestaque",
    //           "link": "/novasimages/a44ed0c0-95d7-11ee-ad11-f934783a88b0.jpeg",
    //           "top": null,
    //           "id": 598,
    //           "novoTamanho": 1,
    //           "linkCompleto": "https://uzerticket-imagens.s3.sa-east-1.amazonaws.com/images/a44ed0c0-95d7-11ee-ad11-f934783a88b0.jpeg"
    //         }
    //       },
    //       "foto": "/novasimages/b0c54690-95d7-11ee-afbf-d1e306bf0420.jpeg",
    //       "capa": {
    //         "tipo": "Destaque",
    //         "link": "/novasimages/9fd83cc0-95d7-11ee-a44e-f788c021d685.jpg",
    //         "top": null,
    //         "id": 597,
    //         "novoTamanho": 1,
    //         "linkCompleto": "https://uzerticket-imagens.s3.sa-east-1.amazonaws.com/images/9fd83cc0-95d7-11ee-a44e-f788c021d685.jpg"
    //       },
    //       "minicapa": "/novasimages/856b8ef0-95d7-11ee-a44e-f788c021d685.jpeg",
    //       "prioridade": 1,
    //       "rotativo": false,
    //       "fixo": false,
    //       "bipshow": true,
    //       "bipfut": false
    //     },
    //     {
    //       "id": 45,
    //       "nome": "PALESTRA UZER",
    //       "link": "palestra",
    //       "linkCompleto": "https://synpass.com.br/palestra",
    //       "dataRealizacao": "2024-04-30 20:00",
    //       "inicio": "Terça-feira, 30 de abril de 2024",
    //       "horaInicio": "20:00",
    //       "tipo": "Evento",
    //       "categoria": {
    //         "nome": "Palestras e workshops",
    //         "id": 24
    //       },
    //       "endereco": "Metropolitan -  Avenida Deputado Jamel Cecílio  N° 2690, Jardim Goiás Goiânia/GO - CEP: 74810100",
    //       "localizacao": "-16.6869544,-49.263175",
    //       "mapa": {
    //         "longitude": "-49.263175",
    //         "latitude": "-16.6869544"
    //       },
    //       "nomeDoLugar": "Metropolitan",
    //       "localidade": "Goiânia/GO",
    //       "cep": "74810100",
    //       "estado": "GO",
    //       "imagens": {
    //         "foto": {
    //           "tipo": "Foto",
    //           "link": "/novasimages/evento/45/9110a010-1698-11ee-a63c-41847d9b3938.png",
    //           "top": null,
    //           "id": 193,
    //           "novoTamanho": 1,
    //           "linkCompleto": "https://uzerticket-imagens.s3.sa-east-1.amazonaws.com/images/evento/45/9110a010-1698-11ee-a63c-41847d9b3938.png"
    //         },
    //         "capa": {
    //           "tipo": "Destaque",
    //           "link": "/novasimages/evento/45/85fd63c0-1698-11ee-88d0-af58e846292c.png",
    //           "top": null,
    //           "id": 196,
    //           "novoTamanho": 1,
    //           "linkCompleto": "https://uzerticket-imagens.s3.sa-east-1.amazonaws.com/images/evento/45/85fd63c0-1698-11ee-88d0-af58e846292c.png"
    //         },
    //         "minicapa": {
    //           "tipo": "MiniCapa",
    //           "link": "/novasimages/evento/45/8100d6e0-1698-11ee-b75d-21b5a730a128.png",
    //           "top": null,
    //           "id": 195,
    //           "novoTamanho": 1,
    //           "linkCompleto": "https://uzerticket-imagens.s3.sa-east-1.amazonaws.com/images/evento/45/8100d6e0-1698-11ee-b75d-21b5a730a128.png"
    //         },
    //         "destaque": {
    //           "tipo": "Destaque",
    //           "link": "/novasimages/evento/45/85fd63c0-1698-11ee-88d0-af58e846292c.png",
    //           "top": null,
    //           "id": 196,
    //           "novoTamanho": 1,
    //           "linkCompleto": "https://uzerticket-imagens.s3.sa-east-1.amazonaws.com/images/evento/45/85fd63c0-1698-11ee-88d0-af58e846292c.png"
    //         },
    //         "mobiledestaque": {
    //           "tipo": "MobileDestaque",
    //           "link": "/novasimages/evento/45/8c272600-1698-11ee-a121-112e1d15c4aa.png",
    //           "top": null,
    //           "id": 197,
    //           "novoTamanho": 1,
    //           "linkCompleto": "https://uzerticket-imagens.s3.sa-east-1.amazonaws.com/images/evento/45/8c272600-1698-11ee-a121-112e1d15c4aa.png"
    //         }
    //       },
    //       "foto": "/novasimages/evento/45/9110a010-1698-11ee-a63c-41847d9b3938.png",
    //       "capa": {
    //         "tipo": "Destaque",
    //         "link": "/novasimages/evento/45/85fd63c0-1698-11ee-88d0-af58e846292c.png",
    //         "top": null,
    //         "id": 196,
    //         "novoTamanho": 1,
    //         "linkCompleto": "https://uzerticket-imagens.s3.sa-east-1.amazonaws.com/images/evento/45/85fd63c0-1698-11ee-88d0-af58e846292c.png"
    //       },
    //       "minicapa": "/novasimages/evento/45/8100d6e0-1698-11ee-b75d-21b5a730a128.png",
    //       "prioridade": 1,
    //       "rotativo": false,
    //       "fixo": false,
    //       "bipshow": true
    //     }
    //   ],
    //   "total": 2
    // } as EventosResponse
  },
};
