import axios from 'axios';
import type { ProductResponse } from './product.types';
import type { AuthResponse } from '../createCustomer/createCustomer.types';

const getToken = async () => {
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

export const getProductByID = async (id: string): Promise<ProductResponse> => {
    const tokenResponse = await getToken();
    const token = tokenResponse.access_token;
    const authUrl = process.env.CTP_API_URL;
    const projectKey = process.env.CTP_PROJECT_KEY;

    const productUrl = `${authUrl}/${projectKey}/products/${id}`;
    const product = await axios.get<ProductResponse>(productUrl, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    return product.data;
};
