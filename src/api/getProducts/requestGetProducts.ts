import axios from 'axios';
import { getAdminToken } from '../createCustomer/requestCreateCustomer';
import type { ProductProjectionPagedQueryResponse } from './getProducts.types';

export const requestGetProducts = async () => {
    const apiUrl = process.env.CTP_API_URL;
    const projectKey = process.env.CTP_PROJECT_KEY;
    const productsUrl = `${apiUrl}/${projectKey}/product-projections`;
    const adminToken = await getAdminToken();

    const response = await axios.get<ProductProjectionPagedQueryResponse>(
        productsUrl,
        {
            headers: {
                Authorization: `Bearer ${adminToken.access_token}`,
            },
            params: {
                withTotal: 'true',
                limit: 50,
            },
        }
    );

    console.log(response.data.results);
    return response.data.results;
};
