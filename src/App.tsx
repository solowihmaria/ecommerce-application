import { AppRouter } from './router/Router';
import './assets/styles/main.module.scss';
import { ToastProvider } from './components/ui/Toast/ToastContext';
import { AuthProvider } from './store/auth/AuthProvider';

export const App = () => {
    return (
        <ToastProvider>
            <AuthProvider>
                <AppRouter />
            </AuthProvider>
        </ToastProvider>
    );
};
