'use client'
import React, { useEffect } from 'react';
import {
  TransformComponent, TransformWrapper,
} from 'react-zoom-pan-pinch';
import { ISector } from '@/types';
import { theme } from '@/shared';
import { ContainerRanks } from './styles';
import { Chairs } from './Chairs';
import { ZoomIn, ZoomOut } from '@mui/icons-material';
import { GradientBorder } from '@/components';

export const Ranks: React.FC<ISector> = ({ fileiras }) => {

  const contentRef = React.useRef<any>(null);

  const [scale, setScale] = React.useState<number>(1);
  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    const hasOverflow = contentRef.current.scrollWidth > 10;
    if (!hasOverflow) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    if (contentRef.current) {
      contentRef.current.style.cursor = 'grabbing';

      const start = e.clientX;
      const scrollLeft = contentRef.current.scrollLeft;

      const handleMouseMove = (e: MouseEvent) => {
        const x = e.clientX - start;
        if (contentRef.current) {
          contentRef.current.scrollLeft = scrollLeft - x;
        }
      };

      const handleMouseUp = () => {
        if (contentRef.current) {
          contentRef.current.style.cursor = 'grab';
        }

        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  };

  return (
    <ContainerRanks>
      <TransformWrapper
        initialScale={1}
        onTransformed={(e) => {
          
          e.state?.scale && setScale(e.state?.scale);
        }}
        wheel={{
          step: 0.1,
        }}
        pinch={{
          step: 0.1,
        }}
        doubleClick={{
          step: 0.2,
        }}
      >
        {({ zoomIn, zoomOut, instance  }) => (
          <React.Fragment>
            <TransformComponent>
              <div className="ranks">
                <div className="content-ranks"
                  ref={contentRef}
                  //scrollX on drag
                  onMouseDown={handleDragStart}
                >
                  <div className="letters">
                    {fileiras.map((item: any, index: number) => (
                      <h6 className="title" key={index}>{item.letra}</h6>
                    ))}
                  </div>
                  <div className={`${fileiras.find((item) => item.cadeiras.length >= 29) ? 'decreaseWidth' : ''}`}>
                    {fileiras.map((item) => (
                      <Chairs key={item.letra} chairs={item.cadeiras} id={item.id} letra={item.letra} />
                    ))}
                  </div>
                  <div className="letters">
                    {fileiras.map((item) => (
                      <h6 className="title">{item.letra}</h6>
                    ))}
                  </div>
                </div>
              </div>
            </TransformComponent>
            
            <div className="tools">
              <GradientBorder
                borderStyle={{
                  width: 'fit-content',
                  borderRadius: '1rem',
                  padding: '1px'
                }}
                innerStyle={{
                  borderRadius: '1rem'
                }}
              >
                <div
                  className='flex items-center gap-2'
                >
                  <button type="button" onClick={() => zoomOut()} className={`${(scale && scale && scale > 1) ? 'active' : ''}`}>
                    <ZoomOut width={32} height={32} fillOpacity={(scale && scale && scale > 1) ? 1 : 0.25} />
                  </button>
                  <span className="dark">
                    {Number((scale ?? 0) * 100).toFixed(0)}
                    %
                  </span>
                  <button type="button" onClick={() => zoomIn()} className={`${(scale && scale && scale === 8 )? 'disabled' : ''}`}>
                    <ZoomIn width={32} height={32} fillOpacity={(scale && scale && scale === 8 )? 0.25 : 1} />

                  </button>
                </div>

              </GradientBorder>

            </div>
          </React.Fragment>
        )}
      </TransformWrapper>
      <div>
        <h5
          className='text-textPrimary text-start pb-2 border-b-2 border-gray'
        >Legenda</h5>
        <div className="actions">
          <div className="legend">
            <div>
              <div />
              <span>Disponível</span>
            </div>
            <div>
              <div />
              <span>Selecionado</span>
            </div>
            
            <div>
              <div />
              <span>Ocupado</span>
            </div>
            
            <div>
              <div />
              <span>Cadeirante</span>
            </div>

          </div>
        </div>
      </div>
    </ContainerRanks>
  );
};
