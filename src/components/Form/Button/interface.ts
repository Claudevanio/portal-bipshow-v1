import React from 'react';

export type Button = 'small' | 'medium' | 'outline' | 'outline-medium' | 'outline-text'

export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Button;
    type?: 'button' | 'submit';
    text?: string;
    loading?: boolean;
    icon?: React.ReactNode
}
