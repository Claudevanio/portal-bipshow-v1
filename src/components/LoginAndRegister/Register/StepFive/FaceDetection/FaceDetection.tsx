'use client'
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/shared/hooks/useAuth';
import { ContainerFaceDetection } from './styles';
import { CameraDetection } from './CameraDetection';
import { Check, Close, QrCode } from '@mui/icons-material';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/Button/Button';
import { useFormContext } from 'react-hook-form';

export const FaceDetectionComponent: React.FC = () => {
  const { onToPhoto, onAddPhoto, getRegisterURLWithPayloadOnQuery } = useAuth();

  const { getValues } = useFormContext();
  
  const [isImageSrc, setIsImageSrc] = useState<string>();
  const [isIdentification, setIsIdentification] = useState<boolean>(false);

  const [windowSize, setWindowSize] = useState(window && window.innerWidth);
  const handleWindowResize = () => {
    if(!window) return;

    setWindowSize(window.innerWidth);
  };

  useEffect(() => {
    if(!window) return;
    
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  window.addEventListener('resize', handleWindowResize);


  const isMobile = windowSize < 768;

  const [continueOnDesktop, setContinueOnDesktop] = useState<boolean>(true);

  const newUrl = getRegisterURLWithPayloadOnQuery(getValues());

  if (!isMobile && !continueOnDesktop) 
    return (
      <div>
        <div/>
        <div
          className='flex flex-col items-center gap-4 w-full h-full py-2'
        >
          <p
            className='text-sm'
          >
            Para uma melhor experiência, pedimos que acesse de seu aparelho celular.
            <br/>
            Escaneie este QR Code para continuar no celular.
          </p> 
          <div
            className='min-h-[300px]'
          >
            <QRCodeSVG
              value={newUrl}
              size={300}
              bgColor='#ffffff'
              fgColor='#000000'
              level='Q'
              />
          </div>

            <span
              className='text-sm'
            >
              Se preferir, clique no botão abaixo para continuar no desktop
            </span>
          <Button
            onClick={() => setContinueOnDesktop(true)}
            variant='secondary'
            className=''
          >
            Continuar por aqui
          </Button>
          <div
            className='h-4 pt-4'
          >&nbsp;</div>
        </div>
      </div>
    )
  

  return (
    <ContainerFaceDetection>
      <div />
      {isImageSrc && (
        <div
          className='w-full flex items-center justify-center my-2'
        >
          <img src={isImageSrc} alt="Avatar" className="rounded-full !h-48 !w-48" />
        </div>
      )}
      {!isImageSrc && (
        <CameraDetection setIsIdentification={setIsIdentification} isIdentification={isIdentification} setIsImageSrc={setIsImageSrc} />
      )}
      
      {
        !isImageSrc && (
          <div
            className='w-full flex items-center justify-center gap-4 absolute bottom-[2.6rem] left-1'
          >
            <Button
              onClick={() => setContinueOnDesktop(false)}
              variant='secondary'
              className='hidden md:flex w-[50%]'
            >
              <QrCode/> Continuar no Celular
            </Button>
          </div>

        )
      }

      {!isImageSrc && (
        <p className="help">
          {isIdentification ? (
            'Rosto identificado'
          ) : (
            'Alinhe sua face ao centro da tela'
          )}
        </p>
      )}
      {
        isImageSrc && <p className='text-center h-8 text-sm'>
          Tudo certo? <br/> Clique no check para confirmar ou no X para tirar outra foto
        </p>
      }
      {isImageSrc && (
        <div className={`actions ${!isImageSrc ? 'margin' : ''}`}>
          <button type="button" className="not-photo" onClick={() => setIsImageSrc(undefined)}>
            <Close width={24} height={24} className="text-danger" />
          </button>
          <button
            type="button"
            className="success-photo"
            onClick={() => {
              onAddPhoto(isImageSrc);
              onToPhoto(false);
            }}
          >
            <Check width={24} height={24} className="text-primary" />
          </button>
        </div>
      )}
    </ContainerFaceDetection>
  );
};
