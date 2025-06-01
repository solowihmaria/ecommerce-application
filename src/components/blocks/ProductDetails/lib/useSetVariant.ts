import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import type {
    CustomProduct,
    CustomVariant,
    Sizes,
} from '../../../../api/product/product.types';

const identifyVariantBySize = (
    size: string | null | Sizes,
    product: CustomProduct
): CustomVariant | null => {
    if (
        (size === null && product?.masterVariant) ||
        product?.masterVariant.size === size
    ) {
        return product?.masterVariant;
    } else {
        const variant = product?.variants.find(
            (variant) => variant.size === size
        );
        return variant ? variant : null;
    }
};

export const useSetVariant = (
    currentProduct: CustomProduct | null
): [CustomVariant | null, (size: Sizes) => void, string | null] => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentProductVariant, setCurrentProductVariant] =
        useState<CustomVariant | null>(null);
    const [variantError, setVariantError] = useState<string | null>(null);

    const changeVariant = (size: Sizes) => {
        setSearchParams(`?size=${size}`);
    };

    useEffect(() => {
        const size = searchParams.get('size');

        if (!currentProduct) {
            return;
        }

        const targetVariant = identifyVariantBySize(size, currentProduct);

        if (!targetVariant) {
            setVariantError('Something went wrong. Please try again later');
        }
        setCurrentProductVariant(targetVariant);
    }, [searchParams, currentProduct]);

    return [currentProductVariant, changeVariant, variantError];
};
