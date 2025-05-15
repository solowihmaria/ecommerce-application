import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../../features/auth/token';

interface Props {
    children: React.ReactNode;
}

export const RedirectIfAuth = ({ children }: Props) => {
    const token = getToken();

    if (token) {
        return <Navigate to="/main" replace />;
    }

    return <>{children}</>;
};
