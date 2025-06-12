import clsx from 'clsx';
import type {
    CustomCart,
    CustomCartItem,
} from '../../../../../api/cart/cart.types';
import styles from './CartItem.module.scss';
import { IoMdClose } from 'react-icons/io';
import { Input } from '../../../../ui/Input';
import { useState } from 'react';

export const CartItem = ({
    product,
    cartContent,
    deleteProductHandler,
    handleQtyChange,
}: {
    product: CustomCartItem;
    cartContent: CustomCart;
    deleteProductHandler: (
        cartContent: CustomCart,
        id: string
    ) => Promise<void>;
    handleQtyChange: (
        value: string,
        cartContent: CustomCart,
        id: string
    ) => Promise<void>;
}) => {
    const [cartItemQty, setCartItemQty] = useState<string | number>(
        product.quantity
    );

    return (
        <div className={styles.productRow}>
            <div className={clsx(styles.productInfo, styles.firstColumn)}>
                <span
                    className={styles.deleteProduct}
                    onClick={() =>
                        void deleteProductHandler(cartContent, product.id)
                    }
                    aria-hidden="true"
                >
                    <IoMdClose className={styles.deleteIcon} />
                </span>
                <img
                    className={styles.productImage}
                    src={product.variant.images[0].url}
                    alt={product.variant.images[0].label}
                ></img>
                <div className={styles.productText}>
                    {' '}
                    <p className={styles.productName}>{product.name}</p>
                    <p className={styles.productName}>{product.variant.size}</p>
                </div>
            </div>
            <div
                className={clsx(
                    styles.productPriceContainer,
                    styles.secondColumn
                )}
            >
                <p
                    className={clsx(
                        styles.columnValue,
                        styles.column,
                        styles.price
                    )}
                >
                    {product.discountedPricePerQuantity ? (
                        <>
                            <p className={styles.priceOriginContainer}>
                                <span className={styles.priceOrigin}>
                                    {product.variant.discount
                                        ? product.variant.discount.toFixed(2)
                                        : product.variant.price.toFixed(2)}
                                </span>
                                <span className={clsx(styles.cross)}></span>
                            </p>
                            <span className={styles.priceActual}>
                                {product.discountedPricePerQuantity.currentPrice.toFixed(
                                    2
                                )}
                            </span>
                        </>
                    ) : (
                        <span className={styles.priceActual}>
                            {product.variant.discount
                                ? product.variant.discount.toFixed(2)
                                : product.variant.price.toFixed(2)}
                        </span>
                    )}
                </p>
                <div className={clsx(styles.columnValue, styles.column)}>
                    <Input
                        className={styles.qtyInput}
                        name="quantity"
                        type="number"
                        value={cartItemQty}
                        min="1"
                        onChange={(event) => {
                            if (
                                Number(event.target.value) >= 1 &&
                                Number.isInteger(Number(event.target.value))
                            ) {
                                setCartItemQty(Number(event.target.value));
                            } else {
                                setCartItemQty('');
                            }
                        }}
                        onBlur={(event) => {
                            if (typeof cartItemQty !== 'number') {
                                setCartItemQty(product.quantity);
                            } else {
                                void handleQtyChange(
                                    event.target.value,
                                    cartContent,
                                    product.id
                                );
                            }
                        }}
                    />
                </div>

                <p className={clsx(styles.columnValue, styles.column)}>
                    {product.totalPrice.toFixed(2)}
                </p>
            </div>
        </div>
    );
};
