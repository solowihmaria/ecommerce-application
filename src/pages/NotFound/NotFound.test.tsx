import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NotFoundPage } from './NotFound';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { MainPage } from '../Main';

describe('<NotFoundPage/> component', () => {
    test('Render NotFoundPage component', () => {
        render(
            <MemoryRouter>
                <NotFoundPage />
            </MemoryRouter>
        );
        const notFoundPage = screen.getByTestId('test-id-not-found-page');
        expect(notFoundPage).toBeInTheDocument();
        expect(notFoundPage).toMatchSnapshot();
    });
    test('Render NotFoundPage component - click Go Home Button', async () => {
        render(
            <MemoryRouter initialEntries={['/test']}>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/test" element={<NotFoundPage />} />
                </Routes>
            </MemoryRouter>
        );
        const button = screen.getByRole('button', { name: /go to homepage/i });
        await userEvent.click(button);
        const mainPage = screen.getByTestId('main-page-test-id');
        expect(mainPage).toBeInTheDocument();
    });
});
