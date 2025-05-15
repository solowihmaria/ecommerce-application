import { login as loginRequest } from './login';
import { setToken } from '../../features/auth/token';
import type { LoginResponse } from './auth.types';

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

/**
 * тут же думаю можно и логаут сделать и если что и рефреш сюда же
 * export const logoutUser
 */
