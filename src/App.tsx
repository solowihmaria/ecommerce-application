import { AppRouter } from './router/Router';
import React, { useState } from 'react';
import './assets/styles/main.module.scss';
import { createContext } from 'react';
import { getToken } from './api/token';
import { ToastProvider } from './components/ui/Toast/ToastContext';

export const LoginContext = createContext<{
    loginStatus: boolean;
    setLoginStatus: React.Dispatch<React.SetStateAction<boolean>>;
}>({ loginStatus: false, setLoginStatus: () => {} });

export const App = () => {
    const initialStatus = getToken() ? true : false;
    console.log('Environment:', {
        CTP_AUTH_URL: process.env.CTP_AUTH_URL,
        CTP_PROJECT_KEY: process.env.CTP_PROJECT_KEY,
    });
    const [loginStatus, setLoginStatus] = useState(initialStatus);
    return (
        <ToastProvider>
            <LoginContext.Provider value={{ loginStatus, setLoginStatus }}>
                <AppRouter />
            </LoginContext.Provider>
        </ToastProvider>
    );
};
