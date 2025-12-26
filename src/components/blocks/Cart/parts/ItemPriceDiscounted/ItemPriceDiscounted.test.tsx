import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';

import { ItemPriceDiscounted } from './ItemPriceDiscounted';

describe('<ItemPriceDiscounted/> component', () => {
    test('Render ItemPriceDiscounted', () => {
        const oldPriceValue = 12;
        const newPriceValue = 9;
        render(
            <ItemPriceDiscounted
                oldPrice={oldPriceValue}
                newPrice={newPriceValue}
            />
        );

        const oldPriceElement = screen.getByTestId('total-attribute-old');
        const newPriceElement = screen.getByTestId('total-attribute-new');

        expect(oldPriceElement).toBeInTheDocument();
        expect(newPriceElement).toBeInTheDocument();
        expect(oldPriceElement).toHaveTextContent(
            oldPriceValue.toFixed(2).toString()
        );
        expect(newPriceElement).toHaveTextContent(
            newPriceValue.toFixed(2).toString()
        );
    });
});
