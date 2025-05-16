import React, { useEffect } from 'react';
import styles from './Toast.module.scss';
import clsx from 'clsx';
import type { ToastProps } from './Toast.types';

export const Toast = ({
    variant = 'info',
    message,
    duration = 3000,
    onClose,
    className = '',
    ...props
}: ToastProps) => {
    useEffect(() => {
        if (duration > 0 && onClose) {
            const timer = setTimeout(onClose, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    return (
        <div
            className={clsx(
                styles.toast,
                styles[`toast--${variant}`],
                className
            )}
            role="status"
            aria-live="polite"
            aria-atomic="true"
            {...props}
        >
            <div className={styles.toastContent}>{message}</div>
        </div>
    );
};
