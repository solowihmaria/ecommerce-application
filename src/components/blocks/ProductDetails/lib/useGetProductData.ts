import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    getProductData,
    transformProductData,
} from '../../../../api/product/productService';
import type { CustomProduct } from '../../../../api/product/product.types';
import { useAuth } from '../../../../store/auth/useAuth';

import { useHandleError } from './useHandleError';

export const useGetProductData = (): [CustomProduct | null, string | null] => {
    const { loginStatus } = useAuth();
    const [currentProduct, setCurrentProduct] = useState<CustomProduct | null>(
        null
    );
    const [error, handleApiError] = useHandleError();

    const location = useParams();

    useEffect(() => {
        const id = location.id;
        if (!id) {
            return;
        }
        getProductData(id, loginStatus)
            .then((data) => {
                const product = transformProductData(data);
                console.log(product);
                setCurrentProduct(product);
            })
            .catch((error) => {
                setCurrentProduct(null);

                handleApiError(error);
            });
    }, [location.id, loginStatus, handleApiError]);
    return [currentProduct, error];
};
