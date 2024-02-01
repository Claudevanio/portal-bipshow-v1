'use client'
import React, { Component, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import { useEffectOnce } from '@/hooks';
import { useEvent } from '@/shared/hooks/useEvents';
import { CardBanner } from './CardBanner';
import { IAddress } from '@/types';


export const CarouselComponent = (
  {
    cp
  } : {
    cp: any
  }
) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };

  useEffectOnce(() => {
    const slick = document.querySelector('.slick-track'); 
  });

  // const [windowSize, setWindowSize] = useState(window.innerWidth);
  // const handleWindowResize = () => {
  //   setWindowSize(window.innerWidth);
  // };
  // useEffect(() => {
  //   window.addEventListener('resize', handleWindowResize);
  //   return () => {
  //     window.removeEventListener('resize', handleWindowResize);
  //   };
  // }, []);

  // window.addEventListener('resize', handleWindowResize);

  const sliderRef = useRef<any>();

  const handlePrevious = () => {
    sliderRef.current.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };
    return (
      <div
        className='w-[100%] relative'
      >
        <button onClick={handlePrevious}
            className='absolute left-6 top-[50%] z-[1] rotate-[-2deg] max-w-[26rem]'
            >
          <Image
            src={'/setaEsquerda.svg'}
            alt="Seta Esquerda"
            width={30}
            height={55}
          /> 
          </button>
        <button onClick={handleNext}
            className='absolute right-6 top-[50%] z-[1] rotate-[-2deg] max-w-[26rem]'
        > 
          <Image
            src={'/setaDireita.svg'}
            alt="Seta Direita"
            width={30}
            height={55}
          />
        </button>
        <Slider {...settings} ref={sliderRef}>
          <Image
            className='w-[100%] h-[100%]'
            src={'/bannerPrincipal.svg'}
            alt="Logo"
            width={1920}
            height={600}
          />
          
          {cp?.eventos.map((item : any) => {
              // if (windowSize <= 700) {
              //   return (
              //     <div className="item" key={item.nome}>
              //       <CardBanner image={item?.imagens?.mobiledestaque?.link} address={item.endereco as IAddress} endDate={item.dataFim} startDate={item.dataRealizacao} hour={item.horaInicio} title={item.nome} id={item.id} slug={item.link} />
              //     </div>
              //   );
              // }
              return (
                <div className="item" key={item.nome}>
                  <CardBanner image={item?.imagens?.destaque?.link} address={item.endereco as IAddress} endDate={item.dataFim} startDate={item.dataRealizacao} hour={item.horaInicio} title={item.nome} id={item.id} slug={item.link} />
                </div>
              );
            })}
        </Slider>
      </div>
    );
}
