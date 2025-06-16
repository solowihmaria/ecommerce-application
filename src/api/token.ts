import {
    AUTH_TOKEN_KEY,
    ANON_TOKEN_KEY,
} from '../utilities/constants/constants';

export const setToken = (token: string) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const getToken = (): string | null => {
    return localStorage.getItem(AUTH_TOKEN_KEY);
};

export const removeToken = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
};

export const setAnonToken = (token: string) => {
    localStorage.setItem(ANON_TOKEN_KEY, token);
};

export const getAnonToken = (): string | null => {
    return localStorage.getItem(ANON_TOKEN_KEY);
};

export const removeAnonToken = () => {
    localStorage.removeItem(ANON_TOKEN_KEY);
};
