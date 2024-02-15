import React, { useEffect } from 'react';
import { useOrders } from '@/shared/hooks/useOrders';
import { Empty } from '@/components/Empty';
import { Calendar } from '@/components/icons/Calendar'; 
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Location } from '@/components/icons/Location';
import { useEventTicket } from '@/shared/hooks/useEventTicket';
import { ITicketPurchase } from '@/types';
import { useRegister } from '@/shared/hooks/useRegister';
import { TicketPurchaseProvider } from '@/shared/hooks/useTicketPurchase';
import { Offcanvas } from 'react-bootstrap';
import { Purchase } from '@/components/Purchase';
import { ContainerInfoTicket, Image } from './styles';
import { Content } from './Content';
import { api } from '@/services';
import { baseUrlImages } from '@/constants';

export const InfoTicket: React.FC = () => {
  const { infoTicket, handleClearInfoTicket } = useOrders();
  const {
    setIsTickets, eventTicket, ticketsPurchase, showPurchase, handleCloseModal, setIsGuidePurchase,
  } = useEventTicket();
  const { user } = useRegister();

  useEffect(() => {
    const tickets = [] as ITicketPurchase[];
    if (infoTicket) {
      infoTicket.ingressos.forEach((item, index) => {
        tickets.push({
          ehMeia: item.ehMeia,
          id: item.tipoDeIngresso.id,
          index,
          qtde: item.qtde,
          valor: infoTicket.valor,
          isTables: item.tipoDeIngresso.mesas ? item.tipoDeIngresso.mesas : undefined,
          nome: item.tipoDeIngresso.nome,
          singleId: `${item.tipoDeIngresso.nome}${index}`,
          user,
        });
      });
      setIsGuidePurchase({
        guide: infoTicket.guid,
        id: infoTicket.id,
      });
    }
    setIsTickets(tickets);
  }, [infoTicket, user, setIsTickets, setIsGuidePurchase]);

  const [ticketData, setTicketData] = React.useState<any>();

  const fetchTicketData = async () => {
    if(infoTicket) {
      console.log(infoTicket.evento.id)
      const response = await api.get(`/rest/v1/eventos/${infoTicket.evento.id}/online`);
      setTicketData(response.data);
    }
  }

  useEffect(() => {
    if (infoTicket) {
      fetchTicketData();
    }
  }, [infoTicket]);

  const imageURL = ticketData?.capa?.link && ticketData?.capa?.link[0] === "/" ? baseUrlImages + ticketData?.capa?.link : ticketData?.capa?.link;

  const imageMobileURL  = ticketData?.imagens?.minicapa?.link && ticketData?.imagens?.minicapa?.link[0] === "/" ? baseUrlImages + ticketData?.imagens?.minicapa?.link : ticketData?.imagens?.minicapa?.link;

  return (
    infoTicket ? (
      <ContainerInfoTicket>
        {eventTicket && ticketsPurchase && ticketsPurchase.length > 0 && (
        <TicketPurchaseProvider>
          <Offcanvas show={showPurchase} onHide={handleCloseModal} backdrop="static" placement="bottom" style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden' }} keyboard>
            <Purchase handleClose={handleCloseModal} />
          </Offcanvas>
        </TicketPurchaseProvider>
        )}
        <button className="back" type="button" onClick={handleClearInfoTicket}>
          <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.02667 7.99915L10.3867 5.63915C10.5108 5.51424 10.5805 5.34528 10.5805 5.16915C10.5805 4.99303 10.5108 4.82406 10.3867 4.69915C10.3247 4.63667 10.251 4.58707 10.1697 4.55322C10.0885 4.51938 10.0013 4.50195 9.91334 4.50195C9.82533 4.50195 9.73819 4.51938 9.65695 4.55322C9.57571 4.58707 9.50198 4.63667 9.44 4.69915L6.61334 7.52582C6.55085 7.58779 6.50125 7.66153 6.46741 7.74277C6.43356 7.82401 6.41614 7.91114 6.41614 7.99915C6.41614 8.08716 6.43356 8.1743 6.46741 8.25554C6.50125 8.33678 6.55085 8.41051 6.61334 8.47249L9.44 11.3325C9.5023 11.3943 9.57617 11.4432 9.6574 11.4763C9.73862 11.5095 9.8256 11.5263 9.91334 11.5258C10.0011 11.5263 10.088 11.5095 10.1693 11.4763C10.2505 11.4432 10.3244 11.3943 10.3867 11.3325C10.5108 11.2076 10.5805 11.0386 10.5805 10.8625C10.5805 10.6864 10.5108 10.5174 10.3867 10.3925L8.02667 7.99915Z" fill="#05B59D" />
          </svg>
          <p className="text-dark">Voltar</p>
        </button>
        <div className="header">
          <h5 className="title">{infoTicket.evento.nome}</h5>
          {/* <Image image={`${process.env.URL_API}${infoTicket.evento.foto}`} /> */}
          
          <div
              className="w-full h-80 rounded-xl hidden md:block object-cover"
              style={{
                backgroundImage: `url(${imageURL})`,
                backgroundSize: "100%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundClip: "border-box",
              }}
            ></div> 
            <img 
              src={imageMobileURL}
              alt="Evento"
              className="w-full rounded-xl h-80 object-fill md:hidden"
              />
          <div className="date">
            <Calendar width={20} height={20} color={'#000'} />
            <p className="text-dark">
              {infoTicket.evento.dataRealizacao && format(new Date(infoTicket.evento.dataRealizacao), 'EEEE, dd/LL', {
                locale: ptBR as any,
              })}
            </p>
            <p className="text-dark">
              ·
            </p>
            <p className="text-light">
              {infoTicket.evento.dataRealizacao && format(new Date(infoTicket.evento.dataRealizacao), 'HH:mm', {
                locale: ptBR as any,
              })}
            </p>
          </div>
          <div className="address">
            <Location width={36} height={36} color={'#bcbcbc'} />
            <p className="text-light">{infoTicket.evento.endereco as string}</p>
          </div>
        </div>
        <Content />
      </ContainerInfoTicket>
    ) : (
      <div className="empty">
        <Empty text="Nada encontado." />
      </div>
    )
  );
};
