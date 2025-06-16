import { useContext } from 'react';
import type { CustomCart } from '../../../../api/cart/cart.types';
import {
    addDiscountCode,
    changeItemQty,
    deleteCart,
    // getUserCart,
    removeCartItem,
    removeDiscountCode,
} from '../../../../api/cart/cart';
import { prepareCartData } from '../../../../api/cart/helpers';
import type { CartHook } from '../Cart.types';
import { ToastContext } from '../../../ui/Toast/ToastContext';
// import { AxiosError } from 'axios';
import { CartErrorMessages } from './constants';
import { useAuth } from '../../../../store/auth/useAuth';

export const useCart = (
    handleDiscountApiError: (error: unknown) => void,
    clearDiscountError: () => void
): CartHook => {
    const { loginStatus, cartContent, setCartContent } = useAuth();
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
                lineId,
                loginStatus
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
            const updatedCart = await removeCartItem(
                cartContent,
                lineId,
                loginStatus
            );
            setCartContent(prepareCartData(updatedCart));
        } catch (err) {
            console.error(err);
            showToast({
                message: CartErrorMessages.FAILED_TO_DELETE_MESSAGE,
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
                message: CartErrorMessages.FAILED_CLEAR_MESSAGE,
                variant: 'error',
            });
        }
    };
    const handleDiscountApply = async (
        code: string,
        cartContent: CustomCart
    ) => {
        try {
            const updatedCart = await addDiscountCode(
                code,
                cartContent,
                loginStatus
            );
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
            const updatedCart = await removeDiscountCode(
                id,
                cartContent,
                loginStatus
            );
            setCartContent(prepareCartData(updatedCart));
            clearDiscountError();
        } catch (err) {
            console.error(err);
            handleDiscountApiError(err);
        }
    };

    return [
        cartContent,
        handleQtyChange,
        handleCartItemDelete,
        handleCartDelete,
        handleDiscountApply,
        handleDiscountRemove,
    ];
};
