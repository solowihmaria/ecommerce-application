export const generateAnonymousId = (): string => {
    return crypto.randomUUID();
};

const ANON_ID = 'anonymousId';

export const setAnonymousId = (value: string) => {
    localStorage.setItem(ANON_ID, value);
};

export const getAnonymousId = (): string | null => {
    return localStorage.getItem(ANON_ID);
};

export const removeAnonymousId = () => {
    localStorage.removeItem(ANON_ID);
};
