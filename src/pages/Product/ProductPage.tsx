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
                <h1 className={styles.title}>Product id = {location.id}</h1>
                {currentProduct && currentProductVariant ? (
                    <ProductDetails
                        product={currentProduct}
                        productVariant={currentProductVariant}
                    />
                ) : (
                    <p>Some error</p>
                )}
            </main>
        </div>
    );
};
