import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../features/auth/login/login.validation';
import type {
    LoginFormData,
    LoginFormFieldsProps,
    LoginFormHookReturn,
    EmailFieldProps,
    PasswordFieldProps,
    LoginSubmitHandler,
} from './login.types';
import Form from '../../components/ui/Form';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Label from '../../components/ui/Label';
import Heading from '../../components/ui/Heading';

const useLoginForm = (): LoginFormHookReturn => {
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<LoginFormData>({
        resolver: yupResolver(loginSchema),
        mode: 'onChange',
    });

    const togglePasswordVisibility = (): void => {
        setShowPassword(!showPassword);
    };

    return {
        ...form,
        showPassword,
        togglePasswordVisibility,
    };
};

const EmailField = ({
    register,
    errors,
}: EmailFieldProps): React.JSX.Element => (
    <div className="form-group">
        <Label htmlFor="email" required>
            Email
        </Label>
        <Input
            id="email"
            type="text"
            autoComplete="email"
            error={Boolean(errors?.email)}
            errorMessage={errors?.email?.message}
            {...register('email')}
        />
    </div>
);

const PasswordField = ({
    register,
    errors,
    showPassword,
    togglePasswordVisibility,
}: PasswordFieldProps): React.JSX.Element => (
    <div className="form-group">
        <Label htmlFor="password" required>
            Password
        </Label>
        <Input
            id="password"
            type="password"
            error={Boolean(errors?.password)}
            errorMessage={errors?.password?.message}
            hasPasswordToggle
            showPassword={showPassword}
            onTogglePassword={togglePasswordVisibility}
            {...register('password')}
        />
    </div>
);

const LoginFormFields = (props: LoginFormFieldsProps): React.JSX.Element => (
    <>
        <EmailField register={props.register} errors={props.errors} />
        <PasswordField {...props} />
    </>
);

const onSubmit: LoginSubmitHandler = (data: LoginFormData): void => {
    console.log('Форма отправлена:', data);
    // Здесь будет интеграция с API
};

const LoginPage: React.FC = () => {
    // Получаем методы и состояние формы из хука
    const {
        register,
        handleSubmit,
        formState: { errors },
        showPassword,
        togglePasswordVisibility,
    } = useLoginForm();

    // Обработчик отправки формы с обработкой ошибок
    const handleFormSubmission = (event?: React.BaseSyntheticEvent): void => {
        void handleSubmit(onSubmit)(event).catch(console.error);
    };

    return (
        <div className="login-container">
            <Heading level="h1">Вход в систему</Heading>
            <Form onSubmit={handleFormSubmission}>
                <LoginFormFields
                    register={register}
                    errors={errors}
                    showPassword={showPassword}
                    togglePasswordVisibility={togglePasswordVisibility}
                />
                <Button type="submit" variant="primary">
                    Войти
                </Button>
            </Form>
        </div>
    );
};

export default LoginPage;
