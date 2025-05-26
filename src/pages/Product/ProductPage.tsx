import { Header } from '../../components/blocks/Header/Header';
import { ProductDetails } from '../../components/blocks/ProductDetails/ProductDetails';
import styles from './ProductPage.module.scss';
import { useState } from 'react';
import type { CustomVariant, Sizes } from '../../api/product/product.types';
import { useGetProductData } from './useGetProductData';

export const ProductPage = () => {
    const [currentProductVariant, setCurrentProductVariant] =
        useState<CustomVariant | null>(null);
    const [currentProduct] = useGetProductData(setCurrentProductVariant);

    const changeVariant = (size: Sizes) => {
        if (currentProduct?.masterVariant.size === size) {
            setCurrentProductVariant(currentProduct?.masterVariant);
        } else {
            const variant = currentProduct?.variants.find(
                (variant) => variant.size === size
            );
            if (variant) {
                setCurrentProductVariant(variant);
            }
        }
    };

    return (
        <div className={styles.productPageContainer}>
            <Header />
            <main className={styles.main}>
                {currentProduct && currentProductVariant ? (
                    <ProductDetails
                        product={currentProduct}
                        productVariant={currentProductVariant}
                        onSizeChange={changeVariant}
                    />
                ) : (
                    <p>Some error</p>
                )}
            </main>
        </div>
    );
};
