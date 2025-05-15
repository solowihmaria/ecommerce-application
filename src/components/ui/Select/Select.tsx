import React from 'react';
import styles from './Select.module.scss';
import type { SelectProps } from './Select.types';
import clsx from 'clsx';

export const Select = ({
    name = '',
    children,
    className = '',
    required = false,
    disabled = false,
}: SelectProps) => {
    return (
        <select
            name={name}
            className={clsx(
                styles.select,
                className,
                disabled && styles.disabled
            )}
        >
            {children}
            {required && <span className={styles.required}>*</span>}
        </select>
    );
};
