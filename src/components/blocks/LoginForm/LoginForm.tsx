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
import { setToken } from '../../../utilities/storage';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: yupResolver(loginSchema),
        mode: 'onChange',
    });

    const onSubmit: LoginSubmitHandler = async (data) => {
        try {
            const response = await login(data.email, data.password);
            setToken(response.access_token);
            console.log('Login success:', response);
            void navigate('/main');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleFormSubmission = (event?: React.BaseSyntheticEvent): void => {
        void handleSubmit(onSubmit)(event).catch(console.error);
    };

    return (
        <div className={styles.loginContainer}>
            <Form onSubmit={handleFormSubmission}>
                <FormTitle />
                <EmailField register={register} error={errors.email} />
                <PasswordField
                    register={register}
                    error={errors.password}
                    showPassword={showPassword}
                    onTogglePassword={() => setShowPassword(!showPassword)}
                />
                <SubmitButton />
                <SignUpRedirect />
            </Form>
        </div>
    );
};
