import { createContext } from 'react';
import type { Customer } from '../../api/profile/profile.types';

export interface AuthContextType {
    loginStatus: boolean;
    setLoginStatus: (status: boolean) => void;
    customer: Customer | null;
    setCustomer: (customer: Customer | null) => void;
    updateCustomer: (newData: Partial<Customer>) => void;
}

export const AuthContext = createContext<AuthContextType>({
    loginStatus: false,
    setLoginStatus: () => {},
    customer: null,
    setCustomer: () => {},
    updateCustomer: () => {},
});
