import type { CustomCart } from '../../../../../api/cart/cart.types';

export interface DiscountProps {
    cartContent: CustomCart;
    applyToCartHandler: (
        code: string,
        cartContent: CustomCart
    ) => Promise<void>;
    removeFromCartHandler: (
        id: string,
        cartContent: CustomCart
    ) => Promise<void>;
    discountError: string | null;
    setDiscountError: React.Dispatch<React.SetStateAction<string | null>>;
    onInput: () => void;
}
