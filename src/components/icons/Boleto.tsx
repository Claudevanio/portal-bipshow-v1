import React from 'react';

export const Boleto: React.FC<{ width: number; height: number, color: string }> = ({ width, height, color }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.94434 6.71289H4.94434V18.7129H2.94434V6.71289ZM5.94434 6.71289H6.94434V18.7129H5.94434V6.71289ZM7.94434 6.71289H10.9443V18.7129H7.94434V6.71289ZM11.9443 6.71289H12.9443V18.7129H11.9443V6.71289ZM14.9443 6.71289H16.9443V18.7129H14.9443V6.71289ZM17.9443 6.71289H20.9443V18.7129H17.9443V6.71289ZM21.9443 6.71289H22.9443V18.7129H21.9443V6.71289Z" fill={color} />
    </svg>
  );
};
