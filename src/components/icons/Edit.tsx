import React from 'react';

export const Edit: React.FC<{ width: number; height: number, color: string }> = ({ width, height, color }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.0063 9.73093L15.9463 10.6709L6.86626 19.7309H5.94626V18.8109L15.0063 9.73093ZM18.6063 3.73093C18.3563 3.73093 18.0963 3.83093 17.9063 4.02093L16.0763 5.85093L19.8263 9.60093L21.6563 7.77093C22.0463 7.38093 22.0463 6.73093 21.6563 6.36093L19.3163 4.02093C19.1163 3.82093 18.8663 3.73093 18.6063 3.73093ZM15.0063 6.92093L3.94626 17.9809V21.7309H7.69626L18.7563 10.6709L15.0063 6.92093Z" fill={color} />
    </svg>

  );
};
