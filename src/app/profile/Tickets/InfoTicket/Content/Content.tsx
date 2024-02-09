import React, { useState } from 'react'; 
import { useTickets } from '@/shared/hooks/useTickets';
import { format } from 'date-fns';
import { Button } from '@/components/Form/Button';
import { Download } from '@/components/icons/Download'; 
import { ContainerContent, ContainerContentInfoPurchase } from './styles';
import { CardQRCODE } from './CardQRCODE';
import 'react-multi-carousel/lib/styles.css';
import { ModalTransfer } from './ModalTransfer';
import { ModalCancel } from './ModalCancel';
import { Modal } from '@mui/material';
import Image from 'next/image';
import { Button as SecondButton } from '@/components';

export const Content: React.FC = () => {
  const {
    infoTicket, handleDownloadTicketSales, loadingCanceledPayment, isLoadingDownloadTicket, handleClearInfoTicket,
  } = useTickets();
  const [isTypeActive, setIsTypeActive] = useState<'tickets' | 'details'>('tickets');
  const [isOpenModalTranfer, setIsOpenModalTransfer] = useState<boolean>(false);
  const [isOpenModalCancel, setIsOpenModalCancel] = useState<boolean>(false);

  const onClose = () => setIsOpenModalTransfer(false);

  const onOpen = () => setIsOpenModalTransfer(true);

  const onCloseCancel = () => setIsOpenModalCancel(false);
  const onOpenCancel = () => setIsOpenModalCancel(true);

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

  function handleClickShare() {
    if (navigator.share && document.location.origin) {
      navigator.share({
        url: `${document.location.origin}/evento/${infoTicket?.evento.id}`,
        text: infoTicket?.evento?.descricaoTexto,
        title: infoTicket?.evento?.nome,
      });
    }
  }

  return (
    <ContainerContent>
      
      <div className="buttons">
      
      <div className="flex items-center w-full gap-8 border-b-2 border-gray pb-2">

      <h4
              className={`text-sm flex items-center gap-2 font-medium cursor-pointer ${
                isTypeActive == "tickets" ? "text-primary" : "text-textPrimary"
              }`}
              onClick={() => setIsTypeActive("tickets")}
            >
              <Image
                className={`${isTypeActive == "tickets" ? "" : "brightness-0"}`}
                src={"/Ticket.svg"}
                alt="Logo"
                width={20}
                height={20}
              />
              Ingressos
            </h4>
            <div className="border-l-2 border-gray h-6" />

          
          <h4
              className={`text-sm flex items-center gap-2 font-medium cursor-pointer ${
                isTypeActive == "details" ? "text-primary" : "text-textPrimary"
              }`}
              onClick={() => setIsTypeActive("details")}
            >
              <Image
                className={`${isTypeActive == "details" ? "" : "brightness-0"}`}
                src={"/Info.svg"}
                alt="Logo"
                width={20}
                height={20}
              />
              Informações
            </h4>
          </div>

      </div>
      <div className="content-block">
        {isTypeActive === 'details' && (
          <>
          
      <div className="flex md:gap-4 gap-2 mb-4 flex-wrap my-4 ">
                <a
                  className="flex items-center gap-2 w-fit"
                  href={
                    "https://www.google.com/maps/dir/?api=1&origin=&destination=" +
                    infoTicket?.evento.endereco
                  }
                  target="_blank"
                >
                  <SecondButton variant="secondary"
                    type="button"
                  >
                    <Image
                      src={"/Localization.svg"}
                      alt="Logo"
                      width={20}
                      height={20}
                    />
                    Como Chegar
                  </SecondButton>
                </a>
                <a
                  className="flex items-center gap-2 w-fit"
                  href={linkCalendarAdd({
                    text: infoTicket?.evento?.nome ?? "",
                    dates: `${
                      infoTicket?.evento?.diaInicio
                        ? infoTicket?.evento?.diaInicio.split("/").reverse().join("")
                        : ""
                    }`,
                    details: infoTicket?.evento?.descricaoTexto ?? "",
                    location: infoTicket?.evento?.endereco?.toString() ?? "",
                  })}
                  target="_blank"
                >
                  <SecondButton variant="secondary"
                    type="button">
                    <Image
                      src={"/Calendar.svg"}
                      alt="Logo"
                      width={20}
                      height={20}
                    />
                    Adicionar na agenda
                  </SecondButton>
                </a>
                <SecondButton onClick={handleClickShare} variant="secondary"
                    type="button">
                  <Image src={"/share.svg"} alt="Logo" width={20} height={20} />
                  Compartilhar
                </SecondButton>
              </div> 
            {infoTicket && infoTicket.evento.descricao && (
              <div className="info-text mb-8">
                <h6 className="title">Informações gerais</h6>
                <div className="text" dangerouslySetInnerHTML={{ __html: infoTicket.evento.descricao }} />
              </div>
            )}
           
           <div className="flex flex-col gap-4 p-6 bg-softPurple rounded-xl text-textPrimary font-medium">
                  <h5>Regras da compra online e acesso digital</h5>
                  <p className="text-xs leading-5 ">
                                      O Acesso ao evento quando for feito por reconhecimento facial será de forma exclusiva por esse método, de modo que ficará o participante obrigado à vinculação de uma foto (selfie) no aplicativo ou portal de vendas BipShow. <br/>
                    Caso o usuário utilize algum tipo de maquiagem, boné ou adereço que impossibilite o reconhecimento fácil, ficará sujeito à uma verificação de identidade INDIVIDUAL e MANUAL para acesso ao evento, caso em que será obrigatória  a apresentação, de DOCUMENTO OFICIAL COM FOTO para a entrada no evento; <br/>
                    A foto (selfie) será submetida à validação pelo sistema do evento e autenticada por empresa especializada em reconhecimento facial e identificação de documentos (RG ou CNH), atestando, assim, a identidade e autenticidade dos dados de cada cliente; <br/>
                    Caso o evento permita venda de ingresso do tipo QRCODE, modalidade essa onde você tem acesso ao seu ingresso logo após concluir a compra, acessando o app do BIpShow e não havendo necessidade de trocas antecipadas na bilheteria. Você pode apresentá-los no dia do evento de duas maneiras: Apresentando o arquivo na tela do seu celular ou imprimindo o seu ingresso numa folha A4 ou ofício (colorido ou preto e branco).  Lembrando que esse ingresso é pessoal e intransferível e não pode ser impresso mais de uma vez ou fotocopiado, pois cada código barras é único, ou seja, só libera uma entrada! <br/>
                    Ao comprar o ingresso o usuário/participante tem ciência que é de uso único, exclusivo e intransferível, sendo vinculado ao CPF do adquirente; Caso o usuário/ participante queira efetuar a transferência do seu ingresso, poderá ser feita ou não e será disponibilizado ou não, conforme as regras gerais do evento. <br/>
                    LGPD. Todos os dados, documentos, fotos e informações de cada cliente estarão seguros, e seguem rigorosamente as regras estipuladas na Lei nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais); <br/>
                    SEU INGRESSO É ÚNICO E PESSOAL. A Uzer Tecnologia (BipShow) não se responsabiliza sob hipótese nenhuma, por ingressos adquiridos fora dos canais de venda oficiais: bilheteria, pontos de venda e site ou app do BipShow. <br/>
                    A Uzer Tecnologia (bipShow) não se responsabiliza pela realização, cancelamento ou adiamento deste evento. O promotor ou realizador do evento é o único e exclusivo responsável, bem como pela eventual troca ou restituição do valor de face do ingresso. A Uzer Tecnologia (BipShow) é contratada por esses promotores ou realizadores de evento para comercializar e distribuir ingressos. <br/>
                    Eleição de Foro. Todos os Participantes devem ler, entender e concordar com os Termos e Condições do Evento declarados neste instrumento, os quais são regidos de acordo com as leis do Brasil e que, com relação a qualquer controvérsia oriunda destes termos, a jurisdição e o foro únicos e exclusivos serão o do Foro de Goiânia/GO.

                  </p>
            </div>
          </>
        )}
        {isTypeActive === 'tickets' && infoTicket && (
          <div className="tickets">
            <ContainerContentInfoPurchase>
              <div className="info-id-purchase">
                <h6 className="title">Nº do pedido:</h6>
                <p className="text-light">{infoTicket.id}</p>
              </div>
              <div className="info-id-hour">
                <h6 className="title">Horário:</h6>
                <p className="">{format(new Date(infoTicket.evento.dataRealizacao), 'dd/MM/yyyy HH:mm')}</p>
              </div>
            </ContainerContentInfoPurchase>
            <div className="list-purchase">
              <div>
                <div className="header-list-purchase"> 
                  {!infoTicket.facial && (
                    <Button
                      variant="outline-medium"
                      text="Baixar ingresso"
                      icon={<Download width={16} height={16} color={'#8779F8'} />}
                      type="button"
                      onClick={() => handleDownloadTicketSales(infoTicket.codigo, infoTicket.pedido.guid)}
                      loading={isLoadingDownloadTicket}
                      disabled={isLoadingDownloadTicket}
                    />
                  )}
                </div>
                <div className="">
                  <CardQRCODE
                    key={infoTicket.id}
                    codigo={infoTicket.codigo}
                    comprador={infoTicket.comprador}
                    utilizador={infoTicket.utilizador}
                    nome={infoTicket.nome}
                    id={infoTicket.evento.id}
                    nomeDestinatario={infoTicket.nomeDestinatario}
                    facial={infoTicket.facial}
                    ehDeSocio={infoTicket.ehDeSocio}
                    jaUtilizado={infoTicket.jaUtilizado}
                    cpfDestinatario={infoTicket.cpfDestinatario}
                    numero={infoTicket.numero}
                    valorIngresso={infoTicket.valorIngresso}
                    valorTaxa={infoTicket.valorTaxa}
                    podeTransferir={infoTicket.podeTransferir}
                    onClickCancel={onOpenCancel}
                    onClickTransfer={onOpen}
                  />
                </div> 
              </div>
              <div className="btn-actions">
                {/* <Button
                  variant="outline"
                  type="button"
                  text="Cancelar"
                  className="btn-canceled-payment"
                  onClick={onOpenCancel}
                  disabled={loadingCanceledPayment}
                  loading={loadingCanceledPayment}
                />
                {infoTicket.podeTransferir && (
                  <Button
                    variant="medium"
                    type="button"
                    text="Transferir"
                    onClick={onOpen}
                  />
                )} */}
              </div>
            </div>
          </div>
        )}
      </div>
      {infoTicket?.podeTransferir && isOpenModalTranfer && (
        // <Modal
        //   open={isOpenModalTranfer}
        //   onClose={onClose}
        //   >
            <ModalTransfer
              show={isOpenModalTranfer}
              onHide={onClose}
              />
        // </Modal>
      )}
      <ModalCancel
        show={isOpenModalCancel}
        onHide={onCloseCancel}
      />
    </ContainerContent>
  );
};
