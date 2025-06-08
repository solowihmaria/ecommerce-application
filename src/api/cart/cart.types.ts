import type { Variant } from '../product/product.types';
import type { Price } from '../product/product.types';

export interface CartResponse {
    id: string;
    customerId: string;
    lineItems: CartItem[];
    totalLineItemQuantity: number;
    totalPrice: {
        type: string;
        currencyCode: string;
        centAmount: number;
        fractionDigits: number;
    };
    discountCodes: [];
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
    discounterPrice: {
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
        };
    };
}
