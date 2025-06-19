import axios from 'axios';
import type { LoginResponse } from './auth.types';
import { getAnonymousId } from '../anonymousId';
import { getAnonToken } from '../token';

export const login = async (
    email: string,
    password: string
): Promise<LoginResponse> => {
    const authUrl = process.env.CTP_AUTH_URL;
    const projectKey = process.env.CTP_PROJECT_KEY;
    const clientId = process.env.CTP_CLIENT_ID;
    const clientSecret = process.env.CTP_CLIENT_SECRET;
    const scope = process.env.CTP_SCOPES;

    if (!authUrl || !projectKey || !clientId || !clientSecret || !scope) {
        throw new Error('Environment variables are missing!');
    } // проверка нужна, чтобы не было ошибок тайпскрипта

    const tokenUrl = `${authUrl}/oauth/${projectKey}/customers/token`;
    const credentials = btoa(`${clientId}:${clientSecret}`);

    const parameters = new URLSearchParams({
        grant_type: 'password',
        username: email,
        password: password,
        scope: scope,
    });

    const response = await axios.post<LoginResponse>(tokenUrl, parameters, {
        headers: {
            Authorization: `Basic ${credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });

    return response.data;
};

export const mergeCartsOnLogin = async (
    email: string,
    password: string
): Promise<void> => {
    const apiUrl = process.env.CTP_API_URL;
    const projectKey = process.env.CTP_PROJECT_KEY;

    const url = `${apiUrl}/${projectKey}/me/login`;
    const anonymousId: string | null = getAnonymousId();
    let token: string | null;
    if (anonymousId) {
        token = getAnonToken();
    } else {
        return;
    }

    const parameters = {
        email: email,
        password: password,
    };

    await axios.post(url, parameters, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
};

export const logout = async (token: string) => {
    const authUrl = process.env.CTP_AUTH_URL;
    const clientId = process.env.CTP_CLIENT_ID;
    const clientSecret = process.env.CTP_CLIENT_SECRET;

    const tokenUrl = `${authUrl}/oauth/token/revoke`;
    const credentials = btoa(`${clientId}:${clientSecret}`);

    const body = {
        token: token,
        token_type_hint: 'access_token',
    };

    await axios.post(tokenUrl, body, {
        headers: {
            Authorization: `Basic ${credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
};
