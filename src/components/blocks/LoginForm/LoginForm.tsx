import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './LoginForm.module.scss';
import { loginSchema } from './features/login.validation';
import type { LoginFormData, LoginSubmitHandler } from './Login.types';
import { Form } from '../../../components/ui/Form';
import { FormTitle } from './parts/FormTitle';
import { EmailField } from './parts/EmailField';
import { PasswordField } from './parts/PasswordField';
import { SubmitButton } from './parts/SubmitButton';
import { SignUpRedirect } from './parts/SignUpRedirect';
import { login } from '../../../api/auth/login';
import { setToken } from '../../../features/auth/token';
import { useNavigate } from 'react-router-dom';
import { useAuthErrors } from './features/useAuthErrors';

export const LoginForm = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
    } = useForm<LoginFormData>({
        resolver: yupResolver(loginSchema),
        mode: 'onChange',
    });

    const { setApiError, clearApiError, getFieldError, handleAuthError } =
        useAuthErrors(isSubmitting);

    // Очищаем ошибки API при изменении полей
    React.useEffect(() => {
        const subscription = watch(() => clearApiError());
        return () => subscription.unsubscribe();
    }, [watch, clearApiError]);

    const onSubmit: LoginSubmitHandler = async (data) => {
        try {
            const response = await login(data.email, data.password);
            setToken(response.access_token);
            void navigate('/main');
        } catch {
            setApiError(handleAuthError());
        }
    };

    const handleFormSubmission = (event?: React.BaseSyntheticEvent): void => {
        handleSubmit(onSubmit)(event).catch(() => {});
    };

    return (
        <div className={styles.loginContainer}>
            <Form onSubmit={handleFormSubmission}>
                <FormTitle />
                <EmailField
                    register={register}
                    error={errors.email || getFieldError('email')}
                />
                <PasswordField
                    register={register}
                    error={errors.password || getFieldError('password')}
                    showPassword={showPassword}
                    onTogglePassword={() => setShowPassword(!showPassword)}
                />
                <SubmitButton />
                <SignUpRedirect />
            </Form>
        </div>
    );
};
