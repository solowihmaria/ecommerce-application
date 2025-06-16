import axios from 'axios';
import type { AuthResponse } from './auth.types';
import { getUserToken } from '../cart/cart';
import { getAnonymousId } from '../anonymousId';
import { getAnonToken, setAnonToken } from '../token';

export const getGuestToken = async () => {
    const authUrl = process.env.CTP_AUTH_URL;
    const clientId = process.env.CTP_CLIENT_ID;
    const clientSecret = process.env.CTP_CLIENT_SECRET;
    /*const projectKey = process.env.CTP_PROJECT_KEY;*/

    const tokenUrl = `${authUrl}/oauth/token`;
    /* const guestScope = `manage_customers:${projectKey} view_products:${projectKey} view_categories:${projectKey}`;*/
    const credentials = btoa(`${clientId}:${clientSecret}`);

    const response = await axios.post<AuthResponse>(
        tokenUrl,
        new URLSearchParams({
            grant_type: 'client_credentials',
            /* scope: guestScope,*/
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

export const getAnonymousToken = async (anonymousId: string) => {
    const authUrl = process.env.CTP_AUTH_URL;
    const clientId = process.env.CTP_CLIENT_ID;
    const clientSecret = process.env.CTP_CLIENT_SECRET;
    const projectKey = process.env.CTP_PROJECT_KEY;

    const tokenUrl = `${authUrl}/oauth/${projectKey}/anonymous/token`;
    // const guestScope = `manage_customers:${projectKey} view_products:${projectKey} view_categories:${projectKey}:manage_my_shopping_lists${projectKey}`;
    const credentials = btoa(`${clientId}:${clientSecret}`);

    const response = await axios.post<AuthResponse>(
        tokenUrl,
        new URLSearchParams({
            grant_type: 'client_credentials',
            // scope: guestScope,
            anonymous_id: anonymousId,
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

export const getCustomerToken = async (loginStatus: boolean) => {
    let token;

    if (loginStatus) {
        token = getUserToken();
    } else {
        const anonymousId: string | null = getAnonymousId();
        console.log(`anon id${anonymousId}`);

        if (anonymousId) {
            const anonToken = getAnonToken();
            if (!anonToken) {
                const tokenResponse = await getAnonymousToken(anonymousId);

                if (tokenResponse) {
                    setAnonToken(tokenResponse.access_token);
                    token = tokenResponse.access_token;
                }
            } else {
                token = anonToken;
            }
        }
    }

    return token;
};
