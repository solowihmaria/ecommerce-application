import type { CustomVariant, Variant, Price } from '../../types/product.types';

export interface CartResponse {
    id: string;
    version: number;
    customerId: string;
    lineItems: CartItem[];
    totalLineItemQuantity: number;
    totalPrice: {
        type: string;
        currencyCode: string;
        centAmount: number;
        fractionDigits: number;
    };
    discountCodes: {
        discountCode: {
            id: string;
            typeId: string;
        };
        state: string;
    }[];
    discountOnTotalPrice: {
        discountedAmount: {
            type: string;
            currencyCode: string;
            centAmount: number;
            fractionDigits: number;
        };
        includedDiscounts: {
            discountedNetAmount: {
                type: string;
                currencyCode: string;
                centAmount: number;
                fractionDigits: number;
            };
            discountedGrossAmount: {
                type: string;
                currencyCode: string;
                centAmount: number;
                fractionDigits: number;
            };
        };
    };
}

export interface CartItem {
    id: string;
    key: string;
    productId: string;
    productKey: string;
    name: {
        'en-US': string;
    };
    productSlug: string;
    variant: Variant;
    price: Price;
    quantity: number;
    totalPrice: {
        type: string;
        currencyCode: string;
        centAmount: number;
        fractionDigits: number;
    };
    discountedPricePerQuantity: DiscountedPrice[];
}

interface DiscountedPrice {
    quantity: number;
    discountedPrice: {
        value: {
            type: string;
            currencyCode: string;
            centAmount: number;
            fractionDigits: number;
        };
        includedDiscounts: {
            discount: {
                id: string;
                typeId: string;
            };
            discountedAmount: {
                type: string;
                currencyCode: string;
                centAmount: number;
                fractionDigits: number;
            };
        }[];
    };
}

export interface CustomCart {
    id: string;
    customerId: string;
    version: number;
    lineItems: CustomCartItem[];
    totalLineItemQuantity: number;
    totalPrice: number;
    discountCodes: {
        discountCode: {
            id: string;
            typeId: string;
        };
        state: string;
    }[];
    discountOnTotalPrice: number | null;
}

export interface CustomCartItem {
    id: string;
    productId: string;
    name: string;
    quantity: number;
    totalPrice: number;
    variant: CustomVariant;
    discountedPricePerQuantity: {
        discount: number;
        currentPrice: number;
    } | null;
}

export interface QtyUpdatePayload {
    version: number;
    actions: [
        {
            action: string;
            lineItemId: string;
            quantity: number;
        },
    ];
}

export interface DeleteItemPayload {
    version: number;
    actions: [
        {
            action: string;
            lineItemId: string;
        },
    ];
}

export interface AddDiscountCodePayload {
    version: number;
    actions: [
        {
            action: string;
            code: string;
        },
    ];
}

export interface RemoveDiscountCodePayload {
    version: number;
    actions: [
        {
            action: string;
            discountCode: {
                typeId: string;
                id: string;
            };
        },
    ];
}

export interface CartDraft {
    currency: 'EUR';
}

export interface AddItemPayload {
    version: number;
    actions: [
        {
            action: string;
            sku: string;
        },
    ];
}
