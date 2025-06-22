import axios from 'axios';
import type { ProductResponse } from './product.types';
import { getToken } from '../token';
import { getGuestToken } from '../auth/getToken';
import { AUTH_TOKEN_KEY } from '../../utilities/constants/constants';

export const getUserToken = async (loginStatus: boolean) => {
    let accessToken: string = '';

    if (loginStatus) {
        const storedToken = getToken(AUTH_TOKEN_KEY);
        if (storedToken) {
            accessToken = storedToken;
        }
    } else {
        const tokenResponse = await getGuestToken();
        accessToken = tokenResponse.access_token;
    }

    return accessToken;
};

export const getProductByID = async (
    id: string,
    token: string
): Promise<ProductResponse> => {
    const apiUrl = process.env.CTP_API_URL;
    const projectKey = process.env.CTP_PROJECT_KEY;

    const productUrl = `${apiUrl}/${projectKey}/products/${id}`;
    const product = await axios.get<ProductResponse>(productUrl, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    return product.data;
};
