import React, { useEffect, useState } from 'react';
import { ContainerLoading } from './styles';
import { ILoading } from './interface';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  `;

const Circle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 76px;
    height: 76px;
    border-radius: 50%;
    background: white;
    box-shadow: 0 0 0 2px ${"#8779F8"};
  `;

const Progress = styled.div<{ progress: number }>`
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 2px solid ${"#8779F8"};
    border-top-color: transparent;
    animation: ${rotate} 1s linear infinite;
    transform: rotate(${({ progress }) => progress * 360}deg);
  `;

const ImagePulsando = styled.img`
  width: 60%;
  height: auto;
  animation: bounce 1s infinite alternate linear;

   @keyframes bounce {
    to {
      transform: scale(1.2);
    }
  }
`;

export const Loading: React.FC<ILoading> = ({ open }) => {

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress => (prevProgress + 1) % 100);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ContainerLoading className={`${open ? '' : 'disable'}`}>
      <Circle>
        {/* <ImagePulsando src="/assets/favicon-32x32.png" /> */}
        <Progress progress={progress / 100} />
      </Circle>
    </ContainerLoading>
  );
};
