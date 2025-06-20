import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from './Button';
import type { ButtonProps } from './Button.types';

describe('<Button/> component', () => {
    test('Render Button component - without any properties', () => {
        render(<Button>button name</Button>);
        const button = screen.getByRole('button');

        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('button');
        expect(button).toHaveClass('primary');
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
        const button = screen.getByRole('button');

        expect(button).toHaveClass('testClass');
        expect(button).toHaveClass('secondary');
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
        const button = screen.getByRole('button');

        expect(button).toBeInTheDocument();
        expect(button).toBeDisabled();
        expect(button).toMatchSnapshot();
    });

    test('Render Button component - check that handler is triggered on click', () => {
        const onClick = jest.fn();

        render(<Button onClick={onClick}>button name</Button>);

        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
