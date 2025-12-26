import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ConfirmModal } from './ConfirmModal';
import type { ConfirmModalProps } from './ConfirmModal.types';

describe('<ConfirmModal/> component', () => {
    const defaultProps: ConfirmModalProps = {
        isOpen: true,
        title: 'Delete Item',
        message: 'Are you sure you want to delete this?',
        confirmText: 'Yes, delete',
        cancelText: 'No, cancel',
        onConfirm: jest.fn(),
        onCancel: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('does not render when isOpen is false', () => {
        render(<ConfirmModal {...defaultProps} isOpen={false} />);

        expect(screen.queryByText(defaultProps.title)).toBeNull();
        expect(screen.queryByText(defaultProps.message)).toBeNull();
    });

    test('renders correctly with all props', () => {
        render(<ConfirmModal {...defaultProps} />);
        const title = screen.getByText(defaultProps.title);
        const message = screen.getByText(defaultProps.message);
        const cancelButton = screen.getByRole('button', {
            name: defaultProps.cancelText,
        });
        const confirmButton = screen.getByRole('button', {
            name: defaultProps.confirmText,
        });

        expect(title).toBeInTheDocument();
        expect(message).toBeInTheDocument();
        expect(cancelButton).toHaveClass('button', 'outline');
        expect(confirmButton).toHaveClass('button', 'danger');

        expect(document.body).toMatchSnapshot();
    });

    test('calls onCancel when cancel button is clicked', () => {
        const onCancel = jest.fn();
        render(<ConfirmModal {...defaultProps} onCancel={onCancel} />);
        const cancelButton = screen.getByRole('button', {
            name: defaultProps.cancelText,
        });
        fireEvent.click(cancelButton);
        expect(onCancel).toHaveBeenCalledTimes(1);
    });

    test('calls onConfirm when confirm button is clicked', () => {
        const onConfirm = jest.fn();
        render(<ConfirmModal {...defaultProps} onConfirm={onConfirm} />);
        const confirmButton = screen.getByRole('button', {
            name: defaultProps.confirmText,
        });
        fireEvent.click(confirmButton);
        expect(onConfirm).toHaveBeenCalledTimes(1);
    });
});
