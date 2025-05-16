import React from 'react';
import styles from './Select.module.scss';
import clsx from 'clsx';
import type { SelectProps } from './Select.types';

export const Select = ({
    name,
    className = '',
    required = false,
    disabled = false,
    children,
    ...props
}: SelectProps) => {
    return (
        <div className={styles.selectWrapper}>
            <select
                name={name}
                className={clsx(
                    styles.select,
                    className,
                    disabled && styles.disabled,
                    required && styles.required
                )}
                disabled={disabled}
                required={required}
                {...props}
            >
                {children}
            </select>
            {required && <span className={styles.requiredMarker}>*</span>}
        </div>
    );
};
