import React from 'react';
import styles from './Button.module.scss';
import clsx from 'clsx';
import type { ButtonProps } from './Button.types';

export const Button = ({
    variant = 'primary',
    loading = false,
    className = '',
    children,
    ...props
}: ButtonProps & { loading?: boolean }) => {
    return (
        <button
            className={clsx(styles.button, styles[variant], className, {
                [styles.disabled]: props.disabled,
                [styles.loading]: loading,
            })}
            disabled={loading || props.disabled}
            {...props}
        >
            {children}
            {loading && <span className={styles.spinner} />}
        </button>
    );
};
