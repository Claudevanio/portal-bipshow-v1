'use client'
import React from 'react';
import { ContainerFAQApp } from './styles';
import { useProfile } from '@/shared/hooks/useProfile';
import { useRouter } from 'next/navigation';
import { CircularProgress } from '@mui/material';

export const FAQApp: React.FC = () => {
    const { loading } = useProfile();
    const router = useRouter()

    const Rectangle = ({ title, description }: any) => {
        const handleClick = () => {
            callFileViewer(title, description);
        };

        return <div onClick={handleClick} className="rectangle">{description}</div>
    };

    const callFileViewer = (title: string, description: string) => {
        router.push(`/viewer-app/${title}/${description}`);
    };

    return (
        <ContainerFAQApp>
            {loading && (
                <CircularProgress/>
            )}
            <div className='title-center'>
                <h2 className='title'>
                    Central de dúvidas
                </h2>
            </div>
            <div className='retangulos'>
                <Rectangle title={"cancelar-compra"} description={"Compra Cancelada"} />
                <Rectangle title={"evento-cancelado"} description={"Evento cancelado"} />
                <Rectangle title={"meia-entrada"} description={"Meia entrada"} />
            </div>
        </ContainerFAQApp>
    );
};