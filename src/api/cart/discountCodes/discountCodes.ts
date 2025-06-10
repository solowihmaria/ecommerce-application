import axios from 'axios';
import { getToken } from '../../token';
import type { DiscountResponse } from './discountCodes.types';

export const getUserToken = () => {
    let accessToken: string = '';

    const storedToken = getToken();
    if (storedToken) {
        accessToken = storedToken;
    }

    return accessToken;
};

export const getDiscountCodeById = async (
    id: string
): Promise<DiscountResponse> => {
    const token = getUserToken();

    const apiUrl = process.env.CTP_API_URL;
    const projectKey = process.env.CTP_PROJECT_KEY;

    const url = `${apiUrl}/${projectKey}/discount-codes/${id}`;
    const discountCode = await axios.get<DiscountResponse>(url, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    return discountCode.data;
};

export const getDiscountCodeByKey = async (
    key: string
): Promise<DiscountResponse> => {
    const token = getUserToken();

    const apiUrl = process.env.CTP_API_URL;
    const projectKey = process.env.CTP_PROJECT_KEY;

    const url = `${apiUrl}/${projectKey}/discount-codes/key=${key}`;
    const discountCode = await axios.get<DiscountResponse>(url, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    return discountCode.data;
};
