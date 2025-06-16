import axios from 'axios';
import type {
    AddDiscountCodePayload,
    AddItemPayload,
    CartDraft,
    CartResponse,
    CustomCart,
    DeleteItemPayload,
    QtyUpdatePayload,
    RemoveDiscountCodePayload,
} from './cart.types';
// import { getAnonymousId } from '../anonymousId';
import { getCustomerToken } from '../auth/getToken';
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

export const getCart = async (loginStatus: boolean): Promise<CartResponse> => {
    const token = getCustomerToken(loginStatus);

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

// export const getUserCart = async (): Promise<CartResponse> => {
//     const token = getUserToken();

//     const apiUrl = process.env.CTP_API_URL;
//     const projectKey = process.env.CTP_PROJECT_KEY;

//     const cartUrl = `${apiUrl}/${projectKey}/me/active-cart`;
//     const cart = await axios.get<CartResponse>(cartUrl, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//         },
//     });
//     return cart.data;
// };

// export const getAnonymousCart = async (): Promise<CartResponse> => {
//     let token;

//     const anonymousId: string | null = getAnonymousId();
//     if (anonymousId) {
//         const response = await getAnonymousToken(anonymousId);

//         if (response.access_token) {
//             token = response.access_token;
//         }
//     }

//     const apiUrl = process.env.CTP_API_URL;
//     const projectKey = process.env.CTP_PROJECT_KEY;

//     const cartUrl = `${apiUrl}/${projectKey}/me/active-cart`;
//     const cart = await axios.get<CartResponse>(cartUrl, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//         },
//     });
//     return cart.data;
// };

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
        | AddItemPayload
        | DeleteItemPayload
        | AddDiscountCodePayload
        | RemoveDiscountCodePayload,
    cartId: string,
    loginStatus: boolean
): Promise<CartResponse> => {
    const token = getCustomerToken(loginStatus);

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
    lineId: string,
    loginStatus: boolean
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

    const cart = await updateCart(payload, cartContent.id, loginStatus);
    return cart;
};

export const removeCartItem = async (
    cartContent: CustomCart,
    lineId: string,
    loginStatus: boolean
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

    const cart = await updateCart(payload, cartContent.id, loginStatus);
    return cart;
};

export const addDiscountCode = async (
    code: string,
    cartContent: CustomCart,
    loginStatus: boolean
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

    const cart = await updateCart(payload, cartContent.id, loginStatus);
    return cart;
};

export const removeDiscountCode = async (
    id: string,
    cartContent: CustomCart,
    loginStatus: boolean
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

    const cart = await updateCart(payload, cartContent.id, loginStatus);
    return cart;
};

export const createCart = async (
    loginStatus: boolean,
    payload?: CartDraft
): Promise<CartResponse> => {
    const token = getCustomerToken(loginStatus);

    const apiUrl = process.env.CTP_API_URL;
    const projectKey = process.env.CTP_PROJECT_KEY;

    const cartUrl = `${apiUrl}/${projectKey}/me/carts`;
    const cart = await axios.post<CartResponse>(
        cartUrl,
        payload ? payload : { currency: 'EUR' },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }
    );
    return cart.data;
};

// export const createAnonymousCart = async (
//     payload?: CartDraft
// ): Promise<CartResponse> => {
//     let token;

//     const anonymousId: string | null = getAnonymousId();
//     if (anonymousId) {
//         const response = await getAnonymousToken(anonymousId);

//         if (response.access_token) {
//             token = response.access_token;
//         }
//     }

//     // const anonymousId = getAnonymousId() || generateAnonymousId();

//     const apiUrl = process.env.CTP_API_URL;
//     const projectKey = process.env.CTP_PROJECT_KEY;

//     const cartUrl = `${apiUrl}/${projectKey}/carts`;
//     const cart = await axios.post<CartResponse>(
//         cartUrl,
//         payload ? payload : { currency: 'EUR', anonymousId },
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 'Content-Type': 'application/json',
//             },
//         }
//     );
//     return cart.data;
// };

export const addCartItem = async (
    cartContent: CustomCart,
    sku: string,
    loginStatus: boolean
): Promise<CartResponse> => {
    const payload: AddItemPayload = {
        version: cartContent.version,
        actions: [
            {
                action: 'addLineItem',
                sku,
            },
        ],
    };

    const cart = await updateCart(payload, cartContent.id, loginStatus);
    return cart;
};
