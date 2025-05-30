import { useEffect, useState } from 'react';
// import styles from './Catalog.module.scss';
import { ProductList } from './parts/ProductList/ProductList';
import type { Product } from '../../../api/getProducts/getProducts.types';
import { getProducts } from '../../../api/getProducts/getProducts';

export const Catalog = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data: Product[] = await getProducts();
                setProducts(data);
            } catch (error) {
                console.log('ERROR', error);
                setError('Failed to load products');
            } finally {
                setIsLoading(false);
            }
        };

        void loadProducts();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>{error}</div>;
    }

    return <ProductList products={products} />;
};
