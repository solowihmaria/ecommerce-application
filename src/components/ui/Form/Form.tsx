import React from 'react';
import type { FormProps } from './Form.types';
import styles from './Form.module.scss';

export const Form = ({ children, className = '', ...props }: FormProps) => {
    return (
        <form className={`${styles.form} ${className}`} {...props}>
            {children}
        </form>
    );
};
