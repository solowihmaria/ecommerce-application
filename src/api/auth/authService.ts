import { login as loginRequest } from './login';
import { getToken, removeToken, setToken } from '../token';
import type { LoginResponse } from './auth.types';
import { logout } from './login';

export const authenticateUser = async (
    email: string,
    password: string,
    onSuccess?: () => void
): Promise<LoginResponse> => {
    try {
        const response = await loginRequest(email, password);

        if (response?.access_token) {
            setToken(response.access_token);
        } else {
            throw new Error('Invalid response structure');
        }

        onSuccess?.();
        return response;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new TypeError(`Authentication failed: ${error.message}`);
        }
        throw new Error('Unknown authentication error');
    }
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
