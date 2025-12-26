import styles from './Form.module.scss';
import clsx from 'clsx';
import type { FormProps } from './Form.types';

export const Form = ({ className = '', ...props }: FormProps) => {
    return (
        <form
            data-testid="form-test-id"
            className={clsx(styles.form, className)}
            {...props}
        />
    );
};
