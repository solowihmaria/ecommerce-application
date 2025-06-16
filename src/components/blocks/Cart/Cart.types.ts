import type { CustomCart } from '../../../api/cart/cart.types';

export interface CartHook {
    cartContent: CustomCart | null;
    isCartLoading: boolean;
    handleQtyChange: (
        qty: string,
        cartContent: CustomCart,
        lineId: string
    ) => Promise<void>;
    handleCartItemDelete: (
        cartContent: CustomCart,
        lineId: string
    ) => Promise<void>;
    handleCartDelete: (cartContent: CustomCart) => Promise<void>;
    handleDiscountApply: (
        code: string,
        cartContent: CustomCart
    ) => Promise<void>;
    handleDiscountRemove: (
        id: string,
        cartContent: CustomCart
    ) => Promise<void>;
    cartError: string | null;
}

export interface DiscountHook {
    discountCodeError: string | null;
    setDiscountCodeError: React.Dispatch<React.SetStateAction<string | null>>;
    handleDiscountApiError: (error: unknown) => void;
    clearDiscountError: () => void;
}
