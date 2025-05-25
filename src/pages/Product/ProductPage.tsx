import { Header } from '../../components/blocks/Header/Header';
import { ProductDetails } from '../../components/blocks/ProductDetails/ProductDetails';
import styles from './ProductPage.module.scss';
import { useParams } from 'react-router-dom';
import { getProductData } from '../../api/product/productService';
import { useEffect, useState } from 'react';
import { transformProductData } from '../../api/product/productService';
import type {
    CustomProduct,
    CustomVariant,
} from '../../api/product/product.types';

export const ProductPage = () => {
    const location = useParams();
    const [currentProductVariant, setCurrentProductVariant] =
        useState<CustomVariant | null>(null);
    const [currentProduct, setCurrentProduct] = useState<CustomProduct | null>(
        null
    );

    const changeVariant = (size: string) => {
        if (currentProduct?.masterVariant.size === size) {
            setCurrentProductVariant(currentProduct?.masterVariant);
        } else {
            currentProduct?.variants.forEach((variant) => {
                if (variant.size === size) {
                    setCurrentProductVariant(variant);
                    return;
                }
            });
        }
    };

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
    }, [location.id]);

    return (
        <div className={styles.productPageContainer}>
            <Header />
            <main className={styles.main}>
                {currentProduct && currentProductVariant ? (
                    <ProductDetails
                        product={currentProduct}
                        productVariant={currentProductVariant}
                        onSizeChange={(size) => {
                            console.log('hello');
                            changeVariant(size);
                        }}
                    />
                ) : (
                    <p>Some error</p>
                )}
            </main>
        </div>
    );
};
