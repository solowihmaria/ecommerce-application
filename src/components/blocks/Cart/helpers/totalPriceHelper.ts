import type { CustomCart } from '../../../../api/cart/cart.types';

export function getCartTotalOrigin(cartContent: CustomCart): string {
    const initialPrices = cartContent.lineItems.map(
        (lineItem) => lineItem.variant.price * lineItem.quantity
    );
    const initialTotal = initialPrices.reduce(
        (accumulator, currentValue) => accumulator + currentValue
    );
    return initialTotal.toFixed(2);
}
