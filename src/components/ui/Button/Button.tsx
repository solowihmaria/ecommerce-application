import React from 'react';
import styles from './Button.module.scss';
import clsx from 'clsx';
import type { ButtonProps } from './Button.types';

export const Button = ({
    variant = 'primary',
    className = '',
    ...props
}: ButtonProps) => {
    return (
        <button
            className={clsx(
                styles.button,
                styles[variant],
                className,
                props.disabled && styles.disabled
            )}
            {...props}
        />
    );
};
