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
}: ToastProps) => {
    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => onClose?.(), duration);
            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    return (
        <div
            className={clsx(styles.toast, styles[variant], className)}
            role="alert"
            aria-live="polite"
        >
            <div className={styles.content}>{message}</div>
        </div>
    );
};
