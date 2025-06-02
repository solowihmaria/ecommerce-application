import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { changePasswordSchema } from '../parts/ChangePassword/changePassword.validation';
import type { PasswordFormData } from '../UserProfile.types';
import { changePassword } from '../../../../api/profile/changePassword';
import { logoutUser } from '../../../../api/auth/authService';
import { ToastContext } from '../../../ui/Toast/ToastContext';
import { useAuth } from '../../../../store/auth/useAuth';
import { useNavigate } from 'react-router-dom';
import type { AxiosError } from 'axios';
import axios from 'axios';

const isAxiosError = (error: unknown): error is AxiosError =>
    axios.isAxiosError(error);

export const useChangePassword = () => {
    const { customer, updateCustomer, setLoginStatus } = useAuth();
    const navigate = useNavigate();
    const [isPasswordVisible, setIsPasswordVisible] = useState({
        current: false,
        new: false,
        confirm: false,
    });
    const [apiError, setApiError] = useState<string | null>(null);
    const { showToast } = useContext(ToastContext);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty },
        setError,
    } = useForm<PasswordFormData>({
        resolver: yupResolver(changePasswordSchema),
        mode: 'onChange',
    });

    const togglePasswordVisibility = (
        field: keyof typeof isPasswordVisible
    ) => {
        setIsPasswordVisible((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const onSubmit = async (data: PasswordFormData) => {
        if (!customer) {
            return;
        }

        setApiError(null);

        try {
            const updatedCustomer = await changePassword(
                customer.id,
                customer.version,
                data.currentPassword,
                data.newPassword
            );

            updateCustomer(updatedCustomer);
            showToast({
                message: 'Password changed successfully! Please log in again.',
                variant: 'success',
            });

            await logoutUser();
            setLoginStatus(false);
            reset();
            void navigate('/login');
        } catch (error) {
            if (isAxiosError(error)) {
                if (error.response?.status === 400) {
                    setError('currentPassword', {
                        type: 'manual',
                        message: 'Current password is incorrect',
                    });
                } else {
                    setApiError(
                        'Failed to change password. Please try again later.'
                    );
                }
                console.error('Password change failed:', error);
            } else {
                setApiError('Something went wrong. Please try again.');
                console.error('Unknown error:', error);
            }
        }
    };

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        void handleSubmit(onSubmit)();
    };

    return {
        isPasswordVisible,
        errors,
        isDirty,
        register,
        togglePasswordVisibility,
        onFormSubmit,
        apiError,
    };
};
