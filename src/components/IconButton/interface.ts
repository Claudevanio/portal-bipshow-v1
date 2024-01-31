import { ButtonHTMLAttributes } from "react";

export interface IIconButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    onClick: () => void
}