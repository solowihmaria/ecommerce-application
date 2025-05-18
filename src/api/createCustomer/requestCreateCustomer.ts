import axios from 'axios';
import type {
    AuthResponse,
    CreateCustomerResponse,
    Customer,
} from './createCustomer.types';
import type { RegistrationFormData } from '../../components/blocks/RegistrationForm/Registration.types';

const getAdminToken = async () => {
    const authUrl = process.env.CTP_AUTH_URL;
    const clientId = process.env.CTP_CLIENT_ID;
    const clientSecret = process.env.CTP_CLIENT_SECRET;
    const projectKey = process.env.CTP_PROJECT_KEY;

    const tokenUrl = `${authUrl}/oauth/token`;
    const customerScope = `manage_customers:${projectKey}`;
    const credentials = btoa(`${clientId}:${clientSecret}`);

    const response = await axios.post<AuthResponse>(
        tokenUrl,
        new URLSearchParams({
            grant_type: 'client_credentials',
            scope: customerScope,
        }),
        {
            headers: {
                Authorization: `Basic ${credentials}`,
                'Content-type': 'application/x-www-form-urlencoded',
            },
        }
    );

    return response.data;
};

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
    const adminToken = await getAdminToken();

    const parameters: Customer = {
        email,
        password,
        firstName,
        lastName,
        dateOfBirth: dateOfBirth.toISOString().split('T')[0],
        addresses: [shippingAddress, billingAddress],
    };
    if (shippingDefault) {
        parameters.defaultShippingAddress = 0; // addresses[0]
    }
    if (billingDefault) {
        parameters.defaultBillingAddress = 1; // addresses[1]
    }

    // try {
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
    // } catch (error) {
    //     console.log('REQUEST ERROR', error);
    //     throw error;
    // }
};
