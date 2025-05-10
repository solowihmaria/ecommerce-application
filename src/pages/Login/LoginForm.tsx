import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../features/auth/login/login.validation';
import type { LoginFormData, LoginSubmitHandler } from './login.types';
import Form from '../../components/ui/Form';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Label from '../../components/ui/Label';

const onSubmit: LoginSubmitHandler = (data) => {
    console.log('Форма отправлена:', data);
};

const LoginPage = (): React.JSX.Element => {
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
        <div className="login-container">
            <Form onSubmit={handleFormSubmission}>
                <div className="form-group">
                    <Label htmlFor="email" required>
                        Email
                    </Label>
                    <Input
                        id="email"
                        type="text"
                        autoComplete="email"
                        error={Boolean(errors.email)}
                        errorMessage={errors.email?.message}
                        {...register('email')}
                    />
                </div>

                <div className="form-group">
                    <Label htmlFor="password" required>
                        Password
                    </Label>
                    <Input
                        id="password"
                        type="password"
                        error={Boolean(errors.password)}
                        errorMessage={errors.password?.message}
                        hasPasswordToggle
                        showPassword={showPassword}
                        onTogglePassword={() => setShowPassword(!showPassword)}
                        {...register('password')}
                    />
                </div>

                <Button type="submit" variant="primary">
                    Login Your Account
                </Button>
            </Form>
        </div>
    );
};

export default LoginPage;
