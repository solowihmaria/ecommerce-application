import type { SelectHTMLAttributes } from 'react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    name: string;
    required?: boolean;
    disabled?: boolean;
}
