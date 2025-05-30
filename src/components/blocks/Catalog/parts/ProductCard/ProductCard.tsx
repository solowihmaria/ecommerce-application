import type { Product } from '../../../../../api/getProducts/getProducts.types';
import { Button } from '../../../../ui/Button';
import styles from './ProductCard.module.scss';

interface CardProps {
    product: Product;
}

export const ProductCard = ({ product }: CardProps) => {
    return (
        <div className={styles.card}>
            <div className={styles.frame}>
                <img
                    className={styles.preview}
                    alt={product.name}
                    src="https://cdn.lemanapro.ru/lmru/image/upload/v1616673298/lmcode/jTLsUNepOUKsSErnLKAd1Q/82399749.png"
                />

                <div className={styles.info}>
                    <div className={styles.name}>{product.name}</div>
                    <div className={styles.description}>
                        {product.description}
                    </div>
                    <div className={styles.price}>
                        From €
                        {product.masterVariant.price.discounted && (
                            <>
                                <span className={styles.priceDiscounted}>
                                    {` ${product.masterVariant.price.value} `}
                                </span>
                                <span className={styles.priceValue}>
                                    {
                                        product.masterVariant.price.discounted
                                            .value
                                    }
                                </span>
                            </>
                        )}
                        {!product.masterVariant.price.discounted && (
                            <span className={styles.priceValue}>
                                {product.masterVariant.price.value}
                            </span>
                        )}
                    </div>

                    <Button className={styles.buttonBuy} variant="primary">
                        ADD TO CART
                    </Button>
                </div>
            </div>
        </div>
    );
};
