import React, { useState } from 'react';
import { useAuth } from '@/shared/hooks/useAuth';
import { ContainerFaceDetection } from './styles';
import { CameraDetection } from './CameraDetection';
import { Check, Close } from '@mui/icons-material';

export const FaceDetectionComponent: React.FC = () => {
  const { onToPhoto, onAddPhoto } = useAuth();
  const [isImageSrc, setIsImageSrc] = useState<string>();
  const [isIdentification, setIsIdentification] = useState<boolean>(false);

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
