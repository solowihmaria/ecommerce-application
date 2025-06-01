import axios from 'axios';
import type { ProductResponse } from './product.types';
import type { AuthResponse } from '../createCustomer/createCustomer.types';
import { getToken } from '../token';

export const getUserToken = async (loginStatus: boolean) => {
    let accessToken: string = '';

    if (loginStatus) {
        const storedToken = getToken();
        if (storedToken) {
            accessToken = storedToken;
        }
    } else {
        const tokenResponse = await getGuestToken();
        accessToken = tokenResponse.access_token;
    }

    return accessToken;
};

const getGuestToken = async () => {
    const authUrl = process.env.CTP_AUTH_URL;
    const clientId = process.env.CTP_CLIENT_ID;
    const clientSecret = process.env.CTP_CLIENT_SECRET;

    const tokenUrl = `${authUrl}/oauth/token`;
    const credentials = btoa(`${clientId}:${clientSecret}`);

    const response = await axios.post<AuthResponse>(
        tokenUrl,
        new URLSearchParams({
            grant_type: 'client_credentials',
        }),
        {
            headers: {
                Authorization: `Basic ${credentials}`,
                'Content-type': 'application/x-www-form-urlencoded',
            },
        }
    );

    return response.data;
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
