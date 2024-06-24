import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ContainerCardBanner, Image, ImageCarroselBackground, ImageContainer } from './styles';
import { IEvent } from '@/types';

export const CardBanner: React.FC<IEvent> = ({ image, slug }) => {
  const router = useRouter();

  const handleClickOpenEvent = useCallback(
    (isSlug?: number | string) => {
      if (isSlug) router.push(`/evento/${isSlug}`);
    },
    [router]
  );

  return (
    <ContainerCardBanner className="d-flex w-100" type="button" onClick={() => handleClickOpenEvent(slug)}>
      <ImageContainer image={image ? `${image[0] === '/' ? process.env.URL_API + image : image}` : ''}>
        <ImageCarroselBackground image={image ? `${image[0] === '/' ? process.env.URL_API + image : image}` : ''}></ImageCarroselBackground>
        <Image src={image ? `${image[0] === '/' ? process.env.URL_API + image : image}` : ''} />
      </ImageContainer>
    </ContainerCardBanner>
  );
};
