import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { GET_PURCHASE, api, apiTokeUser } from '@/services'
import { useRegister } from '@/shared/hooks//useRegister'
import { IOrder } from '@/types'
import { TypeEnum, useError } from '@/shared/hooks/useDialog'
import { useParams } from 'next/navigation'

export function useOrder () {
    const params = useParams()
    const { id } = params
    const { authenticationUser, isLoading } = useRegister()
    const [dataOrder, setDataOrder] = useState<IOrder>()
    const { showErrorDialog } = useError();
    const [loading, setLoading] = useState<boolean>(isLoading)

    const callErrorDialogComponent = (message: string, type?: string) => {
        showErrorDialog(message, type ?? TypeEnum.INFO);
    };

    const handleLoadOrder = useCallback(async () => {
        try {
            if (id) {
                setLoading(true)
                const { data } = await apiTokeUser.get(`${GET_PURCHASE}/${id}`)

                setDataOrder(data)
                setLoading(false)
            }
        } catch (err: any) {
            setLoading(false)
            console.log('err', err)
        }
    }, [id])

    const handleCopyPix = useCallback(() => {
        const isContent = (document.getElementById('chave-pix') as HTMLTextAreaElement);

        if (isContent) {
            const textToCopy = isContent.innerText || isContent.textContent;
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    callErrorDialogComponent("Código copiado.", TypeEnum.SUCCESS);
                })
                .catch((error) => {
                    console.error('Erro ao copiar: ', error);
                    callErrorDialogComponent("Erro ao copiar código.", TypeEnum.ERROR);
                });
        }

    }, [showErrorDialog]);

    useEffect(() => {
        if (authenticationUser) {
            handleLoadOrder()
        }
    }, [handleLoadOrder, authenticationUser, id])

    return {
        dataOrder,
        handleCopyPix,
        loading,
    }
}   