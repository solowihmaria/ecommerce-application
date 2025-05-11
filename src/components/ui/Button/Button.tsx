import React from 'react';
import styles from './Button.module.scss';
import type { ButtonProps } from './Button.types';

export const Button = ({
    type = 'button',
    className = '',
    onClick,
    disabled = false,
    variant = 'primary',
    children,
}: ButtonProps) => {
    return (
        <button
            type={type}
            className={`${styles.button} ${styles[variant]} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
