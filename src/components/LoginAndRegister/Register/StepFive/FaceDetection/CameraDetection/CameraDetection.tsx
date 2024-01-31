// import { Camera } from '@mediapipe/camera_utils';
// import { FaceDetection } from '@mediapipe/face_detection';
import React, { useRef, useState } from 'react';
// import { CameraOptions, useFaceDetection } from 'react-use-face-detection';
import Webcam from 'react-webcam';
import { useAuth } from '@/shared/hooks/useAuth';
import { useToast } from '@/shared/hooks/useToast';
import { TypeEnum, useError } from '@/shared/hooks/useDialog';
import { CameraDetectionProps } from './interface';
import { Close, RotateRight } from '@mui/icons-material';
import { Button } from '@/components/Form/Button';
import { ButtonBack } from '@/components/ButtonBack';

export const CameraDetection: React.FC<CameraDetectionProps> = ({ setIsImageSrc }) => {
  const { onToPhoto } = useAuth();
  const { toast } = useToast();
  const webcamRef = useRef<any>(null);
  const { showErrorDialog } = useError();
  // const {
  //   webcamRef, boundingBox,
  // } = useFaceDetection({
  //   faceDetectionOptions: {
  //     model: 'short',
  //   },
  //   faceDetection: new FaceDetection({
  //     locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
  //   }),
  //   camera: ({
  //     mediaSrc, onFrame, width, height,
  //   }: CameraOptions) => new Camera(mediaSrc, {
  //     onFrame,
  //     width,
  //     height,
  //   }),
  // });
  const [isRotate, setIsRotate] = useState<boolean>(true);
  const callErrorDialogComponent = (message: string, type?: string) => {
    showErrorDialog(message, type ?? TypeEnum.INFO);
  };

  const capture = React.useCallback(() => {
    const isCurrent = (webcamRef as any).current;
    const imageSrc = isCurrent.getScreenshot();

    setIsImageSrc(imageSrc);
  }, [webcamRef, setIsImageSrc]);

  // useEffect(() => {
  //   if (boundingBox) {
  //     boundingBox.forEach((item) => {
  //       if (item.xCenter >= 0.25 && item.xCenter < 0.5 && item.yCenter >= 0.25 && item.yCenter < 0.5) {
  //         setIsIdentification(true);
  //       } else {
  //         setIsIdentification(false);
  //       }
  //     });
  //   }
  // }, [boundingBox, setIsIdentification]);

  return (
    <React.Fragment>
      <div className='wrapper'>
        <div className="filter">
          <Webcam
            ref={webcamRef}
            forceScreenshotSourceSize
            videoConstraints={{
              facingMode: 'user',
              height: 400
            }}
            className="webcam"
            onUserMediaError={(error) => {
              onToPhoto(false);
              callErrorDialogComponent(String(error) ?? 'Permita que consigamos acessar sua câmera para tirar a foto.', TypeEnum.INFO);
            }}
            audio={false}
            mirrored={isRotate}
            screenshotFormat="image/jpeg"
            />
      </div>
      </div>
      {/* {boundingBox.map((box, index) => (
        <div
          className="face-detection"
          key={`${index + 1}`}
        />
      ))} */}
      
      <div
            className='w-full flex items-center gap-4'
          >
            <ButtonBack
              onClick={() => onToPhoto(false)}
            />
            <Button
                text="Tirar foto"
                variant="medium"
                type="button"
                onClick={capture}
              />
          </div>
      <div className="hidden">
        {/* <button type="button" className="not-photo" onClick={() => onToPhoto(false)}>
          <Close width={24} height={24} className='text-danger' />
        </button> */}
        {/* <button type="button" onClick={capture} className="">
          {/* <div /> */}
        {/* </button> */}
        {/* <button type="button" className="not-photo rotate" onClick={() => setIsRotate(!isRotate)}>
          <RotateRight
            width={24}
            height={24}
            className='text-primary'
          />
        </button> */}
      </div>
    </React.Fragment>
  );
};
