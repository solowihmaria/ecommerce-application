import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { getToken } from '../../api/token';
import { fetchMyProfile } from '../../api/profile/profile';
import type { Customer } from '../../api/profile/profile.types';

/**
 * Провайдер аутентификации.
 * Обеспечивает:
 * - Управление состоянием авторизации
 * - Загрузку профиля при наличии токена
 * - Обновление данных пользователя
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [loginStatus, setLoginStatus] = useState(!!getToken());
    const [customer, setCustomer] = useState<Customer | null>(null);

    useEffect(() => {
        const loadProfile = async () => {
            const token = getToken();

            if (token && !customer) {
                try {
                    const profile = await fetchMyProfile(token);
                    setCustomer(profile);
                } catch (error) {
                    console.error('Failed to load profile', error);
                }
            }
        };

        void loadProfile();
    }, [loginStatus, customer]);

    const updateCustomer = (newData: Partial<Customer>) => {
        if (customer) {
            setCustomer({ ...customer, ...newData });
        }
    };

    return (
        <AuthContext.Provider
            value={{
                loginStatus,
                setLoginStatus,
                customer,
                setCustomer,
                updateCustomer,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
