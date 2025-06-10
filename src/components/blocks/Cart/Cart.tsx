import { useEffect, useState } from 'react';
import {
    addDiscountCode,
    changeItemQty,
    deleteCart,
    getUserCart,
    removeCartItem,
    removeDiscountCode,
} from '../../../api/cart/cart';
import type { CustomCart } from '../../../api/cart/cart.types';
import { Heading } from '../../ui/Heading';
import styles from './Cart.module.scss';
import { Button } from '../../ui/Button';
import clsx from 'clsx';
import { prepareCartData } from '../../../api/cart/helpers';
import { EmptyCart } from './parts/EmptyCart/EmptyCart';
import { ConfirmModal } from '../../ui/ConfirmModal';
import { Discount } from './parts/Discount/Discount';
import { CartItem } from './parts/CartItem/CartItem';

export const Cart = () => {
    const [cartContent, setCartContent] = useState<null | CustomCart>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

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

    const handleCartDelete = async (cartContent: CustomCart) => {
        try {
            await deleteCart(cartContent);
            setCartContent(null);
        } catch {
            console.log('some error');
        }
    };
    const handlePromocodeApply = async (
        code: string,
        cartContent: CustomCart
    ) => {
        try {
            const updatedCart = await addDiscountCode(code, cartContent);
            setCartContent(prepareCartData(updatedCart));
        } catch {
            console.log('some error');
        }
    };

    const handlePromocodeRemove = async (
        id: string,
        cartContent: CustomCart
    ) => {
        try {
            const updatedCart = await removeDiscountCode(id, cartContent);
            setCartContent(prepareCartData(updatedCart));
        } catch {
            console.log('some error');
        }
    };

    function getCartTotalOrigin(cartContent: CustomCart): string {
        if (cartContent.discountOnTotalPrice) {
            return (
                cartContent.totalPrice + cartContent.discountOnTotalPrice
            ).toFixed(2);
        }
        if (cartContent.lineItems[0].discountedPricePerQuantity) {
            const initialPrices = cartContent.lineItems.map((lineItem) => {
                if (lineItem.variant.discount) {
                    return lineItem.variant.discount * lineItem.quantity;
                } else {
                    return lineItem.variant.price * lineItem.quantity;
                }
            });
            const initialTotal = initialPrices.reduce(
                (accumulator, currentValue) => accumulator + currentValue
            );
            return initialTotal.toFixed(2);
        }
        return cartContent.totalPrice.toFixed(2);
    }
    useEffect(() => {
        setIsLoading(true);
        getUserCart()
            .then((cartData) => {
                console.log(cartData);
                setCartContent(prepareCartData(cartData));
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    }, []);

    if (
        !isLoading &&
        (cartContent?.lineItems.length === 0 || cartContent === null)
    ) {
        return <EmptyCart />;
    }

    return (
        <>
            {!isLoading && cartContent && (
                <>
                    <div className={styles.cartContainer}>
                        <Heading>Shopping Cart</Heading>
                        <div className={styles.cartHeader}>
                            <div
                                className={clsx(
                                    styles.leftHeader,
                                    styles.firstColumn
                                )}
                            >
                                <Button onClick={() => setIsModalOpened(true)}>
                                    Clear Shopping Cart
                                </Button>
                            </div>

                            <div
                                className={clsx(
                                    styles.rightHeader,
                                    styles.secondColumn
                                )}
                            >
                                <p
                                    className={clsx(
                                        styles.columnName,
                                        styles.column
                                    )}
                                >
                                    Price(€)
                                </p>
                                <p
                                    className={clsx(
                                        styles.columnName,
                                        styles.column
                                    )}
                                >
                                    Quantity
                                </p>
                                <p
                                    className={clsx(
                                        styles.columnName,
                                        styles.column
                                    )}
                                >
                                    Total(€)
                                </p>
                            </div>
                        </div>
                        <div className={styles.cartProducts}>
                            {cartContent?.lineItems.map((product) => {
                                return (
                                    <CartItem
                                        key={product.id}
                                        cartContent={cartContent}
                                        product={product}
                                        deleteProductHandler={
                                            handleCartItemDelete
                                        }
                                        handleQtyChange={handleQtyChange}
                                    />
                                );
                            })}
                        </div>
                        <div className={styles.cartFooter}>
                            <Discount
                                cartContent={cartContent}
                                applyToCartHandler={handlePromocodeApply}
                                removeFromCartHandler={handlePromocodeRemove}
                            />
                            <div className={styles.totalContainer}>
                                <div className={styles.totalPriceContainer}>
                                    <p
                                        className={clsx(
                                            styles.columnValue,
                                            styles.column
                                        )}
                                    >
                                        Total(€):
                                    </p>
                                    {cartContent.discountOnTotalPrice ||
                                    cartContent.lineItems[0]
                                        .discountedPricePerQuantity ? (
                                        <>
                                            <p
                                                className={clsx(
                                                    styles.columnValue,
                                                    styles.column,
                                                    styles.cartTotalOriginContainer
                                                )}
                                            >
                                                <span
                                                    className={
                                                        styles.cartTotalOrigin
                                                    }
                                                >
                                                    {getCartTotalOrigin(
                                                        cartContent
                                                    )}
                                                </span>
                                                <span
                                                    className={clsx(
                                                        styles.cross
                                                    )}
                                                ></span>
                                            </p>

                                            <p
                                                className={clsx(
                                                    styles.columnValue,
                                                    styles.column,
                                                    styles.cartTotalNew
                                                )}
                                            >
                                                {cartContent.totalPrice.toFixed(
                                                    2
                                                )}
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
                                <div className={styles.checkoutContainer}>
                                    <Button className={styles.checkout}>
                                        Proceed to Checkout
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ConfirmModal
                        isOpen={isModalOpened}
                        title="Clear Shopping Cart"
                        onConfirm={() => void handleCartDelete(cartContent)}
                        onCancel={() => setIsModalOpened(false)}
                        message="Are you sure you want to clear Shopping Cart"
                        confirmText="Clear"
                        cancelText="Cancel"
                    ></ConfirmModal>
                </>
            )}
        </>
    );
};
