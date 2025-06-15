import { login as loginRequest } from './login';
import { getToken, removeAnonToken, removeToken, setToken } from '../token';
import { logout } from './login';
import { fetchMyProfile } from '../profile/profile';
import type { Customer } from '../profile/profile.types';
import { removeAnonymousId } from '../anonymousId';

export const authenticateUser = async (
    email: string,
    password: string,
    onSuccess?: (customer: Customer) => void
): Promise<{ token: string; customer: Customer }> => {
    const response = await loginRequest(email, password);

    if (!response?.access_token) {
        throw new Error('Invalid response structure');
    }
    setToken(response.access_token);
    removeAnonToken();
    removeAnonymousId();

    // Получаем данные профиля
    const customer = await fetchMyProfile(response.access_token);
    onSuccess?.(customer);

    return { token: response.access_token, customer };
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
