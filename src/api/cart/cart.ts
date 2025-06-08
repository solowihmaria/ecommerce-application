import axios from 'axios';
import type { CartResponse } from './cart.types';
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

    const productUrl = `${apiUrl}/${projectKey}/me/active-cart`;
    const product = await axios.get<CartResponse>(productUrl, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    return product.data;
};
