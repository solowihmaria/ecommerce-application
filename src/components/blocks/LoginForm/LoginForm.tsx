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

const onSubmit: LoginSubmitHandler = (data) => {
    console.log('Form submitted:', data);
};

export const LoginForm = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: yupResolver(loginSchema),
        mode: 'onChange',
    });

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
            </Form>
        </div>
    );
};
