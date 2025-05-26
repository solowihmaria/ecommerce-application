import { useEffect, useState } from 'react';
import { /*useNavigate, */ useParams } from 'react-router-dom';
import {
    getProductData,
    transformProductData,
} from '../../api/product/productService';
import type {
    CustomProduct,
    CustomVariant,
} from '../../api/product/product.types';

export const useGetProductData = (
    setCurrentProductVariant: React.Dispatch<
        React.SetStateAction<CustomVariant | null>
    >
) => {
    const [currentProduct, setCurrentProduct] = useState<CustomProduct | null>(
        null
    );
    const location = useParams();
    /*const [searchParams] = useNavigate();*/

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
                setCurrentProductVariant(product.masterVariant);
            })
            .catch((err) => console.log(err));
    }, [location.id, setCurrentProductVariant]);
    return [currentProduct];
};
