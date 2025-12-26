import { useState, useEffect, useRef } from 'react';
import type { FieldError } from 'react-hook-form';
import { AUTH_ERROR_MESSAGES } from './constants';
import { AxiosError } from 'axios';

export interface ApiError {
    field?: 'email' | 'password' | 'both';
    message?: string;
}

export const useAuthErrors = (isSubmitting: boolean) => {
    const [fieldError, setFieldError] = useState<ApiError | null>(null);
    const [authError, setAuthError] = useState<string | null>(null);
    const isSubmittingReference = useRef(false);

    useEffect(() => {
        isSubmittingReference.current = isSubmitting;
    }, [isSubmitting]);

    const clearApiError = () => {
        if (!isSubmittingReference.current) {
            setFieldError(null);
            setAuthError(null);
        }
    };

    const getFieldError = (
        field: 'email' | 'password'
    ): FieldError | undefined => {
        if (fieldError?.field === field) {
            return {
                type: 'manual',
                message:
                    fieldError.message ||
                    AUTH_ERROR_MESSAGES.CREDENTIALS_NOT_FOUND,
            };
        }

        if (fieldError?.field === 'both') {
            return {
                type: 'manual',
                message:
                    field === 'email'
                        ? AUTH_ERROR_MESSAGES.EMAIL_INCORRECT
                        : AUTH_ERROR_MESSAGES.CREDENTIALS_NOT_FOUND,
            };
        }

        return undefined;
    };

    const handleError = (error: unknown) => {
        if (error instanceof AxiosError) {
            if (error.response) {
                // Ошибка 400 - неверные учетные данные
                if (error.response.status === 400) {
                    setFieldError({ field: 'both' });
                } else {
                    setAuthError(AUTH_ERROR_MESSAGES.STATUS_FAIL);
                }
            } else if (error.request) {
                setAuthError(AUTH_ERROR_MESSAGES.NO_RESPONSE);
            } else {
                setAuthError(AUTH_ERROR_MESSAGES.UNKNOWN_ERROR);
            }
        } else if (error instanceof Error) {
            setAuthError(error.message);
        } else {
            setAuthError(AUTH_ERROR_MESSAGES.UNKNOWN_ERROR);
        }
    };

    return {
        fieldError,
        authError,
        setFieldError,
        setAuthError,
        clearApiError,
        getFieldError,
        handleError,
    };
};
