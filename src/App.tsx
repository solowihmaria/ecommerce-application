import { AppRouter } from './router/Router';
import React, { useState } from 'react';
import './assets/styles/main.module.scss';
import { createContext } from 'react';
import { getToken } from './api/token';

export const LoginContext = createContext<{
    loginStatus: boolean;
    setLoginStatus: React.Dispatch<React.SetStateAction<boolean>>;
}>({ loginStatus: false, setLoginStatus: () => {} });

export const App = () => {
    const initialStatus = getToken() ? true : false;
    const [loginStatus, setLoginStatus] = useState(initialStatus);
    return (
        <LoginContext.Provider value={{ loginStatus, setLoginStatus }}>
            <AppRouter />
        </LoginContext.Provider>
    );
};
