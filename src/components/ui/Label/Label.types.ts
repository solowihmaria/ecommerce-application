import type { LabelHTMLAttributes } from 'react';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    htmlFor?: string;
    required?: boolean;
    disabled?: boolean;
}
