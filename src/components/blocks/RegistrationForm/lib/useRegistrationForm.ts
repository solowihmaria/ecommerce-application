import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { registrationSchema } from '../lib/registration.validation';
import type { RegistrationFormData } from '../Registration.types';
import { useRegistrationErrors } from './useRegistrationErrors';
import { createCustomer } from '../../../../api/signup/createCustomer';
import { authenticateUser } from '../../../../api/auth/authService';
import { useAuth } from '../../../../store/auth/useAuth';
import { ToastContext } from '../../../ui/Toast/ToastContext';

export const useRegistrationForm = () => {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
    const navigate = useNavigate();
    const { setLoginStatus } = useAuth();
    const { showToast } = useContext(ToastContext);
    const methods = useForm<RegistrationFormData>({
        resolver: yupResolver(registrationSchema),
        mode: 'onChange',
    });

    // Хук для обработки ошибок API
    const { registrationError, handleError, clearApiError, getFieldError } =
        useRegistrationErrors(methods.formState.isSubmitting);

    // Для очистки ошибок при изменении полей формы
    React.useEffect(() => {
        const subscription = methods.watch(() => clearApiError());
        return () => subscription.unsubscribe();
    }, [methods, clearApiError]);

    const onSubmit = async (data: RegistrationFormData) => {
        try {
            await createCustomer(data, async () => {
                await authenticateUser(data.email, data.password, () => {
                    setLoginStatus(true);
                    showToast({
                        message:
                            'Account created successfully! Logging you in...',
                        variant: 'success',
                    });
                    void navigate('/main');
                });
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
        registrationError,
        methods,
        errors: methods.formState.errors,
        isSubmitting: methods.formState.isSubmitting,
        getFieldError,
        handleFormSubmission,
    };
};
