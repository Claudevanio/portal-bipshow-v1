import React from 'react';
import { useProfile } from '@/shared/hooks/useProfile';  
import { ContainerFilewView } from './styles';
import { ButtonBack } from '@/components/ButtonBack'; 
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';

export const FileViewer: React.FC<{ isAppView: boolean, filename: string, title: string }> = ({ isAppView, filename, title }) => {
    const { loading } = useProfile();
    const router = useRouter();
    const PreviewFile = () => {
        return (
            <iframe
                src={`/html/${filename}.html`}
                title={title}
                width="100%"
                height="100%"
                style={{
                    minHeight: '60vh',
                }}
            />
        )
    }

    return (
        <ContainerFilewView>
            {loading && (
                <CircularProgress/>
            )}
            <div className='fab'>
                <ButtonBack onClick={() => {
                    switch (filename) {
                        case "meia-entrada":
                        case "evento-cancelado":
                        case "cancelar-compra":
                            if (isAppView === true) {
                                router.push("/faq-app")
                            } else {
                                router.push("/faq")
                            }
                            break;
                        case "privacidade":
                        case "termos":
                            router.push("/")
                            break;
                        default:
                            router.push("/")
                            break;
                    }
                }}
                />
            </div>
            {PreviewFile()}
        </ContainerFilewView>
    );
};
