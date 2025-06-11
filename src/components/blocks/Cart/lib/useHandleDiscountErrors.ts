import { AxiosError } from 'axios';
import { useState } from 'react';

export const useHandleDiscountErrors = (): [
    string | null,
    (error: unknown) => void,
] => {
    const [discountCodeError, setDiscountCodeError] = useState<string | null>(
        null
    );

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

    return [discountCodeError, handleDiscountApiError];
};
