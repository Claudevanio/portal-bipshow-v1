import React from 'react';

export const Interrogation: React.FC<{ width: number; height: number; color: string }> = ({ width, height, color }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 22 39" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.85196 32.3302C7.68693 32.5156 7.53314 32.7109 7.39146 32.9152C7.24622 33.1326 7.13007 33.3687 7.04608 33.6172C6.93543 33.8383 6.85783 34.0749 6.81583 34.3192C6.79699 34.5788 6.79699 34.8395 6.81583 35.0992C6.80286 35.6108 6.908 36.1183 7.12283 36.5811C7.29518 37.0651 7.57016 37.5046 7.92827 37.8686C8.28639 38.2325 8.71888 38.5119 9.19511 38.6871C9.65447 38.8934 10.1512 39 10.6534 39C11.1556 39 11.6523 38.8934 12.1116 38.6871C12.5879 38.5119 13.0204 38.2325 13.3785 37.8686C13.7366 37.5046 14.0116 37.0651 14.1839 36.5811C14.3543 36.107 14.4325 35.6037 14.4142 35.0992C14.4171 34.5859 14.3203 34.0771 14.1293 33.602C13.9384 33.1268 13.657 32.6947 13.3013 32.3302C12.9445 31.9647 12.5201 31.6746 12.0525 31.4766C11.5848 31.2786 11.0832 31.1767 10.5766 31.1767C10.07 31.1767 9.56844 31.2786 9.10079 31.4766C8.63315 31.6746 8.20871 31.9647 7.85196 32.3302ZM10.5766 2.40538e-06C8.55448 -0.00131515 6.56766 0.538659 4.81611 1.56559C3.06455 2.59252 1.61005 4.07018 0.598981 5.84987C0.321319 6.29375 0.134882 6.79012 0.0508811 7.30912C-0.0331195 7.82812 -0.0129489 8.35903 0.110186 8.8699C0.233321 9.38078 0.456874 9.86106 0.767393 10.2819C1.07791 10.7027 1.46898 11.0553 1.91707 11.3185C2.36516 11.5817 2.86102 11.7501 3.37481 11.8135C3.8886 11.8769 4.40971 11.8341 4.90678 11.6875C5.40386 11.541 5.86662 11.2938 6.26724 10.9608C6.66786 10.6278 6.99805 10.2158 7.23795 9.74977C7.57606 9.15463 8.06291 8.66085 8.6492 8.31842C9.2355 7.976 9.90041 7.79709 10.5766 7.79982C11.5944 7.79982 12.5705 8.2107 13.2902 8.94208C14.0099 9.67345 14.4142 10.6654 14.4142 11.6997C14.4142 12.734 14.0099 13.726 13.2902 14.4574C12.5705 15.1888 11.5944 15.5996 10.5766 15.5996C9.55884 15.5996 8.58275 16.0105 7.86307 16.7419C7.14339 17.4733 6.73907 18.4652 6.73907 19.4995V23.3995C6.73907 24.4338 7.14339 25.4257 7.86307 26.1571C8.58275 26.8885 9.55884 27.2994 10.5766 27.2994C11.5944 27.2994 12.5705 26.8885 13.2902 26.1571C14.0099 25.4257 14.4142 24.4338 14.4142 23.3995V22.6975C16.9522 21.7616 19.0859 19.9489 20.4421 17.5764C21.7984 15.2038 22.2909 12.4224 21.8337 9.71815C21.3765 7.01394 19.9986 4.55906 17.9409 2.78265C15.8831 1.00623 13.2765 0.0212895 10.5766 2.40538e-06Z"
        fill={color}
      />
    </svg>
  );
};
