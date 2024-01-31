import React from 'react';
import { Button } from '@/components';
import { useEventTicket } from '@/shared/hooks/useEventTicket';
import { ContainerTicket } from './styles';
import { Action } from './Action';
import { ITicketComponent } from './interface';

export const Ticket: React.FC<ITicketComponent> = ({ data, type }) => {
  const { handleClearTicket, ticketFormatted } = useEventTicket();

  return (
    <ContainerTicket>
      {type === 'normal' && (
        <div className="header-ticket">
          <div className="date">
            {data.nome && (
              data.nome.split(' ').length <= 0 ? (
                <h6>{data.nome}</h6>
              ) : (
                <>
                  <h6 className={`${data.nome.split(' ').length <= 2 && !data.nome.split(' ')[0].split('/')[1] ? 'two' : ''}`}>
                    {data.nome.split(' ')[0].split('/')[0]}
                    {data.nome.split(' ').length === 2 && !data.nome.split(' ')[0].split('/')[1] && (
                      ` ${data.nome.split(' ')[1]}`
                    )}
                  </h6>
                  <div className="month">
                    {data.nome.split(' ')[0].split('/')[1] && (
                    <span className="month">
                      /
                      {data.nome.split(' ')[0].split('/')[1]}
                    </span>
                    )}
                    {data.nome.split(' ')[0].split('/')[1] && (
                    <span className="day-extend">
                      {String(data.nome.split(' ')[1]).replace('(', '').replace(')', '')}
                    </span>
                    )}
                  </div>
                </>
              )
            )}
          </div>
          {ticketFormatted && ticketFormatted.length > 1 && (
          <Button variant='secondary' onClick={handleClearTicket}>
            Ver outros ingressos
          </Button>
          )}
        </div>
      )}
      {data.tiposDeIngresso.map((item, index) => (
        <Action key={item.nome} nome={item.nome} limitePorUsuario={item.limitePorUsuario} totalDisponivel={item.totalDisponivel} qtd={item.qtde} taxaFixa={item.taxaFixa} taxaServico={item.taxaServico} valor={item.valorUnitario} taxaConveniencia={item.taxaConveniencia} id={item.id} tipo={item.tipo} index={index} mapa={item.mapa} description={item.descricao} mesas={item.mesas} valoresPorFormaPagamento={item.valoresPorFormaPagamento} exibirTaxaSomada={item.exibirTaxaSomada} />
      ))}
    </ContainerTicket>
  );
};
