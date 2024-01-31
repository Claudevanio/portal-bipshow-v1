import React from 'react';
import { useEventTicket } from '@/shared/hooks/useEventTicket';
import { ContainerCardTicket } from './styles';
import { ICardTicket } from './interface';

export const CardTicket: React.FC<ICardTicket> = ({
  valorVenda, index = 0, nome,
}) => {
  const { handleSelectTicket } = useEventTicket();

  return (
    <ContainerCardTicket onClick={() => handleSelectTicket(index)}>
      {nome && (
        nome?.split(' ').length <= 0 ? (
          <div className="date">
            <h6 className="name-extends">
              {nome}
            </h6>
          </div>
        ) : (
          <div className="date">
            <h6 className={`${nome.split(' ').length <= 2 && !nome.split(' ')[0].split('/')[1] ? 'two' : ''}`}>
              {nome.split(' ')[0].split('/')[0]}
              {nome.split(' ').length === 2 && !nome.split(' ')[0].split('/')[1] && (
                ` ${nome.split(' ')[1]}`
              )}
            </h6>
            {nome.split(' ')[0].split('/')[1] && (
            <div className="month">
              <span className="month">
                /
                {nome.split(' ')[0].split('/')[1]}
              </span>
              <span className="day-extend">
                {String(nome.split(' ')[1]).replace('(', '').replace(')', '')}
              </span>
            </div>
            )}
          </div>
        )
      )}
      <div className="price">
        {valorVenda && (
        <p className="text-dark">
            {valorVenda.length > 1
              && `Preço entre
              ${valorVenda[0].toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                style: 'currency',
                currency: 'BRL',
              })} e ${valorVenda[valorVenda.length - 1].toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                style: 'currency',
                currency: 'BRL',
              })}`}
            {valorVenda.length <= 1 && `Preço de ${valorVenda[0].toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              style: 'currency',
              currency: 'BRL',
            })}`}
        </p>
        )}
      </div>
      <div className="icon">
        <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.7733 15.5536L14.1199 9.90026C13.996 9.77529 13.8485 9.67609 13.686 9.6084C13.5235 9.54071 13.3493 9.50586 13.1733 9.50586C12.9972 9.50586 12.823 9.54071 12.6605 9.6084C12.498 9.67609 12.3505 9.77529 12.2266 9.90026C11.9783 10.1501 11.8389 10.488 11.8389 10.8403C11.8389 11.1925 11.9783 11.5304 12.2266 11.7803L16.9466 16.5003L12.2266 21.2203C11.9783 21.4701 11.8389 21.808 11.8389 22.1603C11.8389 22.5125 11.9783 22.8504 12.2266 23.1003C12.3512 23.2238 12.4989 23.3216 12.6614 23.388C12.8238 23.4543 12.9978 23.4879 13.1733 23.4869C13.3487 23.4879 13.5227 23.4543 13.6851 23.388C13.8476 23.3216 13.9953 23.2238 14.1199 23.1003L19.7733 17.4469C19.8982 17.323 19.9974 17.1755 20.0651 17.013C20.1328 16.8505 20.1677 16.6763 20.1677 16.5003C20.1677 16.3242 20.1328 16.15 20.0651 15.9875C19.9974 15.825 19.8982 15.6775 19.7733 15.5536Z" fill="black" fillOpacity="0.38" />
        </svg>
      </div>
    </ContainerCardTicket>
  );
};
