import '@testing-library/jest-dom';

import { EmptyCart } from './EmptyCart';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

describe('<ErrorCart/> component', () => {
    test('Render ErrorCart', () => {
        render(
            <MemoryRouter>
                <EmptyCart />
            </MemoryRouter>
        );

        const emptyCartContainer = screen.getByTestId('empty-cart-test-id');
        expect(emptyCartContainer).toBeInTheDocument();
        expect(emptyCartContainer).toMatchSnapshot();
    });
});
