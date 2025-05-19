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

    if (response?.access_token) {
        setToken(response.access_token);
        onSuccess?.();
        return response;
    }

    throw new Error('Invalid response structure');
};

export const logoutUser = async (): Promise<void> => {
    try {
        const token = getToken();
        if (!token) {
            return;
        }

        await logout(token);
        removeToken();
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Logout failed:', error.message);
        }
    }
};
