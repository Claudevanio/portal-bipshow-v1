import React, { useMemo } from 'react';
import { ContainerAvatar } from './styles';
import { IAvatar } from './interface';
import Image from 'next/image';

export const LegacyAvatar: React.FC<IAvatar> = ({ username, image, variant = 'small', className = '' }) => {
  const size = useMemo(() => {
    switch (variant) {
      case 'small':
        return {
          width: 32,
          height: 32,
        };
      case 'medium':
        return {
          width: 140,
          height: 140,
        };
      default:
        return {
          width: 32,
          height: 32,
        };
    }
  }, [variant]);

  return (
    <ContainerAvatar variant={variant}>
      {image ? <img src={image} alt={username} /> : (       
        <Image
        className={('w-12 h-12 rounded-full bg-background p-2 border-2 border-gray') + className }
        src={image ?? '/Person.svg'}
        alt="Avatar"
        width={size.width}
        height={size.height}
      />
      )}
    </ContainerAvatar>
  );
};
