import React from 'react';

export const Trash: React.FC<{ width: number; height: number; color: string; fillOpacity?: string }> = ({ width, height, color, fillOpacity }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 6.5H16V5.5C16 4.70435 15.6839 3.94129 15.1213 3.37868C14.5587 2.81607 13.7956 2.5 13 2.5H11C10.2044 2.5 9.44129 2.81607 8.87868 3.37868C8.31607 3.94129 8 4.70435 8 5.5V6.5H4C3.73478 6.5 3.48043 6.60536 3.29289 6.79289C3.10536 6.98043 3 7.23478 3 7.5C3 7.76522 3.10536 8.01957 3.29289 8.20711C3.48043 8.39464 3.73478 8.5 4 8.5H5V19.5C5 20.2956 5.31607 21.0587 5.87868 21.6213C6.44129 22.1839 7.20435 22.5 8 22.5H16C16.7956 22.5 17.5587 22.1839 18.1213 21.6213C18.6839 21.0587 19 20.2956 19 19.5V8.5H20C20.2652 8.5 20.5196 8.39464 20.7071 8.20711C20.8946 8.01957 21 7.76522 21 7.5C21 7.23478 20.8946 6.98043 20.7071 6.79289C20.5196 6.60536 20.2652 6.5 20 6.5ZM10 5.5C10 5.23478 10.1054 4.98043 10.2929 4.79289C10.4804 4.60536 10.7348 4.5 11 4.5H13C13.2652 4.5 13.5196 4.60536 13.7071 4.79289C13.8946 4.98043 14 5.23478 14 5.5V6.5H10V5.5ZM17 19.5C17 19.7652 16.8946 20.0196 16.7071 20.2071C16.5196 20.3946 16.2652 20.5 16 20.5H8C7.73478 20.5 7.48043 20.3946 7.29289 20.2071C7.10536 20.0196 7 19.7652 7 19.5V8.5H17V19.5Z"
        fill={color}
        fill-opacity={fillOpacity}
      />
    </svg>
  );
};
