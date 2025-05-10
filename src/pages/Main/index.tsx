import React from 'react';
import { Link } from 'react-router-dom';

export const MainPage = (): React.JSX.Element => (
    <div>
        <h1>Главная</h1>
        <nav>
            <Link to="/login">Вход</Link> |{' '}
            <Link to="/register">Регистрация</Link>
        </nav>
    </div>
);
