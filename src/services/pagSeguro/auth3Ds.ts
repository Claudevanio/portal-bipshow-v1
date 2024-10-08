import { AddressProps, CreateSessionPagSeguro, IUser, TypePaymentCardProps } from '@/types';
import { states } from '@/shared/config/states';
export type CartaoProps = {
  endereco?: AddressProps;
  numero: string;
  mes: string;
  ano: string;
  nome: string;
  authenticationId?: string;
};

export type PedidoProps = {
  usuario: IUser;
  total: number;
};

export type Callback = (result?: { id: string }, err?: any) => void;

export function auth3Ds(
  cartao: CartaoProps,
  pedido: PedidoProps,
  tipoPagamento: TypePaymentCardProps,
  installments: number,
  sessionPayment: CreateSessionPagSeguro,
  callback: Callback
) {
  debugger;
  const customer = pedido.usuario;
  const { telefone } = customer;
  const isCartao = cartao;
  const { endereco: enderecoCobranca } = isCartao;
  const isStates = states.find(i => i.estado === enderecoCobranca?.estado);
  const telefoneFormatted = telefone?.replace('(', '').replace(')', '').replace(' ', '').replace('-', '');
  const numero = Number(isCartao.numero.trim().replace(/\s/g, ''));
  const request = {
    data: {
      customer: {
        name: customer.nome,
        email: customer.email,
        phones: [
          {
            country: '55',
            area: telefoneFormatted?.substring(0, 2),
            number: telefoneFormatted?.substring(2),
            type: 'MOBILE'
          }
        ]
      },
      paymentMethod: {
        type: tipoPagamento,
        installments: installments ?? 1,
        card: {
          number: numero,
          expMonth: isCartao.mes,
          expYear: +isCartao.ano > 2000 ? isCartao.ano : +`20${isCartao.ano}`,
          holder: {
            name: isCartao.nome
          }
        }
      },
      amount: {
        value: parseFloat((pedido.total * 100).toFixed(2)),
        currency: 'BRL'
      },
      billingAddress: {
        street: enderecoCobranca?.bairro,
        number: enderecoCobranca?.numero && enderecoCobranca?.numero !== 'S/N' ? Number(enderecoCobranca?.numero) : 0,
        complement: enderecoCobranca?.complemento,
        regionCode: enderecoCobranca?.localidade ? enderecoCobranca?.localidade.split('/')[1] : enderecoCobranca?.localidade ?? isStates?.uf,
        country: 'BRA',
        city: enderecoCobranca?.nomeCidade ?? enderecoCobranca?.cidade,
        postalCode: enderecoCobranca?.cep ? Number(enderecoCobranca?.cep?.replace('-', '')) : enderecoCobranca?.cep
      },
      dataOnly: false
    }
  };

  // @ts-ignore: Unreachable code error
  PagSeguro.setUp({
    session: sessionPayment.session,
    // @ts-ignore: Unreachable code error
    env: PagSeguro.env.PROD
  });
  // @ts-ignore: Unreachable code error
  PagSeguro.authenticate3DS(request)
    .then(result => {
      callback(result);
    })
    .catch((err: any) => {
      if (err) {
        callback(undefined, err.detail);
      }
    });
}
