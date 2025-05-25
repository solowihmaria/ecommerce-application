import styles from './ConfirmModal.module.scss';
import { Button } from '../Button';
import type { ConfirmModalProps } from './ConfirmModal.types';

export const ConfirmModal = ({
    title = 'Confirm action',
    message,
    confirmText = 'Delete',
    cancelText = 'Cancel',
    onConfirm,
    onCancel,
    isLoading = false,
}: ConfirmModalProps) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.message}>{message}</p>
                <div className={styles.actions}>
                    <Button
                        variant="danger"
                        onClick={onConfirm}
                        loading={isLoading}
                    >
                        {confirmText}
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        {cancelText}
                    </Button>
                </div>
            </div>
        </div>
    );
};
