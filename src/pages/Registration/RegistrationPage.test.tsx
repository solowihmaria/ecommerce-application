import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RegistrationPage } from './RegistrationPage';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../Login/LoginPage';
import userEvent from '@testing-library/user-event';

describe('<RegistrationPage/> component', () => {
    test('Render RegistrationPage component', () => {
        render(
            <MemoryRouter>
                <RegistrationPage />
            </MemoryRouter>
        );
        const registrationPage = screen.getByTestId(
            'test-id-registration-page'
        );
        expect(registrationPage).toBeInTheDocument();
        expect(registrationPage).toMatchSnapshot();
    });
    test('Render RegistrationPage component - click sign in link', async () => {
        render(
            <MemoryRouter initialEntries={['/register']}>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegistrationPage />} />
                </Routes>
            </MemoryRouter>
        );
        const link = screen.getByTestId('sign-in-link');
        await userEvent.click(link);
        const loginPage = screen.getByTestId('test-id-login-page');
        expect(loginPage).toBeInTheDocument();
    });
});
