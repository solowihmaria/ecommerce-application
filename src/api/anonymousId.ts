import { ANON_ID_KEY } from '../utilities/constants/constants';

export const setAnonymousId = (value: string) => {
    localStorage.setItem(ANON_ID_KEY, value);
};

export const getAnonymousId = (): string | null => {
    return localStorage.getItem(ANON_ID_KEY);
};

export const removeAnonymousId = () => {
    localStorage.removeItem(ANON_ID_KEY);
};

export const generateAnonymousId = (): string => {
    return crypto.randomUUID();
};
