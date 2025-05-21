import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { LoginContext } from '../../App';

interface Props {
    children: React.ReactNode;
}

export const RequireAuth = ({ children }: Props) => {
    const { loginStatus } = useContext(LoginContext);

    if (!loginStatus) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};
