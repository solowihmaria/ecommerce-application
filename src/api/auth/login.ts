import axios from 'axios';
import type { LoginResponse } from './auth.types';

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

export const logout = async (token: string): Promise<number> => {
    const authUrl = process.env.CTP_AUTH_URL;
    const projectKey = process.env.CTP_PROJECT_KEY;
    const clientId = process.env.CTP_CLIENT_ID;
    const clientSecret = process.env.CTP_CLIENT_SECRET;
    const scope = process.env.CTP_SCOPES;

    if (!authUrl || !projectKey || !clientId || !clientSecret || !scope) {
        throw new Error('Environment variables are missing!');
    }

    const tokenUrl = `${authUrl}/oauth/token/revoke`;
    const credentials = btoa(`${clientId}:${clientSecret}`);

    const body = {
        token: token,
        token_type_hint: 'access_token',
    };

    const response = await axios.post<number>(tokenUrl, body, {
        headers: {
            Authorization: `Basic ${credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });

    return response.status;
};
