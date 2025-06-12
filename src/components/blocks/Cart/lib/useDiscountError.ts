import { AxiosError } from 'axios';
import { useState } from 'react';

export const useDiscountError = (): [
    string | null,
    (error: unknown) => void,
    () => void,
] => {
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

    return [discountCodeError, handleDiscountApiError, clearDiscountError];
};
