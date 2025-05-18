import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LoginForm } from './LoginForm';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { LoginPage } from '../../../pages/Login/LoginPage';
import { RegistrationPage } from '../../../pages/Registration/RegistrationPage';

describe('<LoginForm/> component', () => {
    test('Render LoginForm component', () => {
        render(
            <MemoryRouter>
                <LoginForm />
            </MemoryRouter>
        );
        const Login = screen.getByTestId('test-id-login-form');
        expect(Login).toBeInTheDocument();
        expect(Login).toMatchSnapshot();
    });
    test('Render LoginForm component - click Sign Up Link', async () => {
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
    test('Render LoginForm component - Email error message - invalid format(no @ and domain)', async () => {
        render(
            <MemoryRouter initialEntries={['/login']}>
                <LoginForm />
            </MemoryRouter>
        );
        const emailField = screen.getByPlaceholderText('Enter your email');
        await userEvent.type(emailField, 'someEmail');

        const error = screen.getByTestId('error-input-test-id');
        expect(error).toBeInTheDocument();
        expect(error).toHaveTextContent(
            'Email must be in format: user@example.com (no spaces allowed)'
        );
    });
    test('Render LoginForm component - Email error message - no dot before domain', async () => {
        render(
            <MemoryRouter initialEntries={['/login']}>
                <LoginForm />
            </MemoryRouter>
        );
        const emailField = screen.getByPlaceholderText('Enter your email');
        await userEvent.type(emailField, ' someEmail@com');

        const error = screen.getByTestId('error-input-test-id');
        expect(error).toBeInTheDocument();
        expect(error).toHaveTextContent(
            'Email must be in format: user@example.com (no spaces allowed)'
        );
    });
    test('Render LoginForm component - Email error message - empty field', async () => {
        render(
            <MemoryRouter initialEntries={['/login']}>
                <LoginForm />
            </MemoryRouter>
        );

        const password = screen.getByPlaceholderText('Enter your password');
        await userEvent.type(password, 'mypassword123!!AA');
        const submitButton = screen.getByText('Log In');
        await userEvent.click(submitButton);
        const error = screen.getByTestId('error-input-test-id');
        expect(error).toBeInTheDocument();
        expect(error).toHaveTextContent('Email is required');
    });
    test('Render LoginForm component - Password error message - invalid password format (no numbers)', async () => {
        render(
            <MemoryRouter initialEntries={['/login']}>
                <LoginForm />
            </MemoryRouter>
        );
        const passwordField = screen.getByPlaceholderText(
            'Enter your password'
        );
        await userEvent.type(passwordField, 'qweqweqweqwe!QQ');

        const error = screen.getByTestId('error-input-password-test-id');
        expect(error).toBeInTheDocument();
        expect(error).toHaveTextContent(
            'Password must contain at least one digit (0-9)'
        );
    });
    test('Render LoginForm component - Password error message - invalid password format (password less than 8 characters)', async () => {
        render(
            <MemoryRouter initialEntries={['/login']}>
                <LoginForm />
            </MemoryRouter>
        );
        const passwordField = screen.getByPlaceholderText(
            'Enter your password'
        );
        await userEvent.type(passwordField, '12asd!Q');

        const error = screen.getByTestId('error-input-password-test-id');
        expect(error).toBeInTheDocument();
        expect(error).toHaveTextContent(
            'Password must be at least 8 characters'
        );
    });
    test('Render LoginForm component - Password error message - invalid password format (no lowercase letters)', async () => {
        render(
            <MemoryRouter initialEntries={['/login']}>
                <LoginForm />
            </MemoryRouter>
        );

        const password = screen.getByPlaceholderText('Enter your password');
        await userEvent.type(password, '123123!!AQA');

        const error = screen.getByTestId('error-input-password-test-id');
        expect(error).toBeInTheDocument();
        expect(error).toHaveTextContent(
            'Password must contain at least one lowercase letter (a-z)'
        );
    });
    test('Render LoginForm component - Password error message - invalid password format (no uppercase letters)', async () => {
        render(
            <MemoryRouter initialEntries={['/login']}>
                <LoginForm />
            </MemoryRouter>
        );

        const password = screen.getByPlaceholderText('Enter your password');
        await userEvent.type(password, '123123!!aqa');

        const error = screen.getByTestId('error-input-password-test-id');
        expect(error).toBeInTheDocument();
        expect(error).toHaveTextContent(
            'Password must contain at least one uppercase letter (A-Z)'
        );
    });
    test('Render LoginForm component - Password error message - empty password', async () => {
        render(
            <MemoryRouter initialEntries={['/login']}>
                <LoginForm />
            </MemoryRouter>
        );

        const email = screen.getByPlaceholderText('Enter your email');
        await userEvent.type(email, 'testEmail@gmail.com');
        const submitButton = screen.getByText('Log In');
        await userEvent.click(submitButton);
        const error = screen.getByTestId('error-input-password-test-id');
        expect(error).toBeInTheDocument();
        expect(error).toHaveTextContent('Password is required');
    });
});
