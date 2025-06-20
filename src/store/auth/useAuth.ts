import { useContext } from 'react';
import { AuthContext } from './AuthContext';

// Кастомный хук для доступа к контексту аутентификации.
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
