import type { CustomCart } from '../../../../api/cart/cart.types';

export function getCartTotalOrigin(cartContent: CustomCart): string {
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
