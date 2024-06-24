import React from 'react';

export const Home: React.FC<{ width: number; height: number; color: string }> = ({ width, height, color }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20.0001 7.99952L14.0001 2.73952C13.4501 2.24756 12.738 1.97559 12.0001 1.97559C11.2622 1.97559 10.5501 2.24756 10.0001 2.73952L4.00009 7.99952C3.68246 8.28359 3.42899 8.63207 3.25657 9.02176C3.08414 9.41145 2.99671 9.8334 3.00009 10.2595V18.9995C3.00009 19.7952 3.31617 20.5582 3.87877 21.1208C4.44138 21.6834 5.20445 21.9995 6.00009 21.9995H18.0001C18.7957 21.9995 19.5588 21.6834 20.1214 21.1208C20.684 20.5582 21.0001 19.7952 21.0001 18.9995V10.2495C21.0021 9.82508 20.9139 9.40506 20.7416 9.0172C20.5692 8.62934 20.3165 8.28247 20.0001 7.99952ZM14.0001 19.9995H10.0001V14.9995C10.0001 14.7343 10.1055 14.4799 10.293 14.2924C10.4805 14.1049 10.7349 13.9995 11.0001 13.9995H13.0001C13.2653 13.9995 13.5197 14.1049 13.7072 14.2924C13.8947 14.4799 14.0001 14.7343 14.0001 14.9995V19.9995ZM19.0001 18.9995C19.0001 19.2647 18.8947 19.5191 18.7072 19.7066C18.5197 19.8942 18.2653 19.9995 18.0001 19.9995H16.0001V14.9995C16.0001 14.2039 15.684 13.4408 15.1214 12.8782C14.5588 12.3156 13.7957 11.9995 13.0001 11.9995H11.0001C10.2044 11.9995 9.44138 12.3156 8.87877 12.8782C8.31616 13.4408 8.00009 14.2039 8.00009 14.9995V19.9995H6.00009C5.73488 19.9995 5.48052 19.8942 5.29299 19.7066C5.10545 19.5191 5.00009 19.2647 5.00009 18.9995V10.2495C5.00027 10.1075 5.03069 9.96721 5.08931 9.8379C5.14794 9.70858 5.23343 9.59323 5.3401 9.49952L11.3401 4.24952C11.5226 4.0892 11.7572 4.00078 12.0001 4.00078C12.243 4.00078 12.4776 4.0892 12.6601 4.24952L18.6601 9.49952C18.7668 9.59323 18.8523 9.70858 18.9109 9.8379C18.9695 9.96721 18.9999 10.1075 19.0001 10.2495V18.9995Z"
        fill={color}
        fillOpacity="0.38"
      />
    </svg>
  );
};
