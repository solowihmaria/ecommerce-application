import type { ChangeEvent, FocusEvent } from 'react';

export interface InputProps {
    type?: string;
    value?: string;
    name?: string;
    id?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    autoComplete?: string;
    onChange?: (event_: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event_: FocusEvent<HTMLInputElement>) => void;
    className?: string;
    error?: boolean;
    errorMessage?: string;
    hasPasswordToggle?: boolean;
    onTogglePassword?: () => void;
    showPassword?: boolean;
}

export interface InputToggleButtonProps {
    showPassword: boolean;
    onTogglePassword: () => void;
}
