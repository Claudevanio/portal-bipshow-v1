import React from 'react';

export const Info: React.FC<{ width: number; height: number, color: string }> = ({ width, height, color }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.0005 16.0003C11.8027 16.0003 11.6093 16.0589 11.4449 16.1688C11.2804 16.2787 11.1523 16.4349 11.0766 16.6176C11.0009 16.8003 10.9811 17.0014 11.0197 17.1954C11.0583 17.3893 11.1535 17.5675 11.2933 17.7074C11.4332 17.8472 11.6114 17.9425 11.8054 17.9811C11.9993 18.0196 12.2004 17.9998 12.3831 17.9242C12.5659 17.8485 12.722 17.7203 12.8319 17.5558C12.9418 17.3914 13.0005 17.1981 13.0005 17.0003C13.0005 16.7351 12.8951 16.4807 12.7076 16.2932C12.52 16.1056 12.2657 16.0003 12.0005 16.0003ZM22.6705 17.4703L14.6205 3.47027C14.3603 3.00379 13.9802 2.61523 13.5196 2.34474C13.0591 2.07425 12.5346 1.93164 12.0005 1.93164C11.4663 1.93164 10.9419 2.07425 10.4813 2.34474C10.0207 2.61523 9.64065 3.00379 9.38046 3.47027L1.38046 17.4703C1.11125 17.9243 0.966598 18.4413 0.9611 18.9691C0.955602 19.4969 1.08945 20.0168 1.34914 20.4763C1.60883 20.9358 1.98516 21.3187 2.44014 21.5863C2.89512 21.8539 3.41264 21.9967 3.94046 22.0003H20.0605C20.5925 22.0055 21.1164 21.8692 21.5784 21.6052C22.0403 21.3412 22.4238 20.9591 22.6894 20.4981C22.9551 20.0371 23.0933 19.5137 23.09 18.9816C23.0866 18.4495 22.9418 17.9279 22.6705 17.4703ZM20.9405 19.4703C20.8528 19.6262 20.7249 19.7558 20.5701 19.8455C20.4154 19.9352 20.2393 19.9817 20.0605 19.9803H3.94046C3.76157 19.9817 3.58556 19.9352 3.43077 19.8455C3.27599 19.7558 3.14811 19.6262 3.06046 19.4703C2.97269 19.3183 2.92648 19.1458 2.92648 18.9703C2.92648 18.7947 2.97269 18.6223 3.06046 18.4703L11.0605 4.47027C11.1444 4.30647 11.2719 4.169 11.4289 4.07301C11.5859 3.97702 11.7664 3.92623 11.9505 3.92623C12.1345 3.92623 12.315 3.97702 12.472 4.07301C12.629 4.169 12.7565 4.30647 12.8405 4.47027L20.8905 18.4703C20.9897 18.6201 21.0467 18.7939 21.0555 18.9734C21.0643 19.1529 21.0245 19.3314 20.9405 19.4903V19.4703ZM12.0005 8.00027C11.7352 8.00027 11.4809 8.10563 11.2933 8.29316C11.1058 8.4807 11.0005 8.73505 11.0005 9.00027V13.0003C11.0005 13.2655 11.1058 13.5198 11.2933 13.7074C11.4809 13.8949 11.7352 14.0003 12.0005 14.0003C12.2657 14.0003 12.52 13.8949 12.7076 13.7074C12.8951 13.5198 13.0005 13.2655 13.0005 13.0003V9.00027C13.0005 8.73505 12.8951 8.4807 12.7076 8.29316C12.52 8.10563 12.2657 8.00027 12.0005 8.00027Z" fill={color} />
    </svg>
  );
};
