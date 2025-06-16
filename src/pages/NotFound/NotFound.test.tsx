import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NotFoundPage } from './NotFound';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { MainPage } from '../Main/MainPage';

describe('<NotFoundPage/> component', () => {
    test('renders NotFoundPage component', () => {
        render(
            <MemoryRouter>
                <NotFoundPage />
            </MemoryRouter>
        );

        const notFoundContainer = screen.getByTestId('not-found-container');
        expect(notFoundContainer).toBeInTheDocument();
        expect(notFoundContainer).toMatchSnapshot();
    });

    test('navigates to main page when "Back to Main" button is clicked', async () => {
        render(
            <MemoryRouter initialEntries={['/some-nonexistent-page']}>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </MemoryRouter>
        );

        const button = screen.getByRole('button', { name: /back to main/i });
        await userEvent.click(button);

        const mainPage = screen.getByTestId('main-page-test-id');
        expect(mainPage).toBeInTheDocument();
    });
});
