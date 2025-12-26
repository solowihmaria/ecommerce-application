import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';

export const useHandleError = (): [string | null, (error: unknown) => void] => {
    const [error, setError] = useState<string | null>(null);

    const handleApiError = useCallback((error: unknown) => {
        if (error instanceof AxiosError) {
            if (error.status === 404) {
                setError('Requested product was not found');
            } else {
                setError('Something went wrong. Please try again later');
            }
        }
    }, []);

    return [error, handleApiError];
};
