import type { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
    errorMessage?: string;
}

export interface PasswordInputProps
    extends InputHTMLAttributes<HTMLInputElement> {
    isPasswordVisible?: boolean;
    onVisibilityToggle?: () => void;
    error?: boolean;
    errorMessage?: string;
}
