import axios from 'axios';
import type { CreateCustomerResponse, Customer } from './createCustomer.types';
import type { RegistrationFormData } from '../../components/blocks/RegistrationForm/Registration.types';
import { getGuestToken } from '../auth/getToken';

function formatDateToYYYYMMDD(date: Date): string {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export const requestCreateCustomer = async ({
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    shippingAddress,
    billingAddress,
    shippingDefault,
    billingDefault,
}: RegistrationFormData) => {
    const apiUrl = process.env.CTP_API_URL;
    const projectKey = process.env.CTP_PROJECT_KEY;
    const tokenUrl = `${apiUrl}/${projectKey}/customers`;
    const adminToken = await getGuestToken();

    const parameters: Customer = {
        email,
        password,
        firstName,
        lastName,
        dateOfBirth: formatDateToYYYYMMDD(dateOfBirth),
        addresses: [shippingAddress, billingAddress],
        shippingAddresses: [0],
        billingAddresses: [1],
    };
    if (shippingDefault) {
        parameters.defaultShippingAddress = 0; // addresses[0]
    }
    if (billingDefault) {
        parameters.defaultBillingAddress = 1; // addresses[1]
    }

    const response = await axios.post<CreateCustomerResponse>(
        tokenUrl,
        parameters,
        {
            headers: {
                Authorization: `Bearer ${adminToken.access_token}`,
                'Content-Type': 'application/json',
            },
        }
    );

    return response.data;
};
