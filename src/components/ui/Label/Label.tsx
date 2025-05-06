import React from 'react';
import styles from './Label.module.scss';
import type { LabelProps } from './Label.types';

const Label = ({
    htmlFor,
    children,
    className = '',
    required = false,
    disabled = false,
}: LabelProps): React.JSX.Element => {
    return (
        <label
            htmlFor={htmlFor}
            className={`${styles.label} ${className} ${
                disabled ? styles.disabled : ''
            }`}
        >
            {children}
            {required && <span className={styles.required}>*</span>}
        </label>
    );
};

export default Label;
