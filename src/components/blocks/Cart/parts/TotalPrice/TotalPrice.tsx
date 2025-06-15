import clsx from 'clsx';
import type { CustomCart } from '../../../../../api/cart/cart.types';
import styles from './TotalPrice.module.scss';
import { getCartTotalOrigin } from '../../helpers/totalPriceHelper';

export const TotalPrice = ({ cartContent }: { cartContent: CustomCart }) => {
    const isAnyProductOnSale = (cartContent: CustomCart) => {
        return cartContent.lineItems.some((item) => item.variant.discount);
    };
    return (
        <div className={styles.totalPriceContainer}>
            <p className={clsx(styles.columnValue, styles.column)}>Total(€):</p>
            {isAnyProductOnSale(cartContent) ||
            cartContent.discountOnTotalPrice ||
            cartContent.lineItems[0].discountedPricePerQuantity ? (
                <>
                    <p
                        className={clsx(
                            styles.columnValue,
                            styles.column,
                            styles.cartTotalOriginContainer
                        )}
                    >
                        <span className={styles.cartTotalOrigin}>
                            {getCartTotalOrigin(cartContent)}
                        </span>
                        <span className={clsx(styles.cross)}></span>
                    </p>

                    <p
                        className={clsx(
                            styles.columnValue,
                            styles.column,
                            styles.cartTotalNew
                        )}
                    >
                        {cartContent.totalPrice.toFixed(2)}
                    </p>
                </>
            ) : (
                <p
                    className={clsx(
                        styles.columnValue,
                        styles.column,
                        styles.cartTotalPrice
                    )}
                >
                    {cartContent.totalPrice.toFixed(2)}
                </p>
            )}
        </div>
    );
};
