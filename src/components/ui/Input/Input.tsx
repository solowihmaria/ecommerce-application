import React from 'react';
import styles from './Input.module.scss';
import type { InputProps } from './Input.types';
import clsx from 'clsx';

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
                        error && styles.error,
                        className
                    )}
                    {...props}
                />
            </div>
            {error && (
                <span className={styles.errorMessage}>{errorMessage}</span>
            )}
        </div>
    )
);

Input.displayName = 'Input';
