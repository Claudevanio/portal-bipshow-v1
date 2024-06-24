import React from 'react';

export const Logout: React.FC<{ width: number; height: number; color: string; fillOpacity?: boolean }> = ({ width, height, color, fillOpacity }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20.5002 15.1C20.2628 14.9821 19.9883 14.9633 19.7371 15.0477C19.4858 15.1321 19.2783 15.3127 19.1602 15.55C18.5273 16.8282 17.5641 17.914 16.3705 18.6948C15.1768 19.4756 13.7962 19.9231 12.3715 19.991C10.9467 20.0588 9.52979 19.7445 8.26738 19.0806C7.00498 18.4167 5.94302 17.4274 5.1915 16.2151C4.43999 15.0028 4.02625 13.6116 3.99314 12.1857C3.96003 10.7597 4.30876 9.35088 5.00321 8.10502C5.69765 6.85915 6.71255 5.82161 7.94279 5.09985C9.17303 4.37809 10.5739 3.99837 12.0002 4.00001C13.4913 3.99355 14.954 4.40764 16.2205 5.19476C17.487 5.98188 18.5058 7.11012 19.1602 8.45001C19.2795 8.6887 19.4888 8.87021 19.742 8.9546C19.9952 9.03899 20.2715 9.01936 20.5102 8.90001C20.7489 8.78066 20.9304 8.57138 21.0148 8.31821C21.0992 8.06503 21.0795 7.7887 20.9602 7.55001C19.9568 5.53075 18.3004 3.90987 16.2599 2.95044C14.2194 1.99101 11.9145 1.74935 9.71939 2.26469C7.52426 2.78002 5.56771 4.0221 4.16732 5.78933C2.76692 7.55656 2.00488 9.74519 2.00488 12C2.00488 14.2548 2.76692 16.4435 4.16732 18.2107C5.56771 19.9779 7.52426 21.22 9.71939 21.7353C11.9145 22.2507 14.2194 22.009 16.2599 21.0496C18.3004 20.0901 19.9568 18.4693 20.9602 16.45C21.0198 16.3314 21.0552 16.2021 21.0643 16.0696C21.0733 15.9372 21.056 15.8043 21.0132 15.6786C20.9703 15.5529 20.9029 15.437 20.8149 15.3377C20.7268 15.2384 20.6198 15.1576 20.5002 15.1ZM21.0002 11H11.4102L13.7102 8.71001C13.8034 8.61677 13.8774 8.50608 13.9278 8.38426C13.9783 8.26244 14.0043 8.13187 14.0043 8.00001C14.0043 7.86815 13.9783 7.73758 13.9278 7.61576C13.8774 7.49394 13.8034 7.38325 13.7102 7.29001C13.617 7.19677 13.5063 7.12281 13.3844 7.07235C13.2626 7.02189 13.132 6.99592 13.0002 6.99592C12.8683 6.99592 12.7378 7.02189 12.6159 7.07235C12.4941 7.12281 12.3834 7.19677 12.2902 7.29001L8.29019 11.29C8.19915 11.3851 8.12778 11.4973 8.08019 11.62C7.98017 11.8635 7.98017 12.1365 8.08019 12.38C8.12778 12.5028 8.19915 12.6149 8.29019 12.71L12.2902 16.71C12.3832 16.8037 12.4938 16.8781 12.6156 16.9289C12.7375 16.9797 12.8682 17.0058 13.0002 17.0058C13.1322 17.0058 13.2629 16.9797 13.3848 16.9289C13.5066 16.8781 13.6172 16.8037 13.7102 16.71C13.8039 16.617 13.8783 16.5064 13.9291 16.3846C13.9798 16.2627 14.006 16.132 14.006 16C14.006 15.868 13.9798 15.7373 13.9291 15.6154C13.8783 15.4936 13.8039 15.383 13.7102 15.29L11.4102 13H21.0002C21.2654 13 21.5198 12.8947 21.7073 12.7071C21.8948 12.5196 22.0002 12.2652 22.0002 12C22.0002 11.7348 21.8948 11.4804 21.7073 11.2929C21.5198 11.1054 21.2654 11 21.0002 11Z"
        fill={color}
        fillOpacity={fillOpacity ? '1' : '0.38'}
      />
    </svg>
  );
};
