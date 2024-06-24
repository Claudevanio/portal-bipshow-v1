import React, { useEffect } from "react";
import { ContainerOrder } from "./styles";
import { useOrder } from "./useOrder";

import { Button } from "@/components/Form/Button";
import { Loading } from "@/components/Loading";
import { Box, CircularProgress } from '@mui/material';
import { useRegister } from '@/shared/hooks/useRegister';
import { useAuth } from '@/shared/hooks/useAuth';

export const Order: React.FC = () => {
    const { dataOrder, handleCopyPix, loading } = useOrder();

    const { user } = useRegister()
    const { isAuthModalOpen, setIsAuthModalOpen }  = useAuth()

    useEffect(() => {
        const localStoragUser = localStorage.getItem('@tokenUser')
        if (!user && !localStoragUser && !isAuthModalOpen) {
            setIsAuthModalOpen(true)
        }
    }, [user, setIsAuthModalOpen])

    return (
        <ContainerOrder>
            {
                user && loading ? <Box
                    className="!flex !items-center !justify-center w-full h-full"
                >
                    <CircularProgress 
                        color="primary" 
                        size={200} 
                        thickness={2}
                    />
                </Box> : !(dataOrder?.sucesso) ? <>
                    <p
                        className="text-center text-xl pt-12 font-bold"
                    >
                        {
                            dataOrder?.mensagem
                        }

                    </p>
                 </> : 
                <>

                    <Box
                        className="!flex !items-center !justify-center"
                    >
                        {(dataOrder &&
                            dataOrder.pedido &&
                            dataOrder.pedido.pagamento &&
                            dataOrder.pedido.pagamento.urlPagamento &&
                            dataOrder?.pedido?.status === "RESERVADO") ||
                        dataOrder?.pedido?.status === "AGUARDANDO" ? (
                            <div className="payment flex flex-col items-center gap-4 justify-center p-8 w-full md:!w-1/3 ">
                                <h4 className="title">Fazer o pagamento via PIX</h4>
                                <p className="normal text-light text-center">
                                    Aguardando confirmação do pagamento via Pix para <br/>
                                    liberação dos bilhetes do pedido.
                                </p>
                                <strong>
                                    Valor total a pagar{" "}
                                    {dataOrder.pedido.valor.toLocaleString("pt-BR", {
                                        minimumFractionDigits: 2,
                                        style: "currency",
                                        currency: "BRL",
                                    })}
                                </strong>
                                <p className="normal text-light">Escaneie o QR code</p>
                                <img
                                    src={dataOrder.pedido.pagamento.urlPagamento}
                                    alt="QR Code"
                                />
                                <p className="normal text-light">
                                    ou se preferir, você pode pagar copiando e colando o
                                    seguinte código
                                </p>
                                <div className="min-w-96 w-full">
                                    <textarea
                                        rows={7}
                                        value={dataOrder.pedido.pagamento.textoPix}
                                        readOnly
                                        className='bg-grayLight w-full'
                                        id="chave-pix"
                                    />
                                </div>
                                <div className="w-full">
                                    <Button
                                        type="button"
                                        text="Copiar código"
                                        variant="medium"
                                        onClick={handleCopyPix}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="status">
                                <h4>
                                    Seu pedido foi:{" "} 
                                    <strong>
                                        {dataOrder?.pedido?.pagamento.status}
                                    </strong>
                                </h4>
                            </div>
                        )}
                    </Box>
                </>
            }
            {
                !user && <p
                    className="text-center text-xl pt-12 font-bold"
                >
                    Você precisa estar logado para acessar essa página.
                </p>
            }
        </ContainerOrder>
    );
};
