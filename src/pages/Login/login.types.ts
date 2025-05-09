import type { InferType } from 'yup';
import type {
    SubmitHandler,
    UseFormReturn,
    FieldErrors,
} from 'react-hook-form';
import type { loginSchema } from '../../features/auth/login/login.validation';

/**
 * Тип данных формы входа, выведенный из Yup-схемы
 * Содержит поля email и password с валидацией
 */
export type LoginFormData = InferType<typeof loginSchema>;

/**
 * Пропсы для компонента LoginFormFields
 * @property register - Метод регистрации полей из react-hook-form
 * @property errors - Объект ошибок валидации
 * @property showPassword - Флаг видимости пароля
 * @property togglePasswordVisibility - Функция переключения видимости пароля
 */
export interface LoginFormFieldsProps {
    register: UseFormReturn<LoginFormData>['register'];
    errors: FieldErrors<LoginFormData>;
    showPassword: boolean;
    togglePasswordVisibility: () => void;
}

/**
 * Возвращаемый тип хука useLoginForm
 * Содержит методы и состояние формы
 */
export interface LoginFormHookReturn {
    register: UseFormReturn<LoginFormData>['register'];
    handleSubmit: UseFormReturn<LoginFormData>['handleSubmit'];
    formState: UseFormReturn<LoginFormData>['formState'];
    showPassword: boolean;
    togglePasswordVisibility: () => void;
}

export interface EmailFieldProps {
    register: UseFormReturn<LoginFormData>['register'];
    errors: FieldErrors<LoginFormData>;
}

export interface PasswordFieldProps {
    register: UseFormReturn<LoginFormData>['register'];
    errors: FieldErrors<LoginFormData>;
    showPassword: boolean;
    togglePasswordVisibility: () => void;
}

export type LoginSubmitHandler = SubmitHandler<LoginFormData>;
