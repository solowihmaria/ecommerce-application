import axios from 'axios';
import type {
    AddDiscountCodePayload,
    CartResponse,
    CustomCart,
    DeleteItemPayload,
    QtyUpdatePayload,
    RemoveDiscountCodePayload,
} from './cart.types';
import { getToken } from '../token';

export const getUserToken = () => {
    let accessToken: string = '';

    const storedToken = getToken();
    if (storedToken) {
        accessToken = storedToken;
    }

    return accessToken;
};

export const getUserCartByCustomerId = async (
    customerId: string
): Promise<CartResponse> => {
    const token = getUserToken();

    const apiUrl = process.env.CTP_API_URL;
    const projectKey = process.env.CTP_PROJECT_KEY;

    const productUrl = `${apiUrl}/${projectKey}/carts/customer-id=${customerId}`;
    const product = await axios.get<CartResponse>(productUrl, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    return product.data;
};

export const getUserCart = async (): Promise<CartResponse> => {
    const token = getUserToken();

    const apiUrl = process.env.CTP_API_URL;
    const projectKey = process.env.CTP_PROJECT_KEY;

    const cartUrl = `${apiUrl}/${projectKey}/me/active-cart`;
    const cart = await axios.get<CartResponse>(cartUrl, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    return cart.data;
};

export const deleteCart = async (
    cartContent: CustomCart
): Promise<CartResponse> => {
    const token = getUserToken();

    const apiUrl = process.env.CTP_API_URL;
    const projectKey = process.env.CTP_PROJECT_KEY;

    const cartUrl = `${apiUrl}/${projectKey}/me/carts/${cartContent.id}?version=${cartContent.version}`;
    const cart = await axios.delete<CartResponse>(cartUrl, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return cart.data;
};

export const updateCart = async (
    payload:
        | QtyUpdatePayload
        | DeleteItemPayload
        | AddDiscountCodePayload
        | RemoveDiscountCodePayload,
    cartId: string
): Promise<CartResponse> => {
    const token = getUserToken();

    const apiUrl = process.env.CTP_API_URL;
    const projectKey = process.env.CTP_PROJECT_KEY;

    const cartUrl = `${apiUrl}/${projectKey}/me/carts/${cartId}`;
    const cart = await axios.post<CartResponse>(cartUrl, payload, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    return cart.data;
};

export const changeItemQty = async (
    qty: number,
    cartContent: CustomCart,
    lineId: string
): Promise<CartResponse> => {
    const payload: QtyUpdatePayload = {
        version: cartContent.version,
        actions: [
            {
                action: 'changeLineItemQuantity',
                lineItemId: lineId,
                quantity: qty,
            },
        ],
    };

    const cart = await updateCart(payload, cartContent.id);
    return cart;
};

export const removeCartItem = async (
    cartContent: CustomCart,
    lineId: string
): Promise<CartResponse> => {
    const payload: DeleteItemPayload = {
        version: cartContent.version,
        actions: [
            {
                action: 'removeLineItem',
                lineItemId: lineId,
            },
        ],
    };

    const cart = await updateCart(payload, cartContent.id);
    return cart;
};

export const addDiscountCode = async (
    code: string,
    cartContent: CustomCart
): Promise<CartResponse> => {
    const payload: AddDiscountCodePayload = {
        version: cartContent.version,
        actions: [
            {
                action: 'addDiscountCode',
                code: code,
            },
        ],
    };

    const cart = await updateCart(payload, cartContent.id);
    return cart;
};

export const removeDiscountCode = async (
    id: string,
    cartContent: CustomCart
): Promise<CartResponse> => {
    const payload: RemoveDiscountCodePayload = {
        version: cartContent.version,
        actions: [
            {
                action: 'removeDiscountCode',
                discountCode: {
                    typeId: 'discount-code',
                    id: id,
                },
            },
        ],
    };

    const cart = await updateCart(payload, cartContent.id);
    return cart;
};
