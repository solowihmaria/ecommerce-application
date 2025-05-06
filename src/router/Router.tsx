import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from '../pages/Main';
import LoginPage from '../pages/Login';
import RegistrationPage from '../pages/Registration';
import NotFoundPage from '../pages/NotFound';
import React from 'react';

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
        element: <LoginPage />,
    },
    {
        path: '/register',
        element: <RegistrationPage />,
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
]);

export const AppRouter: React.FC = () => <RouterProvider router={router} />;
