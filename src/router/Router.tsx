import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainPage } from '../pages/Main';
import { LoginPage } from '../pages/Login';
import { RegistrationPage } from '../pages/Registration';
import { NotFoundPage } from '../pages/NotFound';
import { RedirectIfAuth } from './guards/RedirectIfAuth';
import { CatalogPage } from '../pages/Catalog';
import { ProductPage } from '../pages/Product';
import { ProfilePage } from '../pages/Profile';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage />,
    },
    {
        path: '/main',
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
        path: '/catalog',
        element: <CatalogPage />,
    },
    {
        path: '/product/', // вроде должно стать: /product/:id', когда уже реализуем странички товаров
        element: <ProductPage />,
    },
    {
        path: '/profile',
        element: <ProfilePage />, //ДОБАВИТЬ ПРОХОД ТОЛЬКО ПОСЛЕ ЛОГИНА
    },

    {
        path: '*',
        element: <NotFoundPage />,
    },
]);

export const AppRouter: React.FC = () => <RouterProvider router={router} />;
