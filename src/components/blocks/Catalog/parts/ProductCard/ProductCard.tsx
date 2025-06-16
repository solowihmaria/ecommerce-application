import { Link } from 'react-router-dom';
import type { Product } from '../../../../../api/catalog/catalog.types';
import { Button } from '../../../../ui/Button';
import { Heading } from '../../../../ui/Heading';
import styles from './ProductCard.module.scss';
import clsx from 'clsx';

interface CardProps {
    product: Product;
    setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>;
}

export const ProductCard = ({ product, setSelectedProduct }: CardProps) => {
    const IMAGE_NOT_AVAILABLE =
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/800px-Image_not_available.png';

    function handleButtonClick(
        event: React.MouseEvent<HTMLButtonElement>,
        product: Product
    ) {
        event.preventDefault();
        event.stopPropagation();
        setSelectedProduct(product);
    }

    return (
        <Link
            to={`/product/${product.id}`}
            className={clsx(styles.card, {
                [styles.discounted]: product.forCatalog?.price.discounted,
            })}
        >
            <div className={styles.frame}>
                <img
                    className={styles.preview}
                    alt={product.name}
                    src={
                        product.forCatalog.preview
                            ? product.forCatalog.preview
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
                        {!product.forCatalog.price.discounted && (
                            <span className={styles.priceValue}>
                                {product.forCatalog.price.value.toFixed(2)}
                            </span>
                        )}
                        {product.forCatalog.price.discounted && (
                            <>
                                <span className={styles.priceValue}>
                                    {product.forCatalog.price.discounted.value.toFixed(
                                        2
                                    )}
                                </span>
                                <span className={styles.priceDiscounted}>
                                    {` ${product.forCatalog.price.value.toFixed(2)} `}
                                </span>
                            </>
                        )}
                    </div>

                    <Button
                        className={styles.buttonBuy}
                        variant="primary"
                        onClick={(event) => handleButtonClick(event, product)}
                    >
                        ADD TO CART
                    </Button>
                </div>
            </div>
        </Link>
    );
};
