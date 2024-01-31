'use client'
import React, { Component, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';

export const CarouselComponent = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };


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
          <Image
            className='w-[100%] h-[100%]'
            src={'/bannerPrincipal.svg'}
            alt="Logo"
            width={1920}
            height={600}
          />
        </Slider>
      </div>
    );
}
