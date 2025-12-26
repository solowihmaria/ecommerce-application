import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Heading } from './Heading';
import type { HeadingProps } from './Heading.types';

describe('<Heading/> component', () => {
    test('Render Heading component without any properties', () => {
        render(<Heading>heading text</Heading>);
        const heading = screen.getByText(/heading text/i);
        expect(heading).toBeInTheDocument();
        expect(heading).toMatchSnapshot();
    });

    test('Render Heading component with properties', () => {
        const properties: HeadingProps = {
            level: 'h2',
            className: 'classExample',
            children: 'HEADING2',
        };
        render(<Heading {...properties} />);
        const heading = screen.getByText(/heading2/i);
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveClass('classExample');
        expect(heading).toMatchSnapshot();
    });
});
