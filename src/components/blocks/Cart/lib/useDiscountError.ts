import { AxiosError } from 'axios';
import { useState } from 'react';
import type { DiscountHook } from '../Cart.types';
import { CartErrorMessages } from './constants';

export const useDiscountError = (): DiscountHook => {
    const [discountCodeError, setDiscountCodeError] = useState<string | null>(
        null
    );

    const clearDiscountError = () => setDiscountCodeError(null);

    const handleDiscountApiError = (error: unknown) => {
        if (error instanceof AxiosError) {
            if (error.status === 400) {
                setDiscountCodeError(
                    CartErrorMessages.FAILED_TO_APPLY_DISCOUNT
                );
            } else {
                setDiscountCodeError(error.message);
            }
        }
    };

    return [
        discountCodeError,
        setDiscountCodeError,
        handleDiscountApiError,
        clearDiscountError,
    ];
};
