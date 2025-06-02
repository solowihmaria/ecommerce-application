import axios from 'axios';
import type { AuthResponse } from './auth.types';

export const getGuestToken = async () => {
    const authUrl = process.env.CTP_AUTH_URL;
    const clientId = process.env.CTP_CLIENT_ID;
    const clientSecret = process.env.CTP_CLIENT_SECRET;
    const projectKey = process.env.CTP_PROJECT_KEY;

    const tokenUrl = `${authUrl}/oauth/token`;
    const guestScope = `manage_customers:${projectKey} view_products:${projectKey} view_categories:${projectKey}`;
    const credentials = btoa(`${clientId}:${clientSecret}`);

    const response = await axios.post<AuthResponse>(
        tokenUrl,
        new URLSearchParams({
            grant_type: 'client_credentials',
            scope: guestScope,
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
