import { login as loginRequest, mergeCartsOnLogin } from './login';
import { getToken, removeToken, setToken } from '../token';
import { logout } from './login';
import { fetchMyProfile } from '../profile/profile';
import type { Customer } from '../profile/profile.types';
import { removeAnonymousId } from '../anonymousId';
import {
    AUTH_TOKEN_KEY,
    ANON_TOKEN_KEY,
} from '../../utilities/constants/constants';

export const authenticateUser = async (
    email: string,
    password: string,
    onSuccess?: (customer: Customer) => void
): Promise<{ token: string; customer: Customer }> => {
    try {
        await mergeCartsOnLogin(email, password);
    } catch (error) {
        console.log(error);
    }
    const response = await loginRequest(email, password);

    if (!response?.access_token) {
        throw new Error('Invalid response structure');
    }
    setToken(response.access_token, AUTH_TOKEN_KEY);
    removeToken(ANON_TOKEN_KEY);
    removeAnonymousId();

    // Получаем данные профиля
    const customer = await fetchMyProfile(response.access_token);
    onSuccess?.(customer);

    return { token: response.access_token, customer };
};

export const logoutUser = async (): Promise<void> => {
    try {
        const token = getToken(AUTH_TOKEN_KEY);
        if (!token) {
            return;
        }

        await logout(token);
        removeToken(AUTH_TOKEN_KEY);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Logout failed:', error.message);
        }
    }
};
