import React, { useState } from 'react';
import { Button } from '@/components/Form/Button';
import { useTicketPurchase } from '@/shared/hooks/useTicketPurchase';
import { Avatar } from '@/components';
import { Modal as ModalBootstrap } from 'react-bootstrap';
import { Modal } from '@/components/Purchase/CheckoutPurchase/StepOne/Modal';
import { CPFMask, TELEFONEMask } from '@/shared/config/mask';
import { ContainerCard } from './styles';
import { ICard } from './interface';

export const Card: React.FC<ICard> = ({ nome, index, user }) => {
  const { selectedUser, clearUser, loadingSelectUser } = useTicketPurchase();
  const [isShow, setIsShow] = useState<boolean>(false);

  const handleClose = () => setIsShow(false);
  const handleShow = () => setIsShow(true);

  return (
    <ContainerCard>
      <p className="text-dark">{nome}</p>
      {user && user.filled && (
        <div className="action-button">
          <Button variant="outline-medium" text="Meu ingresso" onClick={() => selectedUser('mine', index, user.idTipo)} loading={loadingSelectUser} />
          <Button
            variant="outline-medium"
            text="Definir utilizador"
            onClick={handleShow}
            disabled={loadingSelectUser}
          />
        </div>
      )}
      {user && !user.filled && (
        <div className="info-user">
          <div className="avatar">
            <Avatar size="small" src={undefined}
            //  username={user.nome}
             />
          </div>
          <div className="infos">
            <p className="text-dark">{user.nome}</p>
            <p className="text-light">{TELEFONEMask(user.telefone || '')}</p>
            <p className="text-light">{user.email}</p>
            <p className="text-light">{CPFMask(user.cpf || '')}</p>
          </div>
          <Button
            type="button"
            variant="outline-medium"
            text="Remover"
            onClick={() => {
              if (user.idTipo) {
                clearUser(index, user.idTipo);
              }
            }}
          />
        </div>
      )}
      {user && user.idTipo && (
        <Modal open={isShow} onClose={handleClose} index={index} nome={nome} idTipo={user?.idTipo} />
      )}
    </ContainerCard>
  );
};
