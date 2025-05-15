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
import { useNavigate } from 'react-router-dom';
import { useAuthErrors } from './features/useAuthErrors';
import { authenticateUser } from '../../../api/auth/authService';

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
            await authenticateUser(data.email, data.password, () => {
                void navigate('/main');
            });
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
