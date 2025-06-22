import axios from 'axios';
import type { AuthResponse } from './auth.types';
import { getAnonymousId } from '../anonymousId';
import {
    ANON_TOKEN_KEY,
    AUTH_TOKEN_KEY,
} from '../../utilities/constants/constants';
import { getToken, setToken } from '../token';

export const getUserToken = async (loginStatus: boolean) => {
    let accessToken: string = '';

    if (loginStatus) {
        const storedToken = getToken(AUTH_TOKEN_KEY);
        if (storedToken) {
            accessToken = storedToken;
        }
    } else {
        const tokenResponse = await getGuestToken();
        accessToken = tokenResponse.access_token;
    }

    return accessToken;
};

export const getGuestToken = async () => {
    const authUrl = process.env.CTP_AUTH_URL;
    const clientId = process.env.CTP_CLIENT_ID;
    const clientSecret = process.env.CTP_CLIENT_SECRET;
    const projectKey = process.env.CTP_PROJECT_KEY;

    const tokenUrl = `${authUrl}/oauth/token`;
    const guestScope = `manage_customers:${projectKey} view_products:${projectKey} view_categories:${projectKey} manage_my_orders:${projectKey} view_cart_discounts:${projectKey} view_orders:${projectKey} create_anonymous_token:${projectKey} view_products:${projectKey} view_discount_codes:${projectKey}`;

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

export const getAnonymousToken = async (anonymousId: string) => {
    const authUrl = process.env.CTP_AUTH_URL;
    const clientId = process.env.CTP_CLIENT_ID;
    const clientSecret = process.env.CTP_CLIENT_SECRET;
    const projectKey = process.env.CTP_PROJECT_KEY;
    const scope = process.env.CTP_SCOPES;

    const tokenUrl = `${authUrl}/oauth/${projectKey}/anonymous/token`;

    //  const guestScope = `manage_customers:${projectKey} view_products:${projectKey} manage_my_profile:${projectKey} manage_my_orders:${projectKey} view_categories:${projectKey} view_cart_discounts:${projectKey} view_orders:${projectKey} create_anonymous_token:${projectKey} view_products:${projectKey} view_discount_codes:${projectKey}`;

    const credentials = btoa(`${clientId}:${clientSecret}`);

    if (!authUrl || !projectKey || !clientId || !clientSecret || !scope) {
        throw new Error('Environment variables are missing!');
    }

    const response = await axios.post<AuthResponse>(
        tokenUrl,
        new URLSearchParams({
            grant_type: 'client_credentials',
            scope: scope,
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
        token = getUserToken(loginStatus);
    } else {
        const anonymousId: string | null = getAnonymousId();

        if (anonymousId) {
            const anonToken = getToken(ANON_TOKEN_KEY);
            if (!anonToken) {
                const tokenResponse = await getAnonymousToken(anonymousId);

                if (tokenResponse) {
                    setToken(tokenResponse.access_token, ANON_TOKEN_KEY);
                    token = tokenResponse.access_token;
                }
            } else {
                token = anonToken;
            }
        }
    }

    return token;
};
