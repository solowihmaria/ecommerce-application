import type { ReactNode } from 'react';
// стандартные варианты типов кнопок, чтобы хранился набор кастомных вариантов уже готовых
export type ButtonVariant =
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'outline'
    | 'ghost';

export interface ButtonProps {
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    children: ReactNode;
    variant?: ButtonVariant;
}
