import axios from 'axios';
import type { CategoryPagedQueryResponse } from './catalog.types';

export const requestGetCategories = async (token: string) => {
    const apiUrl = process.env.CTP_API_URL;
    const projectKey = process.env.CTP_PROJECT_KEY;
    const productsUrl = `${apiUrl}/${projectKey}/categories`;

    const response = await axios.get<CategoryPagedQueryResponse>(productsUrl, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            limit: 50,
        },
    });

    return response.data.results;
};
