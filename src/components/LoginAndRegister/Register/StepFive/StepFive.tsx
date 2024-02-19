import React, { useEffect } from 'react';

import { Photo } from '@/components/icons/Photo';
import { PhotoTwo } from '@/components/icons/PhotoTwo';
import { PhotoThree } from '@/components/icons/PhotoThree';
import { PhotoFour } from '@/components/icons/PhotoFour';
import { useAuth } from '@/shared/hooks/useAuth';
import { Button } from '@/components/Form/Button';
import { Check } from '@/components/icons/Check';
import { theme } from '@/shared';
import { Warning } from '@/components/icons/Warning';
import { Danger } from '@/components/icons/Danger';
import { FaceDetectionComponent } from './FaceDetection';
import { ContainerStepFive } from './styles';
import { ButtonBack } from '@/components/ButtonBack';
import { AccountBoxOutlined, Flare, FlareOutlined, WbSunny, WbSunnyOutlined } from '@mui/icons-material';
import { Sunglasses } from '@/components/icons/Sunglasses';

export const StepFive: React.FC<{handleChangeType: any}> = ({handleChangeType}) => {
  const {
    toPhoto, photoAvatar, onAddPhoto, photoInvalida, onToPhoto,  setIsStepper, isStepper
  } = useAuth();

  return (
    <ContainerStepFive variant={photoInvalida}>
      {!photoAvatar && toPhoto && <FaceDetectionComponent
        handleChangeType={handleChangeType}
      />}
      {!toPhoto && !photoAvatar && (
        <div className="help">
          <ul
            style={{
              listStyle:'circle !important',
            }}
          >
            <li
              className='flex items-center gap-4'
            >
              <FlareOutlined
                className='w-5 h-5'/>
              <p>
                Faça a foto em um fundo claro e sem texturas
                diferentes (ex.: parede)
              </p>
            </li>
            <li
              className='flex items-center gap-4'
            >
              <WbSunnyOutlined
                className='w-5 h-5'
              />
              <p>
                Procure um lugar bem iluminado, mas evite tirar
                fotos com foco de luz atrás da pessoa
              </p>
            </li>
            <li
              className='flex items-center gap-4'
            >
              <div
                className='w-5 h-5'
              >
                <Sunglasses/>
              </div>
              <p>
                Não utilize acessórios, como óculos, máscara,
                boné etc.
              </p>
            </li>
            <li
              className='flex items-center gap-5'
            >
              <AccountBoxOutlined
                className='w-5 h-5'
              />
              <p>
                Enquadre somente o rosto de frente na foto, sem
                sorrir
              </p>
            </li>
          </ul>
          <div
            className='w-full mt-4 flex items-center gap-4'
          >
            <ButtonBack
              onClick={() => setIsStepper(isStepper - 1)}
            />
            <Button
              className='w-full'
              type="button"
              text="Tirar foto"
              onClick={() => onToPhoto(true)}
              />
          </div>
        </div>
      )}
      {photoAvatar &&  (
        <div className="photo-avatar-confirm">
          <div className="avatar">
            <img src={photoAvatar} alt="Foto do rosto" />
            {/* <div className="check">
              {photoInvalida === 200 && (
              <Check
                width={18}
                height={18}
                color={"#FFFFFF"}
              />
              )}
              {photoInvalida === 400 && (
              <Danger
                width={18}
                height={18}
                color={'#F65252'}
              />
              )}
              {photoInvalida === 0 && (
              <Warning
                width={18}
                height={18}
                color={'#CA9F00'}
              />
              )}
            </div> */}
          </div>
          {/* <Button
            type="button"
            text="Alterar foto"
            variant="outline"
            onClick={() => onAddPhoto(undefined)}
          /> */}
          <div className="texts">
            <p className="title text-center">
              {' '}
              {photoAvatar && (photoInvalida !== 0 && photoInvalida !== 400 && photoInvalida !== 200) && 'Pronto!'}
              {photoAvatar && photoInvalida === 400 && 'Poxa! Sua foto falhou.'}
              {photoAvatar && photoInvalida === 0 && 'Sua foto está em análise.'}
              {photoAvatar && photoInvalida === 200 && 'Sua conta foi criada!'}
              {!photoAvatar && 'Verifique!'}
            </p>
            <p className="body text-center">
              {photoAvatar && photoInvalida === 400
                                && 'Tente novamente seguindo à risca as dicas.'}
              {photoAvatar && photoInvalida === 0
                                && <>{'Sua face foi enviada para análise. Enquanto isso, comece a usar o Bipshow! \n\n'} <br/> </>}
              {photoAvatar && photoInvalida === 200
                                && 'Para utilizar seus acessos é necessário que sua biometria esteja cadastrada!'}
            
              {photoAvatar && !photoInvalida && 'Agora Vamos Validar sua Foto!'}
              
              {!photoAvatar && (
                'Para finalizar você precisa ter uma foto cadastrada!'
              )}
            </p>
          </div>
        </div>
      )}
    </ContainerStepFive>
  );
};
