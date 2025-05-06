import React from 'react';
import styles from './Button.module.scss';
import type { ButtonProps } from './Button.types';

const Button = ({
    type = 'button',
    className = '',
    onClick,
    disabled = false,
    children,
}: ButtonProps): React.JSX.Element => {
    return (
        <button
            type={type}
            className={`${styles.button} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
