import { login as loginRequest } from './login';
import { getToken, removeToken, setToken } from '../token';
import type { LoginResponse } from './auth.types';
import { logout } from './login';

export const authenticateUser = async (
    email: string,
    password: string,
    onSuccess?: () => void
): Promise<LoginResponse> => {
    const response = await loginRequest(email, password);
    setToken(response.access_token);

    if (typeof onSuccess === 'function') {
        onSuccess();
    }

    return response;
};

export const logoutUser = async () => {
    const token = getToken();

    if (!token) return;

    await logout(token);
    removeToken();
};
