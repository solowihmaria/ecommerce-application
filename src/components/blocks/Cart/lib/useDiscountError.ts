import { AxiosError } from 'axios';
import { useState } from 'react';
import type { DiscountHook } from '../Cart.types';

export const useDiscountError = (): DiscountHook => {
    const [discountCodeError, setDiscountCodeError] = useState<string | null>(
        null
    );

    const clearDiscountError = () => setDiscountCodeError(null);

    const handleDiscountApiError = (error: unknown) => {
        if (error instanceof AxiosError) {
            if (error.status === 400) {
                setDiscountCodeError(`The discount code is not applicable`);
                console.log(error);
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
