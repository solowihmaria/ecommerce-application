import type { HTMLAttributes, ReactNode } from 'react';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
    variant?: ToastVariant;
    message: ReactNode;
    duration?: number;
    onClose?: () => void;
    className?: string;
}
