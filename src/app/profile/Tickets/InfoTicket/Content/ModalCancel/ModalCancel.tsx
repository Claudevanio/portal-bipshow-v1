import React from 'react'; 
import { Button as FormButton } from '@/components/Form/Button';
import { IModalCancel } from './interface';
import { ContainerModalCancel } from './styles';   
import { Close, MailOutline, WhatsApp } from '@mui/icons-material';
import { Modal } from '@mui/material';

export const ModalCancel: React.FC<IModalCancel> = ({ onHide, show }) => {

  return (
    <Modal open={show} onClose={onHide} 
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className='flex items-center justify-center'
    >
      <ContainerModalCancel
        className='bg-white p-4 rounded-lg w-full md:max-w-[40%] md:px-20 h-full md:h-fit relative'
      >
        <> 
          <Close
            onClick={onHide}
            className='absolute top-2 right-2 cursor-pointer'
          />
          <h5 className='title2 title text-xl mb-4'>
            Pedido de cancelamento de compra
          </h5>
          <div className="body text">
            <p>
              O cancelamento de compras online pode ser solicitado até 7 dias após a compra, desde que isso não aconteça dentro das 48h que antecedem a realização do evento.
            </p>
            <p>
              Após a realização do evento, não é possível solicitar o cancelamento dos ingressos, mesmo que não tenham sido utilizados.
            </p>
            <p>
              Alguns eventos podem ter políticas de cancelamento exclusivas, deverá ser consultado nas informações gerais do evento.
            </p>
            <p>
              Para solicitar envie um e-mail para contato abaixo com o assunto :”PEDIDO DE CANCELAMENTO”
            </p>
            <div
              className='flex flex-col gap-4 my-4 items-center'
            >
              <a 
                href="https://api.whatsapp.com/send?phone=5562982260746"
                target="_blank"
                rel="noreferrer"
                >
                <button
                  className='flex gap-2 items-center justify-center bg-[#8779F80A] text-primary py-6 w-64 rounded-[100px]'
                >
                  <WhatsApp
                    className='text-2xl text-[#25D366]'
                  />
                  (62) 98226-0746
                </button>
              </a>

              <a 
                href="mailto:contato@bipshow.com"
                target="_blank"
                >
                <button
                  className='flex gap-2 items-center justify-center bg-[#8779F80A] text-primary py-6 w-64 rounded-[100px]'
                >
                  <MailOutline
                    className='text-2xl text-[#D14836]'
                  />
                  contato@bipshow.com
                </button>
              </a>

            </div>

            <div className='btns'>
              <FormButton
                type="submit"
                text="Entendi"
                variant="medium"
                onClick={onHide}
              />
            </div>
          </div>
        </>
      </ContainerModalCancel>
    </Modal >
  );
};
