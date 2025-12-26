import { useState, useContext } from 'react';
import { useAuth } from '../../../../store/auth/useAuth';
import { ToastContext } from '../../../ui/Toast/ToastContext';
import { addCartItem } from '../../../../api/cart/cart';
import { prepareCartData } from '../../../../api/cart/helpers';
import { CartErrorMessages } from './constants';

export const useAddToCart = () => {
    const { loginStatus, cartContent, setCartContent } = useAuth();
    const { showToast } = useContext(ToastContext);
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = async (productName: string, variantSKU: string) => {
        if (!cartContent) {
            return;
        }

        setIsAdding(true);

        try {
            const updatedCart = await addCartItem(
                cartContent,
                variantSKU,
                loginStatus
            );
            setCartContent(prepareCartData(updatedCart));

            showToast({
                message: `${productName} added to your cart!`,
                variant: 'success',
            });

            return true;
        } catch {
            showToast({
                message: CartErrorMessages.FAILED_TO_ADD_ITEM_MESSAGE,
                variant: 'error',
            });

            return false;
        } finally {
            setIsAdding(false);
        }
    };

    return { handleAddToCart, isAdding };
};
