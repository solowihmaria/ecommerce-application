import '@testing-library/jest-dom';

import { ErrorCart } from './ErrorCart';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

describe('<ErrorCart/> component', () => {
    test('Render ErrorCart', () => {
        const message = 'Test error';
        render(
            <MemoryRouter>
                <ErrorCart message={message} />
            </MemoryRouter>
        );

        const errorCartContainer = screen.getByTestId('error-cart-test-id');
        expect(errorCartContainer).toBeInTheDocument();
        expect(errorCartContainer).toMatchSnapshot();
    });
});
