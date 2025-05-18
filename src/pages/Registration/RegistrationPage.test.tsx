import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RegistrationPage } from './RegistrationPage';
import { MemoryRouter } from 'react-router-dom';

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
});
