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
            className={clsx(styles.toast, styles[variant], className)}
            role="alert"
            aria-live="assertive"
            {...props}
        >
            <div className={styles.toastContent}>{message}</div>
        </div>
    );
};
