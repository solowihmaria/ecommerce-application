import axios from 'axios';
import { getToken } from '../token';
import type { Customer } from './profile.types';

export const changePassword = async (
    id: string,
    version: number,
    currentPassword: string,
    newPassword: string
): Promise<Customer> => {
    const response = await axios.post<Customer>(
        `${process.env.CTP_API_URL}/${process.env.CTP_PROJECT_KEY}/customers/password`,
        {
            id,
            version,
            currentPassword,
            newPassword,
        },
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        }
    );
    return response.data;
};
