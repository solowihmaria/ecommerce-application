import { prepareVariant } from '../product/productService';
import type {
    CartItem,
    CartResponse,
    CustomCart,
    CustomCartItem,
} from './cart.types';

export const prepareLineItem = (lineItem: CartItem) => {
    const {
        id,
        productId,
        name,
        quantity,
        totalPrice,
        variant,
        discountedPricePerQuantity,
    } = lineItem;

    const promocodeDiscountData =
        discountedPricePerQuantity.length > 0
            ? {
                  discount:
                      discountedPricePerQuantity[0].discountedPrice
                          .includedDiscounts[0].discountedAmount.centAmount /
                      100,
                  currentPrice:
                      discountedPricePerQuantity[0].discountedPrice.value
                          .centAmount / 100,
              }
            : null;

    const product: CustomCartItem = {
        id: id,
        productId: productId,
        name: name['en-US'],
        quantity: quantity,
        totalPrice: totalPrice.centAmount / 100,
        variant: prepareVariant(variant),
        discountedPricePerQuantity: promocodeDiscountData,
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
        discountCodes,
        discountOnTotalPrice,
    } = cartData;

    const discountTotal = discountOnTotalPrice
        ? discountOnTotalPrice.discountedAmount.centAmount / 100
        : null;

    const cart: CustomCart = {
        id: id,
        customerId: customerId,
        version,
        lineItems: lineItems.map((lineItem) => prepareLineItem(lineItem)),
        totalLineItemQuantity: totalLineItemQuantity,
        totalPrice: totalPrice.centAmount / 100,
        discountCodes: discountCodes,
        discountOnTotalPrice: discountTotal,
    };

    return cart;
};
