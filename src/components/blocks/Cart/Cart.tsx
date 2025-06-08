import { useEffect, useState } from 'react';
import { getUserCart } from '../../../api/cart/cart';
import type { CartResponse } from '../../../api/cart/cart.types';
import { Heading } from '../../ui/Heading';
import styles from './Cart.module.scss';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import clsx from 'clsx';

export const Cart = () => {
    const [cartContent, setCartContent] = useState<null | CartResponse>(null);

    useEffect(() => {
        getUserCart()
            .then((cartData) => {
                console.log(cartData);
                setCartContent(cartData);
            })
            .catch((err) => {
                console.log(err);
            });
    });

    return (
        <div className={styles.cartContainer}>
            <Heading>Shopping Cart</Heading>

            <div className={styles.cartHeader}>
                <div className={clsx(styles.leftHeader, styles.firstColumn)}>
                    <Button>Clear Shopping Cart</Button>
                </div>

                <div className={clsx(styles.rightHeader, styles.secondColumn)}>
                    <p className={clsx(styles.columnName, styles.column)}>
                        Price(€)
                    </p>
                    <p className={clsx(styles.columnName, styles.column)}>
                        Quantity
                    </p>
                    <p className={clsx(styles.columnName, styles.column)}>
                        Total
                    </p>
                </div>
            </div>
            <div className={styles.cartProducts}>
                {cartContent?.lineItems.map((product) => {
                    return (
                        <div className={styles.productRow} key={product.id}>
                            <div
                                className={clsx(
                                    styles.productInfo,
                                    styles.firstColumn
                                )}
                            >
                                <img
                                    className={styles.productImage}
                                    src={product.variant.images[0].url}
                                    alt={product.variant.images[0].label}
                                ></img>
                                <p className={styles.productName}>
                                    {product.name['en-US']}
                                </p>
                            </div>
                            <div
                                className={clsx(
                                    styles.productPriceContainer,
                                    styles.firstColumn
                                )}
                            >
                                <p
                                    className={clsx(
                                        styles.columnValue,
                                        styles.column
                                    )}
                                >
                                    {product.variant.prices[0].value
                                        .centAmount / 100}
                                </p>
                                <p
                                    className={clsx(
                                        styles.columnValue,
                                        styles.column
                                    )}
                                >
                                    <Input
                                        name="quantity"
                                        type="number"
                                        value={product.quantity}
                                        onChange={() => console.log('hello')}
                                    />
                                </p>
                                <p
                                    className={clsx(
                                        styles.columnValue,
                                        styles.column
                                    )}
                                >
                                    {product.totalPrice.centAmount / 100}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
