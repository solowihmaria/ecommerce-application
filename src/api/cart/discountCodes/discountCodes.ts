import axios from 'axios';
import type { DiscountResponse } from './discountCodes.types';
import { getUserToken } from '../../auth/getToken';

export const getDiscountCodeById = async (
    id: string,
    loginStatus: boolean
): Promise<DiscountResponse> => {
    const token = await getUserToken(loginStatus);

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
    key: string,
    loginStatus: boolean
): Promise<DiscountResponse> => {
    const token = await getUserToken(loginStatus);

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
