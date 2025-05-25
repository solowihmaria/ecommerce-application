import axios from 'axios';
import type { Address, Customer } from './profile.types';
import { getToken } from '../token';

export const updateAddress = async (
    customerId: string,
    version: number,
    addressId: string,
    addressData: Partial<Address>
): Promise<Customer> => {
    const actions = [
        {
            action: 'changeAddress',
            addressId,
            address: {
                ...addressData,

                country: addressData.country || 'DE',
            },
        },
    ];

    const response = await axios.post<Customer>(
        `${process.env.CTP_API_URL}/${process.env.CTP_PROJECT_KEY}/customers/${customerId}`,
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
