import type { ItemPriceDiscountedProps } from './ItemPriceDiscounted.types';
import styles from './ItemPriceDiscounted.module.scss';
import clsx from 'clsx';

export const ItemPriceDiscounted = ({
    oldPrice,
    newPrice,
}: ItemPriceDiscountedProps) => {
    return (
        <>
            <p
                data-testid="total-attribute-old"
                className={styles.priceOriginContainer}
            >
                <span className={styles.priceOrigin}>
                    {oldPrice.toFixed(2)}
                </span>
                <span className={clsx(styles.cross)}></span>
            </p>
            <span
                data-testid="total-attribute-new"
                className={styles.priceActual}
            >
                {newPrice.toFixed(2)}
            </span>
        </>
    );
};
