import type { ReactNode } from 'react';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
    variant?: ToastVariant;
    message: ReactNode;
    duration?: number;
    onClose?: () => void;
    className?: string;
}
