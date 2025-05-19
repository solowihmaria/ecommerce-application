import styles from './Select.module.scss';
import clsx from 'clsx';
import type { SelectProps } from './Select.types';

export const Select = ({
    name,
    className = '',
    required,
    disabled,
    ...props
}: SelectProps) => {
    return (
        <div className={styles.selectWrapper}>
            <select
                data-testid="test-id-select-field"
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
            ></select>

            {required && <span className={styles.requiredMarker}>*</span>}
        </div>
    );
};
