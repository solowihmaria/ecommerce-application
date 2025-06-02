import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProfilePage } from './ProfilePage';
import { MemoryRouter } from 'react-router-dom';

describe('<ProfilePage/> component', () => {
    test('renders ProfilePage component', () => {
        render(
            <MemoryRouter>
                <ProfilePage />
            </MemoryRouter>
        );

        const profileMain = screen.getByRole('main');
        expect(profileMain).toBeInTheDocument();
        expect(profileMain).toMatchSnapshot();
    });
});
