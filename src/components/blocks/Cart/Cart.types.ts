import type { CustomCart } from '../../../api/cart/cart.types';

export type CartHook = [
    CustomCart | null,
    boolean,
    (cartContent: CustomCart) => string,
    (qty: string, cartContent: CustomCart, lineId: string) => Promise<void>,
    (cartContent: CustomCart, lineId: string) => Promise<void>,
    (cartContent: CustomCart) => Promise<void>,
    (code: string, cartContent: CustomCart) => Promise<void>,
    (id: string, cartContent: CustomCart) => Promise<void>,
    string | null,
];
