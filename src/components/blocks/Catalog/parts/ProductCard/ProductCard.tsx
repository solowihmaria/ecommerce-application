import { Link } from 'react-router-dom';
import type { Product } from '../../../../../api/getProducts/getProducts.types';
import { Button } from '../../../../ui/Button';
import { Heading } from '../../../../ui/Heading';
import styles from './ProductCard.module.scss';
import clsx from 'clsx';

interface CardProps {
    product: Product;
}

export const ProductCard = ({ product }: CardProps) => {
    const IMAGE_NOT_AVAILABLE =
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/800px-Image_not_available.png';

    return (
        <Link
            to={`/product/${product.id}`}
            className={clsx(styles.card, {
                [styles.discounted]: product.masterVariant.price.discounted,
            })}
        >
            <div className={styles.frame}>
                <img
                    className={styles.preview}
                    alt={product.name}
                    src={
                        product.masterVariant.preview
                            ? product.masterVariant.preview
                            : IMAGE_NOT_AVAILABLE
                    }
                />

                <div className={styles.info}>
                    <Heading level="h3" className={styles.name}>
                        {product.name}
                    </Heading>

                    <p className={styles.description}>{product.description}</p>

                    <div className={styles.price}>
                        From €
                        {!product.masterVariant.price.discounted && (
                            <span className={styles.priceValue}>
                                {product.masterVariant.price.value.toFixed(2)}
                            </span>
                        )}
                        {product.masterVariant.price.discounted && (
                            <>
                                <span className={styles.priceValue}>
                                    {product.masterVariant.price.discounted.value.toFixed(
                                        2
                                    )}
                                </span>
                                <span className={styles.priceDiscounted}>
                                    {` ${product.masterVariant.price.value.toFixed(2)} `}
                                </span>
                            </>
                        )}
                    </div>

                    <Button className={styles.buttonBuy} variant="primary">
                        ADD TO CART
                    </Button>
                </div>
            </div>
        </Link>
    );
};
