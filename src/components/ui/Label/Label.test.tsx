import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Label } from './Label';
import type { LabelProps } from './Label.types';

describe('<Label/> component', () => {
    test('Render Label component without any properties', () => {
        render(<Label>label text</Label>);
        const label = screen.getByText(/label text/i);
        expect(label).toBeInTheDocument();
        expect(label).toMatchSnapshot();
    });

    test('Render Label component - optional field', () => {
        const properties: LabelProps = {
            htmlFor: 'someInput',
            children: 'LabelText',
            className: 'labelClass',
            required: false,
            disabled: false,
        };
        render(<Label {...properties} />);
        const label = screen.getByText(/labeltext/i);
        expect(label).toBeInTheDocument();
        expect(label).toHaveClass('labelClass');
        expect(label).toMatchSnapshot();
    });

    test('Render Label component - required field', () => {
        const properties: LabelProps = {
            htmlFor: 'someInput',
            children: 'LabelText',
            className: 'labelClass',
            required: true,
            disabled: false,
        };
        render(<Label {...properties} />);

        const label = screen.getByText(/labeltext/i);
        const requiredMark = screen.getByText(/\*/i);

        expect(label).toBeInTheDocument();
        expect(requiredMark).toBeInTheDocument();
        expect(label).toMatchSnapshot();
    });

    test('Render Label component - disabled', () => {
        const properties: LabelProps = {
            htmlFor: 'someInput',
            children: 'LabelText',
            className: 'labelClass',
            required: true,
            disabled: true,
        };
        render(<Label {...properties} />);
        const label = screen.getByText(/labeltext/i);
        expect(label).toBeInTheDocument();
        expect(label).toHaveClass('disabled');
        expect(label).toMatchSnapshot();
    });
});
