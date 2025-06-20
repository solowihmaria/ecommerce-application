import React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './Input.module.scss';
import clsx from 'clsx';
import { FiAlertCircle } from 'react-icons/fi';
import type { PasswordInputProps } from './Input.types';

export const PasswordInput = React.forwardRef<
    HTMLInputElement,
    PasswordInputProps
>(
    (
        {
            className = '',
            error,
            errorMessage,
            isPasswordVisible,
            onVisibilityToggle,
            ...props
        },
        reference
    ) => {
        return (
            <div className={styles.inputContainer}>
                <div className={styles.inputWrapper}>
                    <input
                        ref={reference}
                        type={isPasswordVisible ? 'text' : 'password'}
                        className={clsx(
                            styles.input,
                            styles.password,
                            { [styles.error]: error },
                            className
                        )}
                        {...props}
                    />
                    <button
                        type="button"
                        className={styles.toggleButton}
                        onClick={onVisibilityToggle}
                        aria-label={
                            isPasswordVisible
                                ? 'Hide password'
                                : 'Show password'
                        }
                    >
                        {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                {error && errorMessage && (
                    <div className={styles.errorMessage}>
                        <FiAlertCircle className={styles.errorIcon} />
                        <span data-testid="error-input-password-test-id">
                            {errorMessage}
                        </span>
                    </div>
                )}
            </div>
        );
    }
);

PasswordInput.displayName = 'PasswordInput';
