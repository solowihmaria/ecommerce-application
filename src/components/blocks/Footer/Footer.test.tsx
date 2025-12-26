import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Footer } from './Footer';
import { MemoryRouter } from 'react-router-dom';

describe('<Footer/> component', () => {
    test('Render Footer component', () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        );

        const footer = screen.getByTestId('footer');
        expect(footer).toBeInTheDocument();

        expect(screen.getByText('Quick Links')).toBeInTheDocument();
        expect(screen.getByText('Categories')).toBeInTheDocument();
        expect(screen.getByText('Contact')).toBeInTheDocument();
        expect(screen.getByText(/© \d{4} Evergreen/)).toBeInTheDocument();

        expect(footer).toMatchSnapshot();
    });

    test('Contains correct number of links', () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        );

        const quickLinks = screen.getAllByTestId('quick-link');
        expect(quickLinks).toHaveLength(5);

        const categoryLinks = screen.getAllByTestId('category-link');
        expect(categoryLinks).toHaveLength(5);
    });
});
