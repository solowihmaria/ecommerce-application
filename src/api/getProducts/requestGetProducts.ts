import axios from 'axios';
import { getAdminToken } from '../createCustomer/requestCreateCustomer';
import type { ProductPagedQueryResponse } from './getProducts.types';

export const requestGetProducts = async () => {
    const apiUrl = process.env.CTP_API_URL;
    const projectKey = process.env.CTP_PROJECT_KEY;
    const productsUrl = `${apiUrl}/${projectKey}/product-projections`;
    const adminToken = await getAdminToken();

    // const parameters = new URLSearchParams({
    //     withTotal: 'true',
    // });

    const response = await axios.get<ProductPagedQueryResponse>(productsUrl, {
        headers: {
            Authorization: `Bearer ${adminToken.access_token}`,
        },
        params: {
            withTotal: 'true',
        },
    });

    console.log(response);
    return response.data;
};
