"use client";
import { EventMockList } from "@/utils/event-mock";
import dayjs from "dayjs";
import Image from "next/image";
import ptBr from "dayjs/locale/pt-br";
import localizeFormat from "dayjs/plugin/localizedFormat";
import { Button, GradientBorder } from "@/components";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import Link from "next/link";
import { TicketsContainer } from "./components/TicketsContainer";
import { useState } from "react";
import { IEventProps } from "@/types";
import { eventosService } from "@/services";
import { useEffectOnce } from "@/hooks";
import { baseUrlImages } from "@/constants";
import { useEventTicket } from "@/shared/hooks";
import { useEvent } from "@/shared/hooks/useEvents";
import { ActionTicket, ActionTicketMap } from "@/components/Tickets";
import { TicketsContainerDefinido } from "./components/TicketsContainerDefinido";
import {
  TicketPurchaseProvider,
  useTicketPurchase,
} from "@/shared/hooks/useTicketPurchase";
import { Offcanvas } from "react-bootstrap";
import { Purchase } from "@/components/Purchase";
import { HTMLMap } from "@/components/Tickets/TicketMap/HTMLMap";

dayjs.locale(ptBr);
dayjs.extend(localizeFormat);

export default function EventoPage({ params }: { params: { id: string } }) {
  const currentEvent = EventMockList.find((event) => event.id === "133");

  const [evento, setEvento] = useState<IEventProps>();
  const { setIsEventTicket, eventTicket, rank } = useEventTicket();

  // async function fetchEvent(){
  //   try{
  //     if(!params.id) return
  //     const response = await eventosService.get(+params.id)
  //   } catch(error){
  //     console.log(error)
  //   }
  // }

  useEffectOnce(() => {
    // debugger
    // // @ts-ignore: Unreachable code error
    // console.log(Pagseguro)
    // fetchEvent()
  });

  const { amount } = useEventTicket();

  interface ILinkCalendarAdd {
    text?: string;
    dates: string;
    details?: string;
    location?: string;
  }

  const linkCalendarAdd = ({
    text,
    dates,
    details,
    location,
  }: ILinkCalendarAdd) => {
    return `http://www.google.com/calendar/event?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}&trp=false&sprop=&sprop=${text}`;
  };

  const [activeTab, setActiveTab] = useState<"info" | "tickets">("info");

  function handleClickShare() {
    if (navigator.share && document.location.origin) {
      navigator.share({
        url: `${document.location.origin}/evento/${eventTicket?.id}`,
        text: eventTicket?.descricaoTexto,
        title: eventTicket?.nome,
      });
    }
  }

  const { showPurchase, handleCloseModal, ticketsPurchase } = useEventTicket();

  return (
    <>
      {eventTicket && ticketsPurchase && showPurchase ? (
        <TicketPurchaseProvider>
          <Purchase handleClose={handleCloseModal} />
        </TicketPurchaseProvider>
      ) : (
        <div className="w-full flex flex-col gap-4 items-center justify-center p-8 md:px-24 xl:px-56 2xl:px-72 overflow-x-hidden">
          <div className="w-full text-start text-textPrimary">
            <Link className="flex items-center gap-1 w-fit" href="/">
              <KeyboardArrowLeft /> Voltar
            </Link>
          </div>
          
          <div className="flex flex-col w-full">
            <div
              className="w-full h-80 rounded-xl hidden md:block object-cover"
              style={{
                backgroundImage: `url(${eventTicket?.capa?.link && eventTicket?.capa?.link[0] === "/" ? baseUrlImages + eventTicket?.capa?.link : eventTicket?.capa?.link})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundClip: "border-box",
              }}
            ></div>
            <img 
              src={eventTicket?.capa?.link && eventTicket?.capa?.link[0] === "/" ? baseUrlImages + eventTicket?.capa?.link : eventTicket?.capa?.link}
              alt="Evento"
              className="w-full rounded-xl h-80 object-fill md:hidden"
              />
            {/* <Image
            className='w-full rounded-xl h-80 object-cover'
            src={''}
            alt="Evento"
            width={300}
            height={200}
          /> */}
          </div>
          
          <div className="flex flex-col text-textPrimary w-full">
            <h1 className="text-2xl font-medium">{eventTicket?.nome}</h1>
            <p className="font-medium text-sm">
              {`${eventTicket?.localidade?.replace("/", ", ")} - 
                ${evento?.nomeDoLugar ?? eventTicket?.nomeDoLugar}`}
            </p>
            <p className="font-medium text-sm">
              {dayjs(eventTicket?.dataRealizacao).locale(ptBr).format("HH:mm")}
            </p>
            <p className="font-medium text-sm">
              {dayjs(eventTicket?.dataRealizacao).locale(ptBr).format("LL")}
            </p>
          </div>

          <div className="flex items-center w-full gap-8 border-b-2 border-gray pb-2 md:hidden">
            <h4
              className={`text-sm flex items-center gap-2 font-medium cursor-pointer ${
                activeTab == "info" ? "text-primary" : "text-textPrimary"
              }`}
              onClick={() => setActiveTab("info")}
            >
              <Image
                className={`${activeTab == "info" ? "" : "brightness-0"}`}
                src={"/Info.svg"}
                alt="Logo"
                width={20}
                height={20}
              />
              Informações
            </h4>

            <div className="border-l-2 border-gray h-6" />

            <h4
              className={`text-sm flex items-center gap-2 font-medium cursor-pointer ${
                activeTab == "tickets" ? "text-primary" : "text-textPrimary"
              }`}
              onClick={() => setActiveTab("tickets")}
            >
              <Image
                className={`${activeTab == "tickets" ? "" : "brightness-0"}`}
                src={"/Ticket.svg"}
                alt="Logo"
                width={20}
                height={20}
              />
              Ingressos
            </h4>
          </div>

          <div className={`md:flex w-full gap-6`}>
            <div
              className={`${
                activeTab == "info" ? "block" : "hidden"
              } md:w-3/4 md:!block `}
            >
              <div className="flex md:gap-4 gap-2 mb-4 flex-wrap ">
                <a
                  className="flex items-center gap-2 w-fit"
                  href={
                    "https://www.google.com/maps/dir/?api=1&origin=&destination=" +
                    eventTicket?.endereco
                  }
                  target="_blank"
                >
                  <Button variant="secondary">
                    <Image
                      src={"/Localization.svg"}
                      alt="Logo"
                      width={20}
                      height={20}
                    />
                    Como Chegar
                  </Button>
                </a>
                <a
                  className="flex items-center gap-2 w-fit"
                  href={linkCalendarAdd({
                    text: eventTicket?.nome ?? "",
                    dates: `${
                      eventTicket?.diaInicio
                        ? eventTicket?.diaInicio.split("/").reverse().join("")
                        : ""
                    }`,
                    details: eventTicket?.descricaoTexto ?? "",
                    location: eventTicket?.endereco?.toString() ?? "",
                  })}
                  target="_blank"
                >
                  <Button variant="secondary">
                    <Image
                      src={"/Calendar.svg"}
                      alt="Logo"
                      width={20}
                      height={20}
                    />
                    Adicionar na agenda
                  </Button>
                </a>
                <Button onClick={handleClickShare} variant="secondary">
                  <Image src={"/share.svg"} alt="Logo" width={20} height={20} />
                  Compartilhar
                </Button>
              </div>
              <div className="flex flex-col gap-4 w-full text-textPrimary">
                <h3 className="text-lg font-medium">Informações gerais</h3>
                <article className="text-sm leading-6">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: eventTicket?.descricao ?? "",
                    }}
                  ></p>
                </article>
                <div className="flex flex-col gap-4 p-6 bg-softPurple rounded-xl text-textPrimary font-medium">
                  <h5>Regras da compra online e acesso digital</h5>
                  <p className="text-xs leading-5 ">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque vestibulum in purus non facilisis. Morbi
                    laoreet varius dolor, in sagittis ipsum ultricies eget.
                    Nulla pretium pretium mi eu gravida. Donec accumsan tempus
                    imperdiet. Proin eget tincidunt metus, at fermentum diam.
                    Aliquam laoreet consectetur leo, at volutpat eros
                    consectetur non. Proin a lorem eu dolor elementum pulvinar.
                    Phasellus sit amet lorem bibendum, posuere est eget,
                    efficitur dui.
                  </p>
                </div>
              </div>
            </div>
            {!eventTicket?.exibirCadeiras && !eventTicket?.local?.mapa && (
              <aside
                className={`md:w-1/4 flex-col md:min-w-[18rem] gap-4 ${
                  activeTab == "tickets" ? "flex" : "hidden"
                } md:flex`}
              >
                <TicketsContainer currentEvent={currentEvent} />
              </aside>
            )}
          </div>
          {(eventTicket?.exibirCadeiras || eventTicket?.local?.mapa) && (
            <aside
              className={`md:w-full flex-col gap-4 ${
                activeTab == "tickets" ? "flex" : "hidden"
              } md:flex`}
            >
              <TicketsContainerDefinido currentEvent={currentEvent} />
            </aside>
          )}
          {/* <ActionTicketMap/>
            <HTMLMap
              /> */}
          {/* <ActionTicket
            /> */}
        </div>
      )}
    </>
  );
}
