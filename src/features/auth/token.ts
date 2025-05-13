export const setToken = (token: string) => {
    localStorage.setItem('auth_token', token);
};

export const getToken = (): string | null => {
    return localStorage.getItem('auth_token');
};

export const removeToken = () => {
    localStorage.removeItem('auth_token');
};
