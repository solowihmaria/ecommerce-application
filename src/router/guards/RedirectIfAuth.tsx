import { Navigate } from 'react-router-dom';
import { useAuth } from '../../store/auth/useAuth';

interface Props {
    children: React.ReactNode;
}

export const RedirectIfAuth = ({ children }: Props) => {
    const { loginStatus } = useAuth();

    if (loginStatus) {
        return <Navigate to="/main" replace />;
    }

    return <>{children}</>;
};
