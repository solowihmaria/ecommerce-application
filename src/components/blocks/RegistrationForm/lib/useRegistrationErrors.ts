import { useState, useEffect, useRef } from 'react';
import type { FieldError } from 'react-hook-form';
import { REGISTRATION_ERROR_MESSAGES } from './constants';

export interface ApiError {
    field?: 'email' | 'password';
    message?: string;
}

export const useRegistrationErrors = (isSubmitting: boolean) => {
    const [fieldError, setFieldError] = useState<ApiError | null>(null);
    const [registrationError, setRegistrationError] = useState<string | null>(
        null
    );
    const isSubmittingReference = useRef(false);

    useEffect(() => {
        isSubmittingReference.current = isSubmitting;
    }, [isSubmitting]);

    const clearApiError = () => {
        if (!isSubmittingReference.current) {
            setFieldError(null);
            setRegistrationError(null);
        }
    };

    const getFieldError = (
        field: 'email' | 'password'
    ): FieldError | undefined => {
        if (fieldError?.field === field) {
            return {
                type: 'manual',
                message: REGISTRATION_ERROR_MESSAGES.CUSTOMER_ALREADY_EXIST,
            };
        }

        return undefined;
    };

    return {
        fieldError,
        setFieldError,
        registrationError,
        setRegistrationError,
        clearApiError,
        getFieldError,
    };
};
