import { useState } from 'react';
import { Heading } from '../../ui/Heading';
import styles from './Cart.module.scss';
import { Button } from '../../ui/Button';
import clsx from 'clsx';
import { EmptyCart } from './parts/EmptyCart/EmptyCart';
import { ConfirmModal } from '../../ui/ConfirmModal';
import { Discount } from './parts/Discount/Discount';
import { CartItem } from './parts/CartItem/CartItem';
import { useCart } from './lib/useCart';
import type { CartHook } from './Cart.types';
import { useDiscountError } from './lib/useDiscountError';
import { TotalPrice } from './parts/TotalPrice/TotalPrice';
// import { ErrorCart } from './parts/ErrorCart/ErrorCart';

export const Cart = () => {
    const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
    const [
        discountError,
        setDiscountError,
        handleDiscountApiError,
        clearDiscountError,
    ] = useDiscountError();
    const [
        cartContent,
        isCartLoading,
        handleQtyChange,
        handleCartItemDelete,
        handleCartDelete,
        handleDiscountApply,
        handleDiscountRemove,
        // cartError,
    ]: CartHook = useCart(handleDiscountApiError, clearDiscountError);

    if (
        !isCartLoading &&
        (cartContent?.lineItems.length === 0 || cartContent === null)
    ) {
        return <EmptyCart />;
    }

    // if (cartError && !isLoading) {
    //     {
    //         return <ErrorCart message={cartError} />;
    //     }
    // }
    return (
        <>
            {!isCartLoading && cartContent && (
                <>
                    <div className={styles.cartContainer}>
                        <Heading className={styles.cartTitle}>
                            Shopping Cart
                        </Heading>
                        <div className={styles.cartHeader}>
                            <div
                                className={clsx(
                                    styles.leftHeader,
                                    styles.firstColumn
                                )}
                            >
                                <Button
                                    className={clsx(
                                        styles.clear,
                                        styles.button
                                    )}
                                    onClick={() => setIsModalOpened(true)}
                                >
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
                                applyToCartHandler={handleDiscountApply}
                                removeFromCartHandler={handleDiscountRemove}
                                discountError={discountError}
                                setDiscountError={setDiscountError}
                                onInput={clearDiscountError}
                            />
                            <div className={styles.totalContainer}>
                                <TotalPrice cartContent={cartContent} />
                                <div className={styles.checkoutContainer}>
                                    <Button
                                        className={clsx(
                                            styles.checkout,
                                            styles.button
                                        )}
                                    >
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
