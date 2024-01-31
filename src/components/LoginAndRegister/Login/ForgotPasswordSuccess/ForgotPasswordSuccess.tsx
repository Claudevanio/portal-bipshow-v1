import React from "react";
import { CheckPassword } from "@/components/icons/CheckPassword";
import { theme } from "@/shared";
import { useAuth } from "@/shared/hooks/useAuth";
import { ContainerForgotPasswordSuccess } from "./styles";

export const ForgotPasswordSuccess: React.FC = () => {
  const { dataForgotPassword } = useAuth();

  return (
    <ContainerForgotPasswordSuccess>
      <CheckPassword height={82} width={82} color={'#8779F8'} />
      <h6 className="title">
        O e-mail de redefinição de senha foi enviado para{" "}
        <strong> {dataForgotPassword?.email}</strong>
      </h6>
      <p className="text-light">
        Verifique sua caixa de entrada para redefinir sua senha. Se não recebeu
        nosso e-mail, procure na pasta de lixo eletrônico.
      </p>
    </ContainerForgotPasswordSuccess>
  );
};
