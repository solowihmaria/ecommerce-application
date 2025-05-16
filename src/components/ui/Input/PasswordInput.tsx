import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import type { InputProps } from './Input.types';
import styles from './Input.module.scss';
import clsx from 'clsx';

export const PasswordInput = React.forwardRef<
    HTMLInputElement,
    Omit<InputProps, 'type'>
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
                <InputToggleButton
                    showPassword={showPassword}
                    onTogglePassword={() =>
                        setShowPassword((previous) => !previous)
                    }
                />
            </div>
            {error && (
                <span className={styles.errorMessage}>{errorMessage}</span>
            )}
        </div>
    );
});

const InputToggleButton = ({
    showPassword,
    onTogglePassword,
}: {
    showPassword: boolean;
    onTogglePassword: () => void;
}) => (
    <button
        type="button"
        className={styles.toggleButton}
        onClick={onTogglePassword}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
    >
        {showPassword ? <FaEye /> : <FaEyeSlash />}
    </button>
);

PasswordInput.displayName = 'PasswordInput';
