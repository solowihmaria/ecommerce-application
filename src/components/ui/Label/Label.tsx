import React from 'react';
import styles from './Label.module.scss';
import clsx from 'clsx';
import type { LabelProps } from './Label.types';

export const Label = ({
    htmlFor,
    className = '',
    required = false,
    disabled = false,
    children,
    ...props
}: LabelProps) => {
    return (
        <label
            htmlFor={htmlFor}
            className={clsx(
                styles.label,
                className,
                disabled && styles.disabled,
                required && styles.required
            )}
            {...props}
        >
            {children}
            {required && <span aria-hidden="true">*</span>}
        </label>
    );
};
