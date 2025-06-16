import { createContext } from 'react';
import type { Customer } from '../../api/profile/profile.types';
import type { CustomCart } from '../../api/cart/cart.types';

export interface AuthContextType {
    loginStatus: boolean;
    setLoginStatus: (status: boolean) => void;
    customer: Customer | null;
    setCustomer: (customer: Customer | null) => void;
    updateCustomer: (newData: Partial<Customer>) => void;
    isAnonymous: boolean;
    cartContent: CustomCart | null;
    setCartContent: React.Dispatch<React.SetStateAction<CustomCart | null>>;
    isCartLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
    loginStatus: false,
    setLoginStatus: () => {},
    customer: null,
    setCustomer: () => {},
    updateCustomer: () => {},
    isAnonymous: false,
    cartContent: null,
    setCartContent: () => {},
    isCartLoading: false,
});
