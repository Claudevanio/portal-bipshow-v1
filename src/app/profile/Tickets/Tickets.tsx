import React, { useEffect } from 'react';
import { Ticket } from '@/components/icons/Ticket';
import { Empty } from '@/components/Empty';
import { EventTicketProvider } from '@/shared/hooks/useEventTicket';
import { useTickets } from '@/shared/hooks/useTickets';
import { ContainerTickets } from './styles';
import { Card } from './Card';
import { InfoTicket } from './InfoTicket';
import { ITicketPurchaseConfirmationUser } from '@/types';
import { GET_TICKETS_TRANSFEREDS, apiTokeUser } from '@/services';
import { QrCode } from '@mui/icons-material';
import dayjs from 'dayjs';
import { TELEFONEMask } from '@/shared';
import QRCode from 'qrcode.react';

export const Tickets: React.FC = () => {
  const { ticketsUser, handleSelectInfoTicket, infoTicket, ticketsUserCanceled } = useTickets();

  const [currentTab, setCurrentTab] = React.useState(0);

  const [transfers, setTransfers] = React.useState<ITicketPurchaseConfirmationUser[] | undefined>(undefined);

  useEffect(() => {
    async function getTransfers() {
      const response = await apiTokeUser.get(`${GET_TICKETS_TRANSFEREDS}`);
      setTransfers(response.data?.transferencias);
    }
    getTransfers();
  }, []);

  return (
    <ContainerTickets>
      <div className="flex gap-4 items-center font-medium text-textPrimary">
        <Ticket width={24} height={24} color={'#8779F8'} fillOpacity />
        <h6 className="title text-xl font-bold">Meus ingressos</h6>
      </div>
      {!infoTicket && (
        <div className="flex gap-2 mt-8 items-center w-full border-b-2 border-gray pb-2 font-medium">
          <p
            className={`cursor-pointer border-r-2 border-gray pr-2 ${currentTab === 0 ? 'text-[#2EB518]' : 'text-textPrimary'}`}
            onClick={() => setCurrentTab(0)}
          >
            Ativos
          </p>
          <p
            className={`cursor-pointer border-r-2 pl-2 border-gray pr-2 ${currentTab === 1 ? 'text-[#2EB518]' : 'text-textPrimary'}`}
            onClick={() => setCurrentTab(1)}
          >
            Encerrados
          </p>
          <p className={`cursor-pointer pl-2 ${currentTab === 2 ? 'text-[#2EB518]' : 'text-textPrimary'}`} onClick={() => setCurrentTab(2)}>
            Tranferidos
          </p>
        </div>
      )}

      {ticketsUser.length <= 0 && currentTab === 0 && (
        <div className="empty">
          <Empty text="Você não possuí ingressos ativos." />
        </div>
      )}
      {ticketsUserCanceled.length <= 0 && currentTab === 1 && (
        <div className="empty">
          <Empty text="Você não possuí ingressos encerrados." />
        </div>
      )}
      {transfers && transfers.length <= 0 && currentTab === 2 && (
        <div className="empty">
          <Empty text="Você não possuí ingressos transferidos." />
        </div>
      )}

      {ticketsUser.length > 0 && currentTab === 0 && (
        <React.Fragment>
          <ul className="list-tickets">
            {ticketsUser &&
              !infoTicket &&
              ticketsUser.length > 0 &&
              ticketsUser.map(item => (
                <Card
                  key={item.id}
                  onClick={() => handleSelectInfoTicket(item.id, item.evento.id)}
                  active
                  tickets={{
                    address: `${item.evento.endereco}`,
                    date: item.evento.dataRealizacao || '',
                    foto: `${process.env.URL_API}${item.evento.imagens[0].link}`,
                    name: item.evento.nome || ''
                  }}
                  idEvento={item.evento.id}
                />
              ))}
          </ul>
        </React.Fragment>
      )}
      {ticketsUserCanceled.length > 0 && currentTab === 1 && (
        <React.Fragment>
          <ul className="list-tickets">
            {ticketsUserCanceled &&
              !infoTicket &&
              ticketsUserCanceled.length > 0 &&
              ticketsUserCanceled.map(item => (
                <Card
                  key={item.id}
                  canceled={true}
                  onClick={() => handleSelectInfoTicket(item.id, item.evento.id)}
                  active={false}
                  tickets={{
                    address: `${item.evento.endereco}`,
                    date: item.evento.dataRealizacao || '',
                    foto: `${process.env.URL_API}${item.evento.imagens[1].link}`,
                    name: item.evento.nome || ''
                  }}
                  idEvento={item.evento.id}
                />
              ))}
          </ul>
        </React.Fragment>
      )}
      {
        <div
          className=" flex-col w-full gap-8 pt-4"
          style={{
            display: currentTab === 2 ? 'flex' : 'none'
          }}
        >
          {transfers ? (
            transfers.length > 0 &&
            transfers.map((value: any, index: number) => {
              return (
                <div>
                  {
                    <div className="flex flex-col gap-4 md:flex-row font-medium w-full border-l-2 border-gray pl-6 md:pl-2 ">
                      <div className="flex md:hidden justify-between w-full text-textPrimary text-sm md:text-base">
                        {value.evento?.link}
                        <p className="md:hidden">
                          {dayjs(value.evento?.dataRealizacao).format('DD/MM/YYYY')} {dayjs(value.evento?.dataRealizacao).format('HH:mm')}
                        </p>
                      </div>
                      <div className="flex gap-4 w-full items-center">
                        {/* {
                                value.comValidacaoFacial ? 
                                <svg width="120" height="120" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path fillRule="evenodd" clipRule="evenodd" d="M5.81815 5H10.679V6.64292H6.64347V10.7337H5V5.81815C5 5.37153 5.37098 5 5.81815 5ZM21.3215 5H26.1824C26.629 5 27.0005 5.37098 27.0005 5.81815V10.727H25.3576V6.64347H21.3149V5H21.3215ZM21.2663 25.3571H25.3571V21.3144H27V26.1752C27 26.629 26.629 26.9934 26.1818 26.9934H21.273V25.3571H21.2663ZM5 21.2663H6.64292V25.3571H10.6856V27H5.81815C5.37153 27 5 26.629 5 26.1819V21.2663Z" fill="#05B59D" />
                                  <path fillRule="evenodd" clipRule="evenodd" d="M19.4718 18.8131C19.6507 18.4764 20.0631 18.3455 20.3998 18.5244C20.7366 18.6961 20.8674 19.1156 20.6885 19.4524C19.781 21.1919 17.9934 22.2778 16.027 22.2778C14.0539 22.2778 12.273 21.1985 11.3588 19.4524C11.1871 19.1156 11.3108 18.6961 11.6541 18.5244C11.9909 18.3455 12.4105 18.4764 12.5822 18.8131C13.2557 20.1055 14.5762 20.9032 16.0264 20.9032C17.4778 20.9032 18.7978 20.0988 19.4718 18.8131ZM15.3673 18.0159H17.1962C17.5744 18.0159 17.8835 17.7068 17.8835 17.3286C17.8835 16.9505 17.5744 16.6413 17.1962 16.6413H16.0551V14.2482C16.0551 13.87 15.746 13.5608 15.3678 13.5608C14.9897 13.5608 14.6805 13.87 14.6805 14.2482V17.3281C14.6794 17.7134 14.9819 18.0159 15.3673 18.0159ZM11.9092 11.1478C12.5695 11.1478 13.1055 11.6838 13.1055 12.3441C13.1055 13.0044 12.5695 13.5404 11.9092 13.5404C11.2489 13.5404 10.7129 13.0044 10.7129 12.3441C10.7129 11.6838 11.2489 11.1478 11.9092 11.1478ZM18.901 12.3369C18.901 11.6767 19.437 11.1406 20.0973 11.1406C20.7576 11.1406 21.2936 11.6767 21.2936 12.3369C21.2936 12.9972 20.7576 13.5332 20.0973 13.5332C19.437 13.5332 18.901 12.9972 18.901 12.3369Z" fill="#141515" />
                                </svg> : <QRCode
                                  value={value}
                                /> 
                                } */}
                        {
                          <div
                            style={{
                              backgroundImage: `url(${value.evento.imagens[0].link})`,
                              backgroundSize: '100%',
                              backgroundPosition: 'center',
                              width: '96px',
                              height: '80px',
                              borderRadius: '16px',
                              backgroundRepeat: 'no-repeat'
                            }}
                          />
                        }
                        <div className="flex flex-col gap-2 w-full justify-between text-sm">
                          <p className="text-textPrimary hidden md:block">{value.evento?.nome ?? value.evento?.link}</p>
                          <p className="text-textPrimary flex items-center justify-between w-full">
                            Transferido para:
                            <p className="hidden md:block">
                              {dayjs(value.dataTransferencia).format('DD/MM/YYYY')} {dayjs(value.dataTransferencia).format('HH:mm')}
                            </p>
                          </p>
                          <div className="flex flex-col gap-3">
                            <p className="text-tertiary">{value.destinatario.nome}</p>
                            <p>{TELEFONEMask(value.destinatario.telefone)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              );
            })
          ) : (
            <p className="px-8 text-center">Falha ao carregar dados</p>
          )}
        </div>
      }
      {infoTicket && (
        <EventTicketProvider>
          <InfoTicket />
        </EventTicketProvider>
      )}
    </ContainerTickets>
  );
};
