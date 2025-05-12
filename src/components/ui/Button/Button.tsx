import React from 'react';
import styles from './Button.module.scss';
import type { ButtonProps } from './Button.types';
import clsx from 'clsx';

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
            className={clsx(
                styles.button,
                styles[variant],
                className,
                disabled && styles.disabled
            )}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
