import { useState, useEffect, useRef } from 'react';
import type { FieldError } from 'react-hook-form';

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
                    ? '⚠️ Please check the spelling of your email.'
                    : '⚠️ Customer account with the given credentials not found.';
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

    const handleAuthError = (): ApiError => {
        return {
            field: 'both',
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
