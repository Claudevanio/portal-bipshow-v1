import React, { useEffect, useState } from "react";
import { Input } from "@/components/Form/Input";
import { TELEFONEMask } from "@/shared/config/mask";
import { useFormContext } from "react-hook-form";
import { telefone } from "@/shared/config/regex";
import { useAuth } from "@/shared/hooks/useAuth";

import { ContainerStepTwo } from "./styles";
import { InputCode } from "@/components/Form/Input-code/InputCode";
import { useRegister } from "@/shared/hooks/useRegister";
import Link from "next/link";
import { SelectModal } from "@/components/Form/SelectModal";
import { findFlagUrlByIso2Code } from "country-flags-svg";

export const StepTwo: React.FC = () => {
    const { getValues, watch } = useFormContext();
    const {
        validateEmail,
        setEmailValidado,
        handleValidationEmail,
    } = useAuth();
    const [email, setEmail] = useState<string>("");

    const isEmail = watch("email");

    const getEmail = React.useCallback(() => {
        return email || isEmail;
    }, [email, isEmail]);

    return (
        <ContainerStepTwo>
           {validateEmail && <div>
                <div className="email-body">
                    Enviamos o código para o email{" "}
                    <p className="text">{getEmail()}</p> Digite-o abaixo
                    para validar seu email.
                </div>
                <InputCode
                    setCodigoValido={setEmailValidado}
                    getCode={handleValidationEmail}
                    dispositivo={getValues("email")}
                />
            </div>}
        </ContainerStepTwo>
    );
};
