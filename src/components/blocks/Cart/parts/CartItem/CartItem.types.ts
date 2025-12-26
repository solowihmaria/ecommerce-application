import type {
    CustomCart,
    CustomCartItem,
} from '../../../../../api/cart/cart.types';

export interface CartItemProps {
    product: CustomCartItem;
    cartContent: CustomCart;
    deleteProductHandler: (
        cartContent: CustomCart,
        id: string
    ) => Promise<void>;
    handleQtyChange: (
        value: string,
        cartContent: CustomCart,
        id: string
    ) => Promise<void>;
}
