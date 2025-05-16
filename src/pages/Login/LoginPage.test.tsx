import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LoginPage } from './LoginPage';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { RegistrationPage } from '../Registration/RegistrationPage';

describe('<LoginPage/> component', () => {
    test('Render LoginPage component', () => {
        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );
        const loginPage = screen.getByTestId('test-id-login-page');
        expect(loginPage).toBeInTheDocument();
        expect(loginPage).toMatchSnapshot();
    });
    test('Render LoginPage component - click Sign Up Link', async () => {
        render(
            <MemoryRouter initialEntries={['/login']}>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegistrationPage />} />
                </Routes>
            </MemoryRouter>
        );
        const link = screen.getByTestId('sign-up-link');
        await userEvent.click(link);
        const registrationPage = screen.getByTestId(
            'test-id-registration-page'
        );
        expect(registrationPage).toBeInTheDocument();
    });
});
