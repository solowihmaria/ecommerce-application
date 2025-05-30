import type { Product } from '../../../../../api/getProducts/getProducts.types';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductList.module.scss';

interface ProductListProps {
    products: Product[];
}

export const ProductList = ({ products }: ProductListProps) => {
    return (
        <div className={styles.listContainer}>
            {products.map((product) => {
                return (
                    <ProductCard
                        key={product.id}
                        product={product}
                    ></ProductCard>
                );
            })}
        </div>
    );
};
