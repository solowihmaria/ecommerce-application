import { useState, useEffect, useRef } from 'react';
import type { FieldError } from 'react-hook-form';
import { REGISTRATION_ERROR_MESSAGES } from './constants';
import { AxiosError } from 'axios';

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

    const handleError = (error: unknown) => {
        if (error instanceof AxiosError) {
            if (error.response) {
                if (error.status === 400) {
                    setFieldError({ field: 'email' });
                }
                setRegistrationError(REGISTRATION_ERROR_MESSAGES.STATUS_FAIL);
            } else if (error.request) {
                setRegistrationError(REGISTRATION_ERROR_MESSAGES.NO_RESPONSE);
            } else {
                setRegistrationError(REGISTRATION_ERROR_MESSAGES.UNKNOWN_ERROR);
            }
        } else {
            console.error(`Unexpected error:`, error);
        }
    };

    return {
        fieldError,
        setFieldError,
        registrationError,
        setRegistrationError,
        clearApiError,
        getFieldError,
        handleError,
    };
};
