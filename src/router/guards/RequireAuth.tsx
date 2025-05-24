import { Navigate } from 'react-router-dom';
import { useAuth } from '../../store/auth/useAuth';

interface Props {
    children: React.ReactNode;
}

export const RequireAuth = ({ children }: Props) => {
    const { loginStatus } = useAuth();

    if (!loginStatus) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};
