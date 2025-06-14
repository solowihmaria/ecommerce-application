import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { MainPage } from '../pages/Main';
import { LoginPage } from '../pages/Login';
import { RegistrationPage } from '../pages/Registration';
import { NotFoundPage } from '../pages/NotFound';
import { RedirectIfAuth } from './guards/RedirectIfAuth';
import { CatalogPage } from '../pages/Catalog';
import { ProductPage } from '../pages/Product';
import { ProfilePage } from '../pages/Profile';
import { RequireAuth } from './guards/RequireAuth';

import { CartPage } from '../pages/Cart/CartPage';

import { Layout } from '../components/blocks/Layout/Layout';

const router = createBrowserRouter([
    {
        element: (
            <Layout>
                <Outlet />{' '}
            </Layout>
        ),
        children: [
            {
                path: '/main',
                element: <MainPage />,
            },
            {
                path: '/',
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
                path: '/catalog/:slug?',
                element: <CatalogPage />,
            },
            {
                path: '/catalog/:categorySlug/:subcategorySlug',
                element: <CatalogPage />,
            },
            {
                path: '/product/:id',
                element: <ProductPage />,
            },
            {
                path: '/profile',
                element: (
                    <RequireAuth>
                        <ProfilePage />
                    </RequireAuth>
                ),
            },
            {
                path: '/cart',
                element: <CartPage />,
            },
        ],
    },

    {
        path: '*',
        element: <NotFoundPage />,
    },
]);

export const AppRouter: React.FC = () => <RouterProvider router={router} />;
