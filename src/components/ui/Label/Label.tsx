import React from 'react';
import styles from './Label.module.scss';
import type { LabelProps } from './Label.types';
import clsx from 'clsx';

export const Label = ({
    htmlFor,
    children,
    className = '',
    required = false,
    disabled = false,
}: LabelProps) => {
    return (
        <label
            htmlFor={htmlFor}
            className={clsx(
                styles.label,
                className,
                disabled && styles.disabled
            )}
        >
            {children}
            {required && <span className={styles.required}>*</span>}
        </label>
    );
};
