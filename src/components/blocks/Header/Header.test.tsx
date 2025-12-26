import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './Header';

test('Render Header component', () => {
    render(
        <MemoryRouter>
            <Header />
        </MemoryRouter>
    );
    const header = screen.getByTestId('test-id-header');
    expect(header).toBeInTheDocument();
    expect(header).toMatchSnapshot();
});
