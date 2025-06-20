import axios from 'axios';
import type { Customer } from './profile.types';

export const fetchMyProfile = async (token: string): Promise<Customer> => {
    const apiUrl = process.env.CTP_API_URL;
    const projectKey = process.env.CTP_PROJECT_KEY;

    if (!apiUrl || !projectKey) {
        throw new Error('API configuration missing!');
    }

    const response = await axios.get<Customer>(`${apiUrl}/${projectKey}/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};
