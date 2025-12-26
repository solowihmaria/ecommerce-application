import type {
    SubmitHandler,
    UseFormRegister,
    FieldError,
    FieldErrors,
} from 'react-hook-form';
import type { InferType } from 'yup';
import type { registrationSchema } from './lib/registration.validation';

export type RegistrationFormData = InferType<typeof registrationSchema>;
export type RegistrationSubmitHandler = SubmitHandler<RegistrationFormData>;

export interface FormPartProps {
    register?: UseFormRegister<RegistrationFormData>;
    errors?: FieldErrors<RegistrationFormData>;
}

export interface baseFieldProps {
    error?: FieldError;
}

export interface PasswordFieldProps {
    register: UseFormRegister<RegistrationFormData>;
    error?: FieldError;
    showPassword: boolean;
    onTogglePassword: () => void;
}

export enum AddressType {
    shipping = 'shipping',
    billing = 'billing',
}

export interface addressFieldProps extends baseFieldProps {
    type: AddressType;
    disabled?: boolean;
}
