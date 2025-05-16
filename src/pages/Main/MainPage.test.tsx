import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MainPage } from './MainPage';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

describe('<MainPage/> component', () => {
    test('Render MainPage component', () => {
        render(
            <MemoryRouter>
                <MainPage />
            </MemoryRouter>
        );
        const mainPage = screen.getByTestId('main-page-test-id');
        expect(mainPage).toBeInTheDocument();
        expect(mainPage).toMatchSnapshot();
    });
});
