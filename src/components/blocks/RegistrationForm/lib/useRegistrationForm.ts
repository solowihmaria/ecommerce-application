import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { registrationSchema } from '../lib/registration.validation';
import type { RegistrationFormData } from '../Registration.types';
import { useRegistrationErrors } from './useRegistrationErrors';
import { createCustomer } from '../../../../api/createCustomer/createCustomer';
import { authenticateUser } from '../../../../api/auth/authService';
import { LoginContext } from '../../../../App';
import { ToastContext } from '../../../ui/Toast/ToastContext';

const onError = (error: unknown) => {
    console.log('SUBMISSION ERROR', error);
};

export const useRegistrationForm = () => {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
    // const [registrationError, setRegistrationError] = React.useState<
    //     string | null
    // >(null);
    const navigate = useNavigate();
    const { setLoginStatus } = useContext(LoginContext);
    const { showToast } = useContext(ToastContext);

    const methods = useForm<RegistrationFormData>({
        resolver: yupResolver(registrationSchema),
        mode: 'onChange',
    });

    // Хук для обработки ошибок API
    const { getFieldError } = useRegistrationErrors(
        methods.formState.isSubmitting
    );

    // Для очистки ошибок при изменении полей формы
    // React.useEffect(() => {
    //     const subscription = methods.watch(() => clearApiError());
    //     return () => subscription.unsubscribe();
    // }, [methods, clearApiError]);

    const onSubmit = async (data: RegistrationFormData) => {
        try {
            await createCustomer(data);

            await authenticateUser(data.email, data.password, () => {
                setLoginStatus(true);
                showToast({
                    message: 'Account created successfully! Logging you in...',
                    variant: 'success',
                });
                void navigate('/main');
            });
        } catch (error) {
            console.log('ERROR', error);
            throw error;
        }
    };

    const handleFormSubmission = (event?: React.BaseSyntheticEvent) => {
        methods
            .handleSubmit(
                onSubmit,
                onError
            )(event)
            .catch((error) => {
                console.log('HFS ERROR', error);
            });
    };

    return {
        isPasswordVisible,
        setIsPasswordVisible,
        // registrationError,
        methods,
        errors: methods.formState.errors,
        isSubmitting: methods.formState.isSubmitting,
        getFieldError,
        handleFormSubmission,
    };
};
