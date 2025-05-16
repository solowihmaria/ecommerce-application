import React from 'react';
import styles from './Input.module.scss';
import clsx from 'clsx';
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
                <span className={styles.errorMessage}>{errorMessage}</span>
            )}
        </div>
    )
);

Input.displayName = 'Input';
