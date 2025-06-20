import axios from 'axios';
import type { Customer } from './profile.types';
import { getToken } from '../token';

export const updatePersonalData = async (
    id: string,
    version: number,
    data: Partial<Customer>
): Promise<Customer> => {
    const actions = [];

    if (data.firstName) {
        actions.push({ action: 'setFirstName', firstName: data.firstName });
    }
    if (data.lastName) {
        actions.push({ action: 'setLastName', lastName: data.lastName });
    }
    if (data.dateOfBirth) {
        actions.push({
            action: 'setDateOfBirth',
            dateOfBirth: data.dateOfBirth,
        });
    }
    if (data.email) {
        actions.push({ action: 'changeEmail', email: data.email });
    }

    const response = await axios.post<Customer>(
        `${process.env.CTP_API_URL}/${process.env.CTP_PROJECT_KEY}/me`,
        {
            version,
            actions,
        },
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        }
    );
    return response.data;
};
