import { useState, useEffect, useRef } from 'react';
import type { FieldError } from 'react-hook-form';

export interface ApiError {
    field?: 'email' | 'password';
    message: string;
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
        if (apiError?.field === field) {
            return {
                type: 'manual',
                message: apiError.message,
            };
        }
        return undefined;
    };

    const handleAuthError = (): ApiError => {
        return {
            field: 'password',
            message:
                '⚠️ Please check the spelling of your email or password. Customer account with the given credentials not found.',
        };
    };

    return {
        apiError,
        setApiError,
        clearApiError,
        getFieldError,
        handleAuthError,
    };
};
