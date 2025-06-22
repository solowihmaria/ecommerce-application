import axios from 'axios';
import type { ProductResponse } from './product.types';
import { getUserToken } from '../auth/getToken';

export const getProductByID = async (
    id: string,
    loginStatus: boolean
): Promise<ProductResponse> => {
    const apiUrl = process.env.CTP_API_URL;
    const projectKey = process.env.CTP_PROJECT_KEY;
    const token = await getUserToken(loginStatus);

    const productUrl = `${apiUrl}/${projectKey}/products/${id}`;
    const product = await axios.get<ProductResponse>(productUrl, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    return product.data;
};
