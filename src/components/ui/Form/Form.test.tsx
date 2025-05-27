import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Form } from './Form';

describe('<Form/> component', () => {
    test('Render Form component without any properties', () => {
        const TestComponent = () => {
            return (
                <>
                    <input placeholder="input1"></input>
                    <input placeholder="input2"></input>
                </>
            );
        };

        render(
            <Form>
                <TestComponent />
            </Form>
        );
        const form = screen.getByTestId('form-test-id');
        expect(form).toBeInTheDocument();
        expect(form).toMatchSnapshot();
    });
});
