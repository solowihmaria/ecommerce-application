import type { ReactNode } from 'react';

export interface LabelProps {
    htmlFor?: string;
    children: ReactNode;
    className?: string;
    required?: boolean;
    disabled?: boolean;
}
