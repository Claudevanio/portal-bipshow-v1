import React, { useState } from 'react';
import { Modal } from '@mui/material';
import { useOrders } from '@/shared/hooks/useOrders';
import { format } from 'date-fns';
import { Alert } from '@/components/Alert';
import { IAlert } from '@/types';
import { Button } from '@/components/Form/Button';
import { Download } from '@/components/icons/Download';
import { useEventTicket } from '@/shared/hooks/useEventTicket';
import { ContainerContent, ContainerContentInfoPurchase } from './styles';
import { CardQRCODE } from './CardQRCODE';
import 'react-multi-carousel/lib/styles.css';
import { PaymentPIX } from './PaymentPIX';
import { ModalTransfer } from './ModalTransfer';

export const Content: React.FC = () => {
  const {
    infoTicket,
    quantityTicketsPerUser,
    ticketsSales,
    handleDownloadTicketSales,
    handleCanceledPayment,
    loadingCanceledPayment,
    infoCanceledPayment,
    isLoadingDownloadTicket,
    isOpenModalTranfer,
    setIsOpenModalTranfer,
    setCurrentTransferTicketId
  } = useOrders();
  const { handleShowModal, loading } = useEventTicket();
  const [isTypeActive, setIsTypeActive] = useState<'tickets' | 'details'>('tickets');
  const [isOpenModalPaymentPIX, setIsOpenModalPaymentPIX] = useState<boolean>(false);

  const handleOpenModal = () => setIsOpenModalPaymentPIX(true);
  const handleCloseModal = () => setIsOpenModalPaymentPIX(false);

  return (
    <ContainerContent>
      <div className="buttons">
        <button type="button" onClick={() => setIsTypeActive('tickets')} className={`${isTypeActive === 'tickets' ? 'active' : ''}`}>
          Ingressos
        </button>
        <button type="button" onClick={() => setIsTypeActive('details')} className={`${isTypeActive === 'details' ? 'active' : ''}`}>
          Detalhes
        </button>
      </div>
      <div className="content-block">
        {isTypeActive === 'details' && (
          <>
            {infoTicket && infoTicket.evento.descricao && (
              <div className="info-text">
                <h6 className="title">Informações gerais</h6>
                <div className="text" dangerouslySetInnerHTML={{ __html: infoTicket.evento.descricao }} />
              </div>
            )}
            <div className="info-rules">
              <h6 className="title">Regras da compra online e acesso digital</h6>

              <p className="text-xs leading-5 ">
                O Acesso ao evento quando for feito por reconhecimento facial será de forma exclusiva por esse método, de modo que ficará o
                participante obrigado à vinculação de uma foto (selfie) no aplicativo ou portal de vendas BipShow. <br />
                Caso o usuário utilize algum tipo de maquiagem, boné ou adereço que impossibilite o reconhecimento fácil, ficará sujeito à uma
                verificação de identidade INDIVIDUAL e MANUAL para acesso ao evento, caso em que será obrigatória a apresentação, de DOCUMENTO OFICIAL
                COM FOTO para a entrada no evento; <br />
                A foto (selfie) será submetida à validação pelo sistema do evento e autenticada por empresa especializada em reconhecimento facial e
                identificação de documentos (RG ou CNH), atestando, assim, a identidade e autenticidade dos dados de cada cliente; <br />
                Caso o evento permita venda de ingresso do tipo QRCODE, modalidade essa onde você tem acesso ao seu ingresso logo após concluir a
                compra, acessando o app do BIpShow e não havendo necessidade de trocas antecipadas na bilheteria. Você pode apresentá-los no dia do
                evento de duas maneiras: Apresentando o arquivo na tela do seu celular ou imprimindo o seu ingresso numa folha A4 ou ofício (colorido
                ou preto e branco). Lembrando que esse ingresso é pessoal e intransferível e não pode ser impresso mais de uma vez ou fotocopiado,
                pois cada código barras é único, ou seja, só libera uma entrada! <br />
                Ao comprar o ingresso o usuário/participante tem ciência que é de uso único, exclusivo e intransferível, sendo vinculado ao CPF do
                adquirente; Caso o usuário/ participante queira efetuar a transferência do seu ingresso, poderá ser feita ou não e será
                disponibilizado ou não, conforme as regras gerais do evento. <br />
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
                <p className="text-light">{format(new Date(infoTicket.horario), 'dd/MM/yyyy HH:mm')}</p>
              </div>
              {!infoCanceledPayment && (
                <div className="info-id-hour">
                  <h6 className="title">Forma de pagamento:</h6>
                  <p className="text-light">{infoTicket.pagamento.formaPagamento}</p>
                </div>
              )}
            </ContainerContentInfoPurchase>
            {!infoCanceledPayment && (
              <>
                {infoTicket.pagamento.status === 'AGUARDANDO' && (
                  <Alert
                    variant={IAlert.WARNING}
                    text={infoTicket.pagamento.textoPix ? 'Aguardando pagamento' : 'Aguardando a validação do pagamento.'}
                  />
                )}
                {infoTicket.pagamento.status === 'EMANALISE' && <Alert variant={IAlert.WARNING} text="Pagamento está em analise." />}
                {infoTicket.pagamento.status === 'REJEITADO' && <Alert variant={IAlert.WARNING} text="Pagamento foi rejeitado." />}
                {infoTicket.pagamento.status === 'CANCELADO' && <Alert variant={IAlert.WARNING} text="Pagamento foi cancelado." />}
                {infoTicket.pagamento.status === 'SUSPENSO' && <Alert variant={IAlert.WARNING} text="Pagamento foi suspenso." />}
                {infoTicket.pagamento.status === 'DISPUTA' && <Alert variant={IAlert.WARNING} text="Pagamento está em situação de disputa." />}
                {infoTicket.pagamento.status === 'REEMBOLSADO' && <Alert variant={IAlert.WARNING} text="Pagamento foi reembolsado." />}
                {(infoTicket.pagamento.status === 'APROVADO' || infoTicket.pagamento.status === 'REGISTRADO') && (
                  <div className="list-purchase">
                    <div>
                      {/* <div className="header-list-purchase">
                    <h6 className="title">
                      {quantityTicketsPerUser}
                      {' '}
                      Ingressos
                    </h6>
                    <Button
                      variant="outline-medium"
                      text="Baixar todos"
                      icon={<Download width={16} height={16} color={'#8779F8'} />}
                      type="button"
                      onClick={() => handleDownloadTicketSales(ticketsSales[0].codigo, infoTicket.guid)}
                      loading={isLoadingDownloadTicket}
                      disabled={isLoadingDownloadTicket}
                    />
                  </div> */}
                      <div className="mode-desktop">
                        {ticketsSales.length > 0 &&
                          ticketsSales.map(item => (
                            <CardQRCODE
                              key={item.id}
                              {...item}
                              onClickDownload={() => handleDownloadTicketSales(item.codigo, infoTicket.guid)}
                              onClickTransfer={() => {
                                setCurrentTransferTicketId(item.id);
                                setIsOpenModalTranfer(true);
                              }}
                              id={infoTicket.evento.id}
                            />
                          ))}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            {infoTicket.pagamento.textoPix &&
              (infoTicket.status === 'RESERVADO' || infoTicket.status === 'AGUARDANDO') &&
              !infoCanceledPayment &&
              infoTicket.pagamento.status !== 'CANCELADO' && (
                <div className="btn-pix">
                  <Button
                    type="button"
                    text="Fazer o pagamento via PIX"
                    className="payment-pix"
                    onClick={handleOpenModal}
                    disabled={loadingCanceledPayment}
                  />
                  <Button
                    type="button"
                    text="Cancelar pagamento"
                    onClick={() => handleCanceledPayment(infoTicket.pagamento.id)}
                    className="payment-pix-cancel"
                    loading={loadingCanceledPayment}
                    disabled={loadingCanceledPayment}
                  />
                </div>
              )}
            {infoCanceledPayment && (
              <div className="alert-canceled">
                <Alert variant={IAlert.WARNING} text={infoCanceledPayment.motivo} />
              </div>
            )}
            {infoTicket && infoTicket.pagamento && infoTicket.pagamento.status !== 'APROVADO' && !infoCanceledPayment && (
              <div className="btn-actions">
                {infoTicket.status === 'RESERVADO' && infoTicket.pagamento.urlBoleto && (
                  <a href={infoTicket.pagamento.urlBoleto} target="_black" className="btn-canceled-payment">
                    Abrir boleto
                  </a>
                )}

                {infoTicket.status === 'RESERVADO' && infoTicket.pagamento.urlBoleto && infoTicket.pagamento.id && (
                  <Button
                    variant="outline"
                    type="button"
                    text="Cancelar pagamento"
                    className="btn-canceled-payment"
                    onClick={() => handleCanceledPayment(infoTicket.pagamento.id)}
                    disabled={loadingCanceledPayment}
                    loading={loadingCanceledPayment}
                  />
                )}
              </div>
            )}
            {(infoTicket.pagamento.status === 'REJEITADO' || infoTicket.pagamento.status === 'CANCELADO' || infoCanceledPayment) && (
              <div className="payment-canceled">
                <Button variant="medium" text="Tentar outra forma de pagamento" type="button" onClick={handleShowModal} disabled={loading} />
              </div>
            )}
          </div>
        )}

        {isOpenModalTranfer && (
          // <Modal
          //   open={isOpenModalTranfer}
          //   onClose={onClose}
          //   >
          <ModalTransfer
            show={isOpenModalTranfer}
            onHide={() => {
              setIsOpenModalTranfer(false);
            }}
          />
          // </Modal>
        )}
        <Modal open={isOpenModalPaymentPIX} onClose={handleCloseModal} className="flex items-center justify-center">
          <PaymentPIX handleCloseModal={handleCloseModal} />
        </Modal>
      </div>
    </ContainerContent>
  );
};
