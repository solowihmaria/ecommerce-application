import type { ReactNode } from 'react';

export interface ButtonProps {
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    children: ReactNode;
}
