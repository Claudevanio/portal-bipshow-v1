import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { AuthProvider } from "@/shared/hooks/useAuth";
import { Loading } from "@/components/Loading";
import { useRegister } from "@/shared/hooks/useRegister";
import { IUser } from "@/types";
import { ContainerLoginAndRegister } from "./styles";
import { Login } from "./Login";
import { Register } from "./Register";
import { ILoginAndRegister } from "./interface";

export const LoginAndRegister: React.FC<ILoginAndRegister> = ({
    type,
    onClickPurchase,
    handleChangeType,
}) => {
    const { defaultValues, setDefaultValues } = useRegister();

    useEffect(() => {
        
        setDefaultValues({
        });

    }, []);

    const methods = useForm<IUser>({
        defaultValues,
    });

    return (
        <ContainerLoginAndRegister>
            {/* <Loading open={isLoading} /> */}
            <div className="container-form">
                {type === "login" && (
                    <FormProvider {...methods}>
                        <AuthProvider>
                            <Login
                                onClickPurchase={onClickPurchase}
                                handleChangeType={handleChangeType}
                            />
                        </AuthProvider>
                    </FormProvider>
                )}
                {type === "register" && (
                    <FormProvider {...methods}>
                        <AuthProvider>
                            <Register
                                handleChangeType={handleChangeType}
                                onClickPurchase={onClickPurchase}
                            />
                        </AuthProvider>
                    </FormProvider>
                )}
            </div>
        </ContainerLoginAndRegister>
    );
};
