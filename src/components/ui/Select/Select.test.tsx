import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Select } from './Select';

describe('<Select/> component', () => {
    test('Render Select component', () => {
        render(<Select name="selectTest" />);
        const select = screen.getByTestId('test-id-select-field');
        expect(select).toBeInTheDocument();
        expect(select).toMatchSnapshot();
    });
});
