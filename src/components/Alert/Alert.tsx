import React, { useMemo } from 'react';
import { Info } from '@/components/icons/Info';
import { IAlert } from '@/types';
import { ContainerAlert } from './styles';
import { IAlertComponent } from './interface';

export const Alert: React.FC<IAlertComponent> = ({ variant, text, html }) => {
  const isVariant = useMemo(() => {
    switch (variant) {
      case IAlert.WARNING:
        return {
          title: 'Atenção',
          icon: <Info width={24} height={24} 
            color='#FFAD0D'
          />,
        };
        break;
      case IAlert.ERROR:
        return {
          title: 'Atenção',
          icon: <Info width={24} height={24} color={"#F65252"} />,
        };
        break;
      default:
        return {
          title: 'Atenção',
          icon: <Info width={24} height={24} color='#FFAD0D' />,
        };
    }
  }, [variant]);

  return (
    <ContainerAlert variant={variant}>
      <div className="header-alert">
        {isVariant.icon}
      </div>
      <div className="text-alert">
        <h6 className="title">{isVariant.title}</h6>
        {text && (
            <p className='text-light'>{text}</p>
        )}
        {html && html}
      </div>
    </ContainerAlert>
  );
};
