import axios from 'axios';
import { getAdminToken } from '../createCustomer/requestCreateCustomer';
import type { ProductProjectionPagedSearchResponse } from './getProducts.types';

export const requestGetProducts = async (sort?: string, query?: string) => {
    const apiUrl = process.env.CTP_API_URL;
    const projectKey = process.env.CTP_PROJECT_KEY;
    const productsUrl = `${apiUrl}/${projectKey}/product-projections/search`;
    const adminToken = await getAdminToken();

    const response = await axios.get<ProductProjectionPagedSearchResponse>(
        productsUrl,
        {
            headers: {
                Authorization: `Bearer ${adminToken.access_token}`,
            },
            params: {
                limit: 50,
                ...(sort ? { sort } : {}),
                ...(query ? { 'text.en-US': query, fuzzy: true } : {}),
            },
        }
    );

    console.log('RESULTS', response.data.results);
    return response.data.results;
};
