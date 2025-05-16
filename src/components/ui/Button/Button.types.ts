import type { ButtonHTMLAttributes } from 'react';

export type ButtonVariant =
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'outline'
    | 'ghost';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
}
