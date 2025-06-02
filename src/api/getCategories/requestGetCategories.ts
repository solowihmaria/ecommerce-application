import axios from 'axios';
import type { CategoryPagedQueryResponse } from './getCategories.types';
import { getGuestToken } from '../auth/getToken';

export const requestGetCategories = async () => {
    const apiUrl = process.env.CTP_API_URL;
    const projectKey = process.env.CTP_PROJECT_KEY;
    const productsUrl = `${apiUrl}/${projectKey}/categories`;
    const adminToken = await getGuestToken();

    const response = await axios.get<CategoryPagedQueryResponse>(productsUrl, {
        headers: {
            Authorization: `Bearer ${adminToken.access_token}`,
        },
        params: {
            limit: 50,
        },
    });

    return response.data.results;
};
