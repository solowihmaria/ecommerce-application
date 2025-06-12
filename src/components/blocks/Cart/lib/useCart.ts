import { useContext, useEffect, useState } from 'react';
import type { CustomCart } from '../../../../api/cart/cart.types';
import {
    addDiscountCode,
    changeItemQty,
    deleteCart,
    getUserCart,
    removeCartItem,
    removeDiscountCode,
} from '../../../../api/cart/cart';
import { prepareCartData } from '../../../../api/cart/helpers';
import type { CartHook } from '../Cart.types';
import { ToastContext } from '../../../ui/Toast/ToastContext';

export const useCart = (
    handleDiscountApiError: (error: unknown) => void,
    clearDiscountError: () => void
): CartHook => {
    const [cartContent, setCartContent] = useState<null | CustomCart>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { showToast } = useContext(ToastContext);

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
        } catch (err) {
            console.error(err);
        }
    };
    const handleCartItemDelete = async (
        cartContent: CustomCart,
        lineId: string
    ) => {
        try {
            const updatedCart = await removeCartItem(cartContent, lineId);
            setCartContent(prepareCartData(updatedCart));
        } catch (err) {
            console.error(err);
            showToast({
                message: 'Failed to delete item',
                variant: 'error',
            });
        }
    };

    const handleCartDelete = async (cartContent: CustomCart) => {
        try {
            await deleteCart(cartContent);
            setCartContent(null);
            showToast({
                message: 'All cart items are removed',
                variant: 'success',
            });
        } catch (err) {
            console.error(err);
            showToast({
                message: 'Failed to clear all cart items',
                variant: 'error',
            });
        }
    };
    const handleDiscountApply = async (
        code: string,
        cartContent: CustomCart
    ) => {
        try {
            const updatedCart = await addDiscountCode(code, cartContent);
            setCartContent(prepareCartData(updatedCart));
            showToast({
                message: 'Discount applied',
                variant: 'success',
            });
        } catch (err) {
            console.error(err);
            handleDiscountApiError(err);
        }
    };

    const handleDiscountRemove = async (
        id: string,
        cartContent: CustomCart
    ) => {
        try {
            const updatedCart = await removeDiscountCode(id, cartContent);
            setCartContent(prepareCartData(updatedCart));
            clearDiscountError();
        } catch (err) {
            console.error(err);
            handleDiscountApiError(err);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        getUserCart()
            .then((cartData) => {
                console.log(cartData);
                setCartContent(prepareCartData(cartData));
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setIsLoading(false);
            });
    }, []);

    return [
        cartContent,
        isLoading,
        handleQtyChange,
        handleCartItemDelete,
        handleCartDelete,
        handleDiscountApply,
        handleDiscountRemove,
    ];
};
