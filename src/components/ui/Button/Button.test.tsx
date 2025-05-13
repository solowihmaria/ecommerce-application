import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from './Button';
import React from 'react';
import type { ButtonProps } from './Button.types';

describe('<Button/> component', () => {
    test('Render Button component without any properties', () => {
        render(<Button>button name</Button>);
        const button = screen.getByText(/button name/i);
        expect(button).toBeInTheDocument();
        expect(button).toMatchSnapshot();
    });
    test('Render Button component with properties', () => {
        const properties: ButtonProps = {
            type: 'button',
            className: 'testClass',
            onClick: () => {},
            disabled: false,
            variant: 'secondary',
            children: 'button name',
        };
        render(<Button {...properties} />);
        const button = screen.getByText(/button name/i);
        expect(button).toBeInTheDocument();
        expect(button).toMatchSnapshot();
    });
    test('Render Button component - disabled', () => {
        const properties: ButtonProps = {
            type: 'button',
            className: 'testClass',
            onClick: () => {},
            disabled: true,
            variant: 'secondary',
            children: 'button name',
        };
        render(<Button {...properties} />);
        const button = screen.getByText(/button name/i);
        expect(button).toBeInTheDocument();
        expect(button).toMatchSnapshot();
    });
});
