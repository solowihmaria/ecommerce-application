import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
/*import { getToken } from '../../features/auth/token';*/
import { LoginContext } from '../../App';

interface Props {
    children: React.ReactNode;
}

export const RedirectIfAuth = ({ children }: Props) => {
    const { loginStatus } = useContext(LoginContext);
    if (loginStatus) {
        return <Navigate to="/main" replace />;
    }

    /*const token = getToken();

    if (token) {
        return <Navigate to="/main" replace />;
    }*/

    return <>{children}</>;
};
