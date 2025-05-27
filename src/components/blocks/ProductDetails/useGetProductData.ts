import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    getProductData,
    transformProductData,
} from '../../../api/product/productService';
import type { CustomProduct } from '../../../api/product/product.types';

export const useGetProductData = (): [CustomProduct | null] => {
    const [currentProduct, setCurrentProduct] = useState<CustomProduct | null>(
        null
    );
    const location = useParams();

    useEffect(() => {
        const id = location.id;
        if (!id) {
            return;
        }
        getProductData(id)
            .then((data) => {
                const product = transformProductData(data);
                console.log(product);
                setCurrentProduct(product);
                console.log(id);
            })
            .catch((err) => console.log(err));
    }, [location.id]);
    return [currentProduct];
};
