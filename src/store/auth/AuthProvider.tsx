import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { getToken, setAnonToken } from '../../api/token';
import { fetchMyProfile } from '../../api/profile/profile';
import type { Customer } from '../../api/profile/profile.types';
import type { CartResponse, CustomCart } from '../../api/cart/cart.types';
import {
    generateAnonymousId,
    getAnonymousId,
    setAnonymousId,
} from '../../api/anonymousId';
import { createCart, getCart } from '../../api/cart/cart';
import { prepareCartData } from '../../api/cart/helpers';
import { AxiosError } from 'axios';
import { getAnonymousToken } from '../../api/auth/getToken';

/**
 * Провайдер аутентификации.
 * Обеспечивает:
 * - Управление состоянием авторизации
 * - Загрузку профиля при наличии токена
 * - Обновление данных пользователя
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [loginStatus, setLoginStatus] = useState(!!getToken());
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [cartContent, setCartContent] = useState<null | CustomCart>(null);
    const [isCartLoading, setIsCartLoading] = useState(false);

    useEffect(() => {
        const initSession = async () => {
            const token = getToken();

            if (token && !customer) {
                try {
                    const profile = await fetchMyProfile(token);
                    setCustomer(profile);
                } catch (error) {
                    console.error('Failed to load profile', error);
                }
            } else {
                await initAnonymousSession();
            }
        };

        const loadCart = async () => {
            let cartData: CartResponse;

            try {
                setIsCartLoading(true);
                const cartData = await getCart(loginStatus);
                if (cartData) {
                    setCartContent(prepareCartData(cartData));
                }
            } catch (error) {
                if (error instanceof AxiosError && error.status === 404) {
                    try {
                        cartData = await createCart(loginStatus);
                        console.log('CARTDATA', cartData);
                    } catch (error) {
                        console.log('CREATE CART ERR', error);
                    }
                }
            } finally {
                setIsCartLoading(false);
            }
        };

        void initSession();
        void loadCart();
    }, [loginStatus, customer]);

    const initAnonymousSession = async () => {
        if (!getAnonymousId()) {
            const id = generateAnonymousId();
            setAnonymousId(id);
            setIsAnonymous(true);

            const token = await getAnonymousToken(id);

            if (token) {
                setAnonToken(token.access_token);
            }
        }
    };

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
                isAnonymous,
                cartContent,
                setCartContent,
                isCartLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
