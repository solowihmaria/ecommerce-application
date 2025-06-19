import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { getToken } from '../../api/token';
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
import { CartErrorMessages } from '../../components/blocks/Cart/lib/constants';

/**
 * Провайдер аутентификации.
 * Обеспечивает:
 * - Управление состоянием авторизации
 * - Загрузку профиля при наличии токена
 * - Обновление данных пользователя
 * - Получает или создает корзину
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [loginStatus, setLoginStatus] = useState(!!getToken());
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [cartContent, setCartContent] = useState<null | CustomCart>(null);
    const [isCartLoading, setIsCartLoading] = useState(true);
    const [cartError, setCartError] = useState<null | string>(null);
    const [cartItemsCount, setCartItemsCount] = useState(0);

    useEffect(() => {
        const initSession = async () => {
            const token = getToken();

            if (token && !customer) {
                try {
                    const profile = await fetchMyProfile(token);
                    setCustomer(profile);
                } catch {
                    //console.error('Failed to load profile', error);
                }
            } else if (!token) {
                initAnonymousSession();
            }
        };

        const loadCart = async () => {
            let cartData: CartResponse;

            try {
                const cartData = await getCart(loginStatus);
                if (cartData) {
                    setCartContent(prepareCartData(cartData));
                }
            } catch (error) {
                if (error instanceof AxiosError && error.status === 404) {
                    try {
                        cartData = await createCart(loginStatus);
                        if (cartData) {
                            setCartContent(prepareCartData(cartData));
                        }
                        // console.log('CARTDATA', cartData);
                    } catch (error) {
                        //console.error(error);
                        handleCartError(error);
                    }
                } else {
                    handleCartError(error);
                }
            }
        };

        void initSession();

        loadCart()
            .then(() => setIsCartLoading(false))
            .catch((err) => {
                //console.error(err);
                handleCartError(err);
            });
    }, [loginStatus, customer]);

    const initAnonymousSession = () => {
        if (!getAnonymousId()) {
            const id = generateAnonymousId();
            setAnonymousId(id);
            setIsAnonymous(true);
        }
    };

    const updateCustomer = (newData: Partial<Customer>) => {
        if (customer) {
            setCustomer({ ...customer, ...newData });
        }
    };

    useEffect(() => {
        if (cartContent) {
            setCartItemsCount(cartContent.totalLineItemQuantity || 0);
        } else {
            setCartItemsCount(0);
        }
    }, [cartContent]);

    const handleCartError = (error: unknown) => {
        if (error instanceof AxiosError) {
            if (error.response) {
                setCartError(CartErrorMessages.GENERIC_ERROR_MESSAGE);
            } else if (error.request) {
                setCartError(CartErrorMessages.NETWORK_ERROR_MESSAGE);
            } else {
                setCartError(CartErrorMessages.GENERIC_ERROR_MESSAGE);
            }
        } else {
            setCartError(CartErrorMessages.GENERIC_ERROR_MESSAGE);
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
                cartItemsCount,
                cartError,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
