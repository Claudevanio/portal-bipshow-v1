import React from 'react';

export const Phone: React.FC<{ width: number; height: number, color: string }> = ({ width, height, color }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 2.5H8C7.20435 2.5 6.44129 2.81607 5.87868 3.37868C5.31607 3.94129 5 4.70435 5 5.5V19.5C5 20.2956 5.31607 21.0587 5.87868 21.6213C6.44129 22.1839 7.20435 22.5 8 22.5H16C16.7956 22.5 17.5587 22.1839 18.1213 21.6213C18.6839 21.0587 19 20.2956 19 19.5V5.5C19 4.70435 18.6839 3.94129 18.1213 3.37868C17.5587 2.81607 16.7956 2.5 16 2.5ZM17 19.5C17 19.7652 16.8946 20.0196 16.7071 20.2071C16.5196 20.3946 16.2652 20.5 16 20.5H8C7.73478 20.5 7.48043 20.3946 7.29289 20.2071C7.10536 20.0196 7 19.7652 7 19.5V18.5H17V19.5ZM17 16.5H7V5.5C7 5.23478 7.10536 4.98043 7.29289 4.79289C7.48043 4.60536 7.73478 4.5 8 4.5H16C16.2652 4.5 16.5196 4.60536 16.7071 4.79289C16.8946 4.98043 17 5.23478 17 5.5V16.5Z" fill={color} />
    </svg>
  );
};
