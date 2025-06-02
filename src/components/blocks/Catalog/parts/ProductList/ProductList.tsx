import type { Product } from '../../../../../api/getProducts/getProducts.types';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from '../../Catalog.module.scss';

interface ProductListProps {
    products: Product[];
}

export const ProductList = ({ products }: ProductListProps) => {
    return (
        <div className={styles.listWrapper}>
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
