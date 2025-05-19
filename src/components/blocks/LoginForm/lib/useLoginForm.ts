import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { loginSchema } from '../lib/login.validation';
import type { LoginFormData } from '../Login.types';
import { useAuthErrors } from '../lib/useAuthErrors';
import { authenticateUser } from '../../../../api/auth/authService';
import { LoginContext } from '../../../../App';
import { ToastContext } from '../../../ui/Toast/ToastContext';

export const useLoginForm = () => {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
    const navigate = useNavigate();
    const { setLoginStatus } = useContext(LoginContext);
    const { showToast } = useContext(ToastContext);

    const methods = useForm<LoginFormData>({
        resolver: yupResolver(loginSchema),
        mode: 'onChange',
    });

    const { authError, handleError, clearApiError, getFieldError } =
        useAuthErrors(methods.formState.isSubmitting);

    React.useEffect(() => {
        const subscription = methods.watch(() => clearApiError());
        return () => subscription.unsubscribe();
    }, [methods, clearApiError]);

    const onSubmit = async (data: LoginFormData) => {
        try {
            await authenticateUser(data.email, data.password, () => {
                setLoginStatus(true);
                showToast({
                    message: 'Login successful!',
                    variant: 'success',
                });
                void navigate('/main');
            });
        } catch (error) {
            handleError(error);
        }
    };

    const handleFormSubmission = (event?: React.BaseSyntheticEvent) => {
        methods
            .handleSubmit(onSubmit)(event)
            .catch(() => {});
    };

    return {
        isPasswordVisible,
        setIsPasswordVisible,
        authError,
        methods,
        errors: methods.formState.errors,
        isSubmitting: methods.formState.isSubmitting,
        getFieldError,
        handleFormSubmission,
    };
};
