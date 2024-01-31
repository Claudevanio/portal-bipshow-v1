import React from "react";

export const Check: React.FC<{
    width: number;
    height: number;
    color: string;
}> = ({ width, height, color }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M21.4966 7.96212L9.49658 19.9621L3.99658 14.4621L5.40658 13.0521L9.49658 17.1321L20.0866 6.55212L21.4966 7.96212Z"
                fill={color}
            />
        </svg>
    );
};
