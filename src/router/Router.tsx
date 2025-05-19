import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainPage } from '../pages/Main';
import { LoginPage } from '../pages/Login';
import { RegistrationPage } from '../pages/Registration';
import { NotFoundPage } from '../pages/NotFound';
import { RedirectIfAuth } from './guards/RedirectIfAuth';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage />,
    },
    {
        path: '/main', // на всякий случай добавила и такой переход
        element: <MainPage />,
    },
    {
        path: '/login',
        element: (
            <RedirectIfAuth>
                <LoginPage />
            </RedirectIfAuth>
        ),
    },
    {
        path: '/register',
        element: (
            <RedirectIfAuth>
                <RegistrationPage />
            </RedirectIfAuth>
        ),
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
]);

export const AppRouter: React.FC = () => <RouterProvider router={router} />;
