import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './Input.module.scss';
import clsx from 'clsx';
import { FiAlertCircle } from 'react-icons/fi';
import type { PasswordInputProps } from './Input.types';

export const PasswordInput = React.forwardRef<
    HTMLInputElement,
    PasswordInputProps
>(({ className = '', error, errorMessage, ...props }, reference) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={styles.inputContainer}>
            <div className={styles.inputWrapper}>
                <input
                    ref={reference}
                    type={showPassword ? 'text' : 'password'}
                    className={clsx(
                        styles.input,
                        styles.password,
                        error && styles.error,
                        className
                    )}
                    {...props}
                />
                <button
                    type="button"
                    className={styles.toggleButton}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                    }
                >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
            </div>
            {error && errorMessage && (
                <div className={styles.errorMessage}>
                    <FiAlertCircle className={styles.errorIcon} />
                    <span>{errorMessage}</span>
                </div>
            )}
        </div>
    );
});

PasswordInput.displayName = 'PasswordInput';
