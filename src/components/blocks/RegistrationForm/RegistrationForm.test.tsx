import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { RegistrationForm } from './RegistrationForm';
import userEvent from '@testing-library/user-event';

describe('<RegistrationForm/> component', () => {
    test('Render Registration Form component', () => {
        render(
            <MemoryRouter>
                <RegistrationForm />
            </MemoryRouter>
        );
        const registrationForm = screen.getByTestId('test-id-register-form');
        expect(registrationForm).toBeInTheDocument();
        expect(registrationForm).toMatchSnapshot();
    });

    test('Render Registration Form component - Email Validation', async () => {
        render(
            <MemoryRouter>
                <RegistrationForm />
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

    test('Render Registration Form component - Password Validation', async () => {
        render(
            <MemoryRouter>
                <RegistrationForm />
            </MemoryRouter>
        );
        const passwordField = screen.getByPlaceholderText(
            'Create your password'
        );
        await userEvent.type(passwordField, '12QWq!');

        const error = screen.getByTestId('error-input-password-test-id');
        expect(error).toBeInTheDocument();
        expect(error).toHaveTextContent(
            'Password must be at least 8 characters'
        );
    });

    test('Render Registration Form component - Password Validation', async () => {
        render(
            <MemoryRouter>
                <RegistrationForm />
            </MemoryRouter>
        );
        const passwordField = screen.getByPlaceholderText(
            'Create your password'
        );
        await userEvent.type(passwordField, '12QWq!');

        const error = screen.getByTestId('error-input-password-test-id');
        expect(error).toBeInTheDocument();
        expect(error).toHaveTextContent(
            'Password must be at least 8 characters'
        );
    });
    test('Render Registration Form component - Validation - empty form submit', async () => {
        render(
            <MemoryRouter>
                <RegistrationForm />
            </MemoryRouter>
        );
        const registrationForm = screen.getByTestId('test-id-register-form');

        const submitButton = screen.getByText('Sign Up');
        await userEvent.click(submitButton);

        expect(registrationForm).toMatchSnapshot();
    });
});
