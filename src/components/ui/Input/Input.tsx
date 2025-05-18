import React from 'react';
import styles from './Input.module.scss';
import clsx from 'clsx';
import { FiAlertCircle } from 'react-icons/fi';
import type { InputProps } from './Input.types';

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            type = 'text',
            className = '',
            error = false,
            errorMessage,
            ...props
        },
        reference
    ) => (
        <div
            className={clsx(
                styles.inputContainer,
                type === 'checkbox' && styles.checkbox
            )}
        >
            <div className={styles.inputWrapper}>
                <input
                    data-testid="test-id-input-field"
                    ref={reference}
                    type={type}
                    className={clsx(
                        styles.input,
                        {
                            [styles.error]: error,
                        },
                        className
                    )}
                    {...props}
                />
            </div>
            {error && errorMessage && (
                <div className={styles.errorMessage}>
                    <FiAlertCircle className={styles.errorIcon} />
                    <span data-testid="error-input-test-id">
                        {errorMessage}
                    </span>
                </div>
            )}
        </div>
    )
);

Input.displayName = 'Input';
