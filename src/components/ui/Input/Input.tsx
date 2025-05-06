import React from 'react';
import styles from './Input.module.scss';
import type { InputProps } from './Input.types';

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            type = 'text',
            className = '',
            error = false,
            errorMessage,
            ...props
        },
        reference
    ) => {
        return (
            <div className={styles.inputContainer}>
                <input
                    ref={reference}
                    type={type}
                    className={`${styles.input} ${error ? styles.error : ''} ${className}`}
                    {...props}
                />
                {error && errorMessage && (
                    <span className={styles.errorMessage}>{errorMessage}</span>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input'; // Для отладки в DevTools (пишут, что так удобнее)

export default Input;
