import React from 'react';
import { ContainerOrders } from './styles';
import { Empty } from '@/components/Empty';
import { useOrders } from '@/shared/hooks/useOrders';
import { Card } from './Card';
import { EventTicketProvider } from '@/shared/hooks';
import { InfoTicket } from './InfoTicket';
export const Orders: React.FC = () => {
  const { ticketsUser, handleSelectInfoTicket, infoTicket } = useOrders();

  return (
    <ContainerOrders>
      <div className="title mobile">
        <h6 className="title">Minhas compras</h6>
      </div>
      {ticketsUser.length <= 0 && (
        <div className="empty">
          <Empty text="Você não possuí compras feitas." />
        </div>
      )}
      {ticketsUser &&
        !infoTicket &&
        ticketsUser.length > 0 &&
        ticketsUser.map(item => {
          if (item.status === 'ATIVO') {
            return (
              <div className="active" key={item.status}>
                <h6 className="title">Ativos</h6>
                <ul>
                  {item.items.map(i => (
                    <Card
                      onClick={() => handleSelectInfoTicket(i.id, i.evento.id)}
                      active
                      key={i.id}
                      tickets={{
                        address: `${i.evento.endereco}`,
                        date: i.evento.dataRealizacao || '',
                        foto: `${process.env.URL_API}${i.evento.foto}`,
                        name: i.evento.nome || ''
                      }}
                      idEvento={i.evento.id}
                    />
                  ))}
                </ul>
              </div>
            );
          }
          if (item.status === 'CONCLUIDO') {
            return (
              <div className="active" key={item.status}>
                <h6 className="title">Utilizados</h6>
                <ul>
                  {item.items.length === 0 && <Empty text="Você não possuí pedidos utilizados." />}
                  {item.items.map(i => (
                    <Card
                      onClick={() => handleSelectInfoTicket(i.id, i.evento.id)}
                      active
                      key={i.id}
                      tickets={{
                        address: `${i.evento.endereco}`,
                        date: i.evento.dataRealizacao || '',
                        foto: `${process.env.URL_API}${i.evento.foto}`,
                        name: i.evento.nome || ''
                      }}
                      idEvento={i.evento.id}
                    />
                  ))}
                </ul>
              </div>
            );
          }
          // if (item.status === 'AGUARDANDO') {
          //   return (
          //     <div className="active" key={item.status}>
          //       <h6 className="title">Aguardando</h6>
          //       <ul>
          //         {item.items.map((i) => (
          //           <Card
          //             onClick={() => handleSelectInfoTicket(i.id, i.evento.id)}
          //             active
          //             key={i.id}
          //             tickets={{
          //               address: `${i.evento.endereco}`,
          //               date: i.evento.dataRealizacao || '',
          //               foto: `${process.env.URL_API}${i.evento.foto}`,
          //               name: i.evento.nome || '',
          //             }}
          //             idEvento={i.evento.id}
          //           />
          //         ))}
          //       </ul>
          //     </div>
          //   );
          // }
          if (item.status === 'CANCELADO' && item.items.length > 0) {
            return (
              <div className="disabled" key={item.status}>
                <h6 className="title">Cancelados</h6>
                <ul>
                  {item.items.map(i => (
                    <Card
                      onClick={() => handleSelectInfoTicket(i.id, i.evento.id)}
                      key={i.id}
                      tickets={{
                        address: `${i.evento.endereco}`,
                        date: i.evento.dataRealizacao || '',
                        foto: `${process.env.URL_API}${i.evento.foto}`,
                        name: i.evento.nome || ''
                      }}
                      idEvento={i.evento.id}
                    />
                  ))}
                </ul>
              </div>
            );
          }
          if (item.items.length <= 0) {
            return <></>;
          }
          return (
            <div className="disabled" key={item.status}>
              <h6 className="title first-letter:uppercase">{item.status}</h6>
              <ul>
                {item.items.map(i => (
                  <Card
                    onClick={() => handleSelectInfoTicket(i.id, i.evento.id)}
                    key={i.id}
                    tickets={{
                      address: `${i.evento.endereco}`,
                      date: i.evento.dataRealizacao || '',
                      foto: `${process.env.URL_API}${i.evento.foto}`,
                      name: i.evento.nome || ''
                    }}
                    idEvento={i.evento.id}
                  />
                ))}
              </ul>
            </div>
          );
        })}
      {infoTicket && (
        <EventTicketProvider>
          <InfoTicket />
        </EventTicketProvider>
      )}
    </ContainerOrders>
  );
};
