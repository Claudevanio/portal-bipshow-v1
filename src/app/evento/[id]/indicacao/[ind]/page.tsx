'use client';
import { EventMockList } from '@/utils/event-mock';
import dayjs from 'dayjs';
import Image from 'next/image';
import ptBr from 'dayjs/locale/pt-br';
import localizeFormat from 'dayjs/plugin/localizedFormat';
import { Button, GradientBorder } from '@/components';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import Link from 'next/link';
import { TicketsContainer } from '../../components/TicketsContainer';
import { useEffect, useState } from 'react';
import { IEventProps } from '@/types';
import { eventosService } from '@/services';
import { useEffectOnce } from '@/hooks';
import { baseUrlImages } from '@/constants';
import { useEventTicket } from '@/shared/hooks';
import { useEvent } from '@/shared/hooks/useEvents';
import { ActionTicket, ActionTicketMap } from '@/components/Tickets';
import { TicketsContainerDefinido } from '../../components/TicketsContainerDefinido';
import { TicketPurchaseProvider, useTicketPurchase } from '@/shared/hooks/useTicketPurchase';
import { Offcanvas } from 'react-bootstrap';
import { Purchase } from '@/components/Purchase';
import { HTMLMap } from '@/components/Tickets/TicketMap/HTMLMap';
import FacebookPixel from '@/components/Pixel/Pixel';
import { usePathname } from 'next/navigation';
import { Pixel } from '@/utils/pixel';
import GtmImersao from '@/components/GoogleTagManager/gtm166';

dayjs.locale(ptBr);
dayjs.extend(localizeFormat);

export default function EventoPage({ params }: { params: { id: string } }) {
  const currentEvent = EventMockList.find(event => event.id === '133');

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
    // 
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

  const linkCalendarAdd = ({ text, dates, details, location }: ILinkCalendarAdd) => {
    return `http://www.google.com/calendar/event?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}&trp=false&sprop=&sprop=${text}`;
  };

  const [activeTab, setActiveTab] = useState<'info' | 'tickets'>('tickets');

  function handleClickShare() {
    if (navigator.share && document.location.origin) {
      navigator.share({
        url: `${document.location.origin}/evento/${eventTicket?.id}`,
        text: eventTicket?.descricaoTexto,
        title: eventTicket?.nome
      });
    }
  }

  const { showPurchase, handleCloseModal, ticketsPurchase } = useEventTicket();

  const pathname = usePathname();

  useEffect(() => {
    if (
      eventTicket?.pixelFacebook &&
      pathname.includes('evento') &&
      (pathname.includes(eventTicket?.id?.toString()) || pathname.includes(eventTicket?.link))
    ) {
      Pixel.PageView(eventTicket.pixelFacebook);
    }
  }, [eventTicket, pathname]);

  return (
    <>
      {eventTicket?.pixelFacebook && <FacebookPixel fbPixelId={eventTicket?.pixelFacebook} />}
      {eventTicket?.pixelGoogle && <GtmImersao gtmId={eventTicket?.pixelGoogle} />}
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
                backgroundImage: `url(${eventTicket?.capa?.link && eventTicket?.capa?.link[0] === '/' ? baseUrlImages + eventTicket?.capa?.link : eventTicket?.capa?.link})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundClip: 'border-box'
              }}
            ></div>
            <img
              src={
                eventTicket?.imagens?.minicapa?.link && eventTicket?.imagens?.minicapa?.link[0] === '/'
                  ? baseUrlImages + eventTicket?.imagens?.minicapa?.link
                  : eventTicket?.imagens?.minicapa?.link
              }
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
              {`${eventTicket?.localidade?.replace('/', ', ')} - 
                ${evento?.nomeDoLugar ?? eventTicket?.nomeDoLugar}`}
            </p>
            <p className="font-medium text-sm">{dayjs(eventTicket?.dataRealizacao).locale(ptBr).format('HH:mm')}</p>
            <p className="font-medium text-sm">{dayjs(eventTicket?.dataRealizacao).locale(ptBr).format('LL')}</p>
          </div>

          <div className="flex items-center w-full gap-8 border-b-2 border-gray pb-2 md:hidden">
            <h4
              className={`text-sm flex items-center gap-2 font-medium cursor-pointer ${activeTab == 'tickets' ? 'text-primary' : 'text-textPrimary'}`}
              onClick={() => setActiveTab('tickets')}
            >
              <Image className={`${activeTab == 'tickets' ? '' : 'brightness-0'}`} src={'/Ticket.svg'} alt="Logo" width={20} height={20} />
              Ingressos
            </h4>
            <div className="border-l-2 border-gray h-6" />

            <h4
              className={`text-sm flex items-center gap-2 font-medium cursor-pointer ${activeTab == 'info' ? 'text-primary' : 'text-textPrimary'}`}
              onClick={() => setActiveTab('info')}
            >
              <Image className={`${activeTab == 'info' ? '' : 'brightness-0'}`} src={'/Info.svg'} alt="Logo" width={20} height={20} />
              Informações
            </h4>
          </div>

          <div className={`md:flex w-full gap-6`}>
            <div className={`${activeTab == 'info' ? 'block' : 'hidden'} md:w-3/4 md:!block `}>
              <div className="flex md:gap-4 gap-2 mb-4 flex-wrap ">
                <a
                  className="flex items-center gap-2 w-fit"
                  href={'https://www.google.com/maps/dir/?api=1&origin=&destination=' + eventTicket?.endereco}
                  target="_blank"
                >
                  <Button variant="secondary">
                    <Image src={'/Localization.svg'} alt="Logo" width={20} height={20} />
                    Como Chegar
                  </Button>
                </a>
                <a
                  className="flex items-center gap-2 w-fit"
                  href={linkCalendarAdd({
                    text: eventTicket?.nome ?? '',
                    dates: `${eventTicket?.diaInicio ? eventTicket?.diaInicio.split('/').reverse().join('') : ''}`,
                    details: eventTicket?.descricaoTexto ?? '',
                    location: eventTicket?.endereco?.toString() ?? ''
                  })}
                  target="_blank"
                >
                  <Button variant="secondary">
                    <Image src={'/Calendar.svg'} alt="Logo" width={20} height={20} />
                    Adicionar na agenda
                  </Button>
                </a>
                <Button onClick={handleClickShare} variant="secondary">
                  <Image src={'/share.svg'} alt="Logo" width={20} height={20} />
                  Compartilhar
                </Button>
              </div>
              <div className="flex flex-col gap-4 w-full text-textPrimary">
                <h3 className="text-lg font-medium">Informações gerais</h3>
                <article className="text-sm leading-6">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: eventTicket?.descricao ?? ''
                    }}
                  ></p>
                </article>
              </div>
            </div>
            {!eventTicket?.exibirCadeiras && !eventTicket?.local?.mapa && (
              <aside className={`md:w-[30%] flex-col md:min-w-[18rem] gap-4 ${activeTab == 'tickets' ? 'flex' : 'hidden'} md:flex`}>
                <TicketsContainer currentEvent={currentEvent} />
              </aside>
            )}
          </div>
          {(eventTicket?.exibirCadeiras || eventTicket?.local?.mapa) && (
            <aside className={`md:w-full flex-col gap-4 ${activeTab == 'tickets' ? 'flex' : 'hidden'} md:flex`}>
              <TicketsContainerDefinido currentEvent={currentEvent} />
            </aside>
          )}

          <div className="flex flex-col gap-4 p-6 bg-softPurple rounded-xl text-textPrimary font-medium">
            <h5>Regras da compra online e acesso digital</h5>
            <p className="text-xs leading-5 ">
              O Acesso ao evento quando for feito por reconhecimento facial será de forma exclusiva por esse método, de modo que ficará o participante
              obrigado à vinculação de uma foto (selfie) no aplicativo ou portal de vendas BipShow. <br />
              Caso o usuário utilize algum tipo de maquiagem, boné ou adereço que impossibilite o reconhecimento fácil, ficará sujeito à uma
              verificação de identidade INDIVIDUAL e MANUAL para acesso ao evento, caso em que será obrigatória a apresentação, de DOCUMENTO OFICIAL
              COM FOTO para a entrada no evento; <br />
              A foto (selfie) será submetida à validação pelo sistema do evento e autenticada por empresa especializada em reconhecimento facial e
              identificação de documentos (RG ou CNH), atestando, assim, a identidade e autenticidade dos dados de cada cliente; <br />
              Caso o evento permita venda de ingresso do tipo QRCODE, modalidade essa onde você tem acesso ao seu ingresso logo após concluir a
              compra, acessando o app do BIpShow e não havendo necessidade de trocas antecipadas na bilheteria. Você pode apresentá-los no dia do
              evento de duas maneiras: Apresentando o arquivo na tela do seu celular ou imprimindo o seu ingresso numa folha A4 ou ofício (colorido ou
              preto e branco). Lembrando que esse ingresso é pessoal e intransferível e não pode ser impresso mais de uma vez ou fotocopiado, pois
              cada código barras é único, ou seja, só libera uma entrada! <br />
              Ao comprar o ingresso o usuário/participante tem ciência que é de uso único, exclusivo e intransferível, sendo vinculado ao CPF do
              adquirente; Caso o usuário/ participante queira efetuar a transferência do seu ingresso, poderá ser feita ou não e será disponibilizado
              ou não, conforme as regras gerais do evento. <br />
              LGPD. Todos os dados, documentos, fotos e informações de cada cliente estarão seguros, e seguem rigorosamente as regras estipuladas na
              Lei nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais); <br />
              SEU INGRESSO É ÚNICO E PESSOAL. A Uzer Tecnologia (BipShow) não se responsabiliza sob hipótese nenhuma, por ingressos adquiridos fora
              dos canais de venda oficiais: bilheteria, pontos de venda e site ou app do BipShow. <br />
              A Uzer Tecnologia (bipShow) não se responsabiliza pela realização, cancelamento ou adiamento deste evento. O promotor ou realizador do
              evento é o único e exclusivo responsável, bem como pela eventual troca ou restituição do valor de face do ingresso. A Uzer Tecnologia
              (BipShow) é contratada por esses promotores ou realizadores de evento para comercializar e distribuir ingressos. <br />
              Eleição de Foro. Todos os Participantes devem ler, entender e concordar com os Termos e Condições do Evento declarados neste
              instrumento, os quais são regidos de acordo com as leis do Brasil e que, com relação a qualquer controvérsia oriunda destes termos, a
              jurisdição e o foro únicos e exclusivos serão o do Foro de Goiânia/GO.
            </p>
          </div>
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
