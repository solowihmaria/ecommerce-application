import type { InferType } from 'yup';
import type {
    SubmitHandler,
    UseFormRegister,
    FieldError,
} from 'react-hook-form';
import type { loginSchema } from './features/login.validation';

export type LoginFormData = InferType<typeof loginSchema>;
export type LoginSubmitHandler = SubmitHandler<LoginFormData>;

export interface EmailFieldProps {
    register: UseFormRegister<LoginFormData>;
    error?: FieldError;
}

export interface PasswordFieldProps {
    register: UseFormRegister<LoginFormData>;
    error?: FieldError;
    showPassword: boolean;
    onTogglePassword: () => void;
}
