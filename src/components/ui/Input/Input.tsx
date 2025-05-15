import React from 'react';
import styles from './Input.module.scss';
import type { InputProps } from './Input.types';
import { InputToggleButton } from './InputToggle';
import clsx from 'clsx';

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            type = 'text',
            className = '',
            error = false,
            errorMessage,
            hasPasswordToggle = false,
            onTogglePassword,
            showPassword,
            ...props
        },
        reference
    ) => (
        <div
            data-testid="input-test-id"
            className={clsx(
                styles.inputContainer,
                type === 'checkbox' && styles.checkbox
            )}
        >
            <div className={styles.inputWrapper}>
                <input
                    ref={reference}
                    type={showPassword ? 'text' : type}
                    className={clsx(
                        styles.input,
                        error && styles.error,
                        hasPasswordToggle && styles.password,
                        className
                    )}
                    {...props}
                />
                {hasPasswordToggle &&
                    type === 'password' &&
                    onTogglePassword && (
                        <InputToggleButton
                            showPassword={!!showPassword}
                            onTogglePassword={onTogglePassword}
                        />
                    )}
            </div>
            {error && (
                <span className={styles.errorMessage}>{errorMessage}</span>
            )}
        </div>
    )
);

Input.displayName = 'Input';
