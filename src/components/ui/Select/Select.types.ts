import type { ReactNode } from 'react';

export interface SelectProps {
    name: string;
    children: ReactNode;
    className?: string;
    required?: boolean;
    disabled?: boolean;
}
