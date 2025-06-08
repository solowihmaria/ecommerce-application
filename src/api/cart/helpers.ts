import { prepareVariant } from '../product/productService';
import type {
    CartItem,
    CartResponse,
    CustomCart,
    CustomCartItem,
} from './cart.types';

export const prepareLineItem = (lineItem: CartItem) => {
    const { id, productId, name, quantity, totalPrice, variant } = lineItem;

    const product: CustomCartItem = {
        id: id,
        productId: productId,
        name: name['en-US'],
        quantity: quantity,
        totalPrice: totalPrice.centAmount / 100,
        variant: prepareVariant(variant),
    };

    return product;
};

export const prepareCartData = (cartData: CartResponse): CustomCart => {
    const {
        id,
        customerId,
        version,
        lineItems,
        totalLineItemQuantity,
        totalPrice,
    } = cartData;

    const cart: CustomCart = {
        id: id,
        customerId: customerId,
        version,
        lineItems: lineItems.map((lineItem) => prepareLineItem(lineItem)),
        totalLineItemQuantity: totalLineItemQuantity,
        totalPrice: totalPrice.centAmount / 100,
    };

    return cart;
};
