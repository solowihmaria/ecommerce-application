import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../../features/auth/token';

interface Props {
    children: React.ReactNode;
}

export const RedirectIfAuth: React.FC<Props> = ({ children }) => {
    const token = getToken();

    // Если токен есть (пользователь авторизован) — перекидываем сразу на /main
    if (token) {
        return <Navigate to="/main" replace />;
    }

    return <>{children}</>;
};
