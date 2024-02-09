import React from 'react';
import { useTickets } from '@/shared/hooks/useTickets';
import { Empty } from '@/components/Empty';
import { Calendar } from '@/components/icons/Calendar'; 
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { Location } from '@/components/icons/Location';
import { ContainerInfoTicket, Image } from './styles';
import { Content } from './Content';
import { baseUrlImages } from '@/constants';

export const InfoTicket: React.FC = () => {
  const { infoTicket, handleClearInfoTicket } = useTickets();

  return (
    infoTicket ? (
      <ContainerInfoTicket>
        <button className="back" type="button" onClick={handleClearInfoTicket}>
          <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.02667 7.99915L10.3867 5.63915C10.5108 5.51424 10.5805 5.34528 10.5805 5.16915C10.5805 4.99303 10.5108 4.82406 10.3867 4.69915C10.3247 4.63667 10.251 4.58707 10.1697 4.55322C10.0885 4.51938 10.0013 4.50195 9.91334 4.50195C9.82533 4.50195 9.73819 4.51938 9.65695 4.55322C9.57571 4.58707 9.50198 4.63667 9.44 4.69915L6.61334 7.52582C6.55085 7.58779 6.50125 7.66153 6.46741 7.74277C6.43356 7.82401 6.41614 7.91114 6.41614 7.99915C6.41614 8.08716 6.43356 8.1743 6.46741 8.25554C6.50125 8.33678 6.55085 8.41051 6.61334 8.47249L9.44 11.3325C9.5023 11.3943 9.57617 11.4432 9.6574 11.4763C9.73862 11.5095 9.8256 11.5263 9.91334 11.5258C10.0011 11.5263 10.088 11.5095 10.1693 11.4763C10.2505 11.4432 10.3244 11.3943 10.3867 11.3325C10.5108 11.2076 10.5805 11.0386 10.5805 10.8625C10.5805 10.6864 10.5108 10.5174 10.3867 10.3925L8.02667 7.99915Z" fill="#2C2E2FB2" />
          </svg>
          <p className="!text-textPrimary">Voltar</p>
        </button>
        <div className="header">           
          <div className="flex flex-col w-full">
            <div
              className="w-full h-80 rounded-xl hidden md:block object-cover"
              style={{
                backgroundImage: `url(${infoTicket.evento.imagens[1].link && infoTicket.evento.imagens[1].link[0] === "/" ? baseUrlImages + infoTicket.evento.imagens[1].link : infoTicket.evento.imagens[1].link})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundClip: "border-box",
              }}
            ></div>
            <img 
              src={infoTicket.evento.imagens[1].link && infoTicket.evento.imagens[1].link[0] === "/" ? baseUrlImages + infoTicket.evento.imagens[1].link : infoTicket.evento.imagens[1].link}
              alt="Evento"
              className="w-full rounded-xl h-80 object-fill md:hidden"
              /> 
          </div>
          {/* <Image image={`${process.env.URL_API}${infoTicket.evento.imagens[1].link}`} /> */}
          {/* <div className="date">
            <Calendar width={20} height={20} color={'#39474F'} />
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
          </div> */}
          
          <div className="flex flex-col text-textPrimary w-full mt-4">
            <h1 className="text-2xl font-medium">{infoTicket.evento?.nome}</h1>
            <p className="font-medium text-sm">
                {infoTicket.evento.endereco}
            </p>
            <p className="font-medium text-sm">
              {infoTicket.evento.dataRealizacao && format(new Date(infoTicket.evento.dataRealizacao), 'HH:mm', {
                locale: ptBR as any,
              })}
            </p>
            <p className="font-medium text-sm">
              {infoTicket.evento.dataRealizacao && format(new Date(infoTicket.evento.dataRealizacao), 'EEEE, dd/LL', {
                locale: ptBR as any,
              })}
            </p>
          </div>
          {/* <div className="address">
            <Location width={24} height={24} color={'#39474F'} />
            <p className="text-light">{infoTicket.evento.endereco as string}</p>
          </div> */}
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