"use client";

import { ButtonProps } from "@/types";

export const Button = ({
  children,
  gray = false,
  variant = "primary",
  className,
  disabled = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`rounded-[6.25rem] whitespace-nowrap flex gap-1 items-center px-4 py-2 ${
        variant === "primary"
          ? "bg-gradient text-white"
          : !gray
          ? "text-primary  w-fit h-fit !p-[2px] bg-gradient"
          : "text-primary  w-fit h-fit !p-[2px] bg-slate-500"
      } ${
        disabled ? "bg-none	!bg-[#C8C8C8]  !text-white cursor-not-allowed" : ""
      } ${className}`}
      disabled={disabled}
      {...props}
    >
      {variant === "secondary" ? (
        <span
          className={
            (className ? className : "") +
            `!flex gap-1 items-center h-full px-4 py-2 bg-white ${
              gray ? "text-slate-400" : "text-primary"
            }  rounded-[6.25rem]`
          }
        >
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  );
};
