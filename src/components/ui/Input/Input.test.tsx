import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Input } from './Input';

describe('<Input/> component', () => {
    test('Render Input component - without any properties', () => {
        render(<Input />);
        const inputElement = screen.getByTestId('test-id-input-field');
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toMatchSnapshot();
    });

    test('Render Input component - disabled input', () => {
        render(<Input placeholder="input test" disabled={true} />);
        const input = screen.getByPlaceholderText(/input test/i);
        expect(input).toBeInTheDocument();
        expect(input).toBeDisabled();
        expect(input).toMatchSnapshot();
    });

    test('Render Input component - function is called onChange', () => {
        const onChange = jest.fn();
        render(<Input placeholder="input test" onChange={onChange} />);
        const input = screen.getByPlaceholderText(/input test/i);
        fireEvent.change(input, { target: { value: 'Some text' } });
        expect(input).toBeInTheDocument();
        expect(onChange).toHaveBeenCalledTimes(1);
    });

    test('Render Input component - check error message', () => {
        const testErrorMessage = 'input error message';
        render(
            <Input
                placeholder="input test"
                error={true}
                errorMessage={testErrorMessage}
            />
        );
        const inputElement = screen.getByTestId('test-id-input-field');
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toMatchSnapshot();
        const errorElement = screen.getByText(testErrorMessage);
        expect(errorElement).toBeInTheDocument();
    });

    test('Render Input component - function is called onBlur', () => {
        const onBlur = jest.fn();
        render(<Input placeholder="input test" onBlur={onBlur} />);
        const input = screen.getByPlaceholderText(/input test/i);
        fireEvent.blur(input);
        expect(input).toBeInTheDocument();
        expect(onBlur).toHaveBeenCalledTimes(1);
    });
});
