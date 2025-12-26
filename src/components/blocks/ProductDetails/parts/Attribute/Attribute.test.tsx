import { render, screen } from '@testing-library/react';
import { Attribute } from './Attribute';
import '@testing-library/jest-dom';

const imageUrl = 'https://placehold.co/600x400/EEE/31343C';

describe('<Attribute/> component', () => {
    test('Render Attribute component', () => {
        render(
            <Attribute
                component={<img src={imageUrl} alt="height"></img>}
                name="Height"
                value={30}
            />
        );

        const attribute = screen.getByTestId('attribute');

        expect(attribute).toBeInTheDocument();
        expect(attribute).toMatchSnapshot();
    });
});
