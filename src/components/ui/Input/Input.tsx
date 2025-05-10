import React from 'react';
import styles from './Input.module.scss';
import type { InputProps } from './Input.types';
import { InputToggleButton } from './InputToggle';

const Input = React.forwardRef<HTMLInputElement, InputProps>(
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
        <div className={styles.inputContainer}>
            <div className={styles.inputWrapper}>
                <input
                    ref={reference}
                    type={showPassword ? 'text' : type}
                    className={`${styles.input} ${error ? styles.error : ''} ${className}`}
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

export default Input;
