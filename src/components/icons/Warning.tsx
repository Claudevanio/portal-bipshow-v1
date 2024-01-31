import React from "react";

export const Warning: React.FC<{
    width: number;
    height: number;
    color: string;
}> = ({ width, height, color }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 14 14"
            fill={color}
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="12" cy="12" r="12" fill="white" />
        </svg>
    );
};
