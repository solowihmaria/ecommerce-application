import clsx from 'clsx';
import styles from './CartItem.module.scss';
import { IoMdClose } from 'react-icons/io';
import { Input } from '../../../../ui/Input';
import { useState } from 'react';
import type { CartItemProps } from './CartItem.types';
import { Link } from 'react-router-dom';
import { ItemPriceDiscounted } from '../ItemPriceDiscounted/ItemPriceDiscounted';

export const CartItem = ({
    product,
    cartContent,
    deleteProductHandler,
    handleQtyChange,
}: CartItemProps) => {
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
                {product.variant.images.length === 0 ? (
                    <img
                        className={styles.productImage}
                        src={'placeholder'}
                        alt={'placeholder'}
                    ></img>
                ) : (
                    <img
                        className={styles.productImage}
                        src={product.variant.images[0].url}
                        alt={product.variant.images[0].label}
                    ></img>
                )}

                <div className={styles.productText}>
                    {' '}
                    <Link
                        to={`/product/${product.productId}?size=${product.variant.size}`}
                        className={styles.productNameLink}
                    >
                        <p className={styles.productName}>{product.name}</p>
                    </Link>
                    <p className={styles.productSize}>
                        Size:&nbsp;{product.variant.size}
                    </p>
                </div>
            </div>
            <div
                className={clsx(
                    styles.productPriceContainer,
                    styles.secondColumn
                )}
            >
                <div
                    className={clsx(
                        styles.columnValue,
                        styles.column,
                        styles.price
                    )}
                >
                    {product.discountedPricePerQuantity ? (
                        <ItemPriceDiscounted
                            oldPrice={product.variant.price}
                            newPrice={
                                product.discountedPricePerQuantity.currentPrice
                            }
                        />
                    ) : product.variant.discount ? (
                        <ItemPriceDiscounted
                            oldPrice={product.variant.price}
                            newPrice={product.variant.discount}
                        />
                    ) : (
                        <span className={styles.priceActual}>
                            {product.variant.price.toFixed(2)}
                        </span>
                    )}
                </div>
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

                <p
                    className={clsx(
                        styles.columnValue,
                        styles.column,
                        styles.totalContainer
                    )}
                >
                    <span className={styles.totalLabel}>Total</span>
                    <span>{product.totalPrice.toFixed(2)}</span>
                </p>
            </div>
        </div>
    );
};
