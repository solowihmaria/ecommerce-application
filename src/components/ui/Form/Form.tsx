import React from 'react';
import type { FormProps } from './Form.types';
import styles from './Form.module.scss';
import clsx from 'clsx';

export const Form = ({ children, className = '', ...props }: FormProps) => {
    return (
        <form
            data-testid="form-test-id"
            className={clsx(styles.form, className)}
            {...props}
        >
            {children}
        </form>
    );
};
