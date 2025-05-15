import { useState, useEffect, useRef } from 'react';
import type { FieldError } from 'react-hook-form';
import { AUTH_ERROR_MESSAGES } from './constants';

export interface ApiError {
    field?: 'email' | 'password' | 'both';
    message?: string;
}

export const useAuthErrors = (isSubmitting: boolean) => {
    const [apiError, setApiError] = useState<ApiError | null>(null);
    const isSubmittingReference = useRef(false);

    useEffect(() => {
        isSubmittingReference.current = isSubmitting;
    }, [isSubmitting]);

    const clearApiError = () => {
        if (!isSubmittingReference.current) {
            setApiError(null);
        }
    };

    const getFieldError = (
        field: 'email' | 'password'
    ): FieldError | undefined => {
        if (apiError?.field === 'both') {
            const message =
                field === 'email'
                    ? AUTH_ERROR_MESSAGES.EMAIL_INCORRECT
                    : AUTH_ERROR_MESSAGES.CREDENTIALS_NOT_FOUND;
            return {
                type: 'manual',
                message,
            };
        }

        if (apiError?.field === field) {
            return {
                type: 'manual',
                message: apiError.message,
            };
        }

        return undefined;
    };

    return {
        apiError,
        setApiError,
        clearApiError,
        getFieldError,
    };
};
