import { useEffect, useState } from 'react';
import {
    changeItemQty,
    getUserCart,
    removeCartItem,
} from '../../../api/cart/cart';
import type { CustomCart } from '../../../api/cart/cart.types';
import { Heading } from '../../ui/Heading';
import styles from './Cart.module.scss';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import clsx from 'clsx';
import { prepareCartData } from '../../../api/cart/helpers';
import { IoMdClose } from 'react-icons/io';

export const Cart = () => {
    const [cartContent, setCartContent] = useState<null | CustomCart>(null);

    const handleQtyChange = async (
        qty: string,
        cartContent: CustomCart,
        lineId: string
    ) => {
        try {
            const updatedCart = await changeItemQty(
                Number(qty),
                cartContent,
                lineId
            );
            setCartContent(prepareCartData(updatedCart));
        } catch {
            console.log('some error');
        }
    };

    const handleCartItemDelete = async (
        cartContent: CustomCart,
        lineId: string
    ) => {
        try {
            const updatedCart = await removeCartItem(cartContent, lineId);
            setCartContent(prepareCartData(updatedCart));
        } catch {
            console.log('some error');
        }
    };

    useEffect(() => {
        getUserCart()
            .then((cartData) => {
                console.log(cartData);
                setCartContent(prepareCartData(cartData));
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

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
                        Total(€)
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
                                <span
                                    className={styles.deleteProduct}
                                    onClick={() =>
                                        void handleCartItemDelete(
                                            cartContent,
                                            product.id
                                        )
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
                                    <p className={styles.productName}>
                                        {product.name}
                                    </p>
                                    <p className={styles.productName}>
                                        {product.variant.size}
                                    </p>
                                </div>
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
                                    {product.variant.price}
                                </p>
                                <div
                                    className={clsx(
                                        styles.columnValue,
                                        styles.column
                                    )}
                                >
                                    {' '}
                                    <Input
                                        name="quantity"
                                        type="number"
                                        value={product.quantity}
                                        onChange={(event) =>
                                            void handleQtyChange(
                                                event.target.value,
                                                cartContent,
                                                product.id
                                            )
                                        }
                                    />
                                </div>

                                <p
                                    className={clsx(
                                        styles.columnValue,
                                        styles.column
                                    )}
                                >
                                    {product.totalPrice}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className={styles.cartFooter}>
                <div className={styles.promoContainer}></div>
                <div className={styles.totalContainer}>
                    <div className={styles.totalPriceContainer}>
                        <p className={clsx(styles.columnValue, styles.column)}>
                            Total(€):
                        </p>
                        <p className={clsx(styles.columnValue, styles.column)}>
                            {cartContent?.totalPrice}
                        </p>
                    </div>
                    <div className={styles.checkoutContainer}>
                        <Button className={styles.checkout}>
                            Proceed to Checkout
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
