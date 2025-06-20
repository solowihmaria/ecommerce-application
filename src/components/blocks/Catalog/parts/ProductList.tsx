import type { Product } from '../../../../api/catalog/catalog.types';
import { ProductCard } from './ProductCard/ProductCard';
import styles from '../Catalog.module.scss';

interface ProductListProps {
    products: Product[];
    setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>;
}

export const ProductList = ({
    products,
    setSelectedProduct,
}: ProductListProps) => {
    return (
        <div className={styles.listWrapper}>
            {products.map((product) => {
                return (
                    <ProductCard
                        key={product.id}
                        product={product}
                        setSelectedProduct={setSelectedProduct}
                    ></ProductCard>
                );
            })}
        </div>
    );
};
