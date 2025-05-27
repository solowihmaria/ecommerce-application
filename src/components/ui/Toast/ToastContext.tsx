import { createContext, useState } from 'react';
import { Toast } from './Toast';
import type { ToastVariant } from './Toast.types';

interface ToastConfig {
    message: string;
    variant?: ToastVariant;
}

interface ToastContextType {
    showToast: (config: ToastConfig) => void;
}

export const ToastContext = createContext<ToastContextType>({
    showToast: () => {},
});

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [toast, setToast] = useState<ToastConfig | null>(null);

    const showToast = ({ message, variant }: ToastConfig) => {
        setToast({ message, variant });
        setTimeout(() => setToast(null), 3000);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && (
                <Toast
                    message={toast.message}
                    variant={toast.variant}
                    onClose={() => setToast(null)}
                />
            )}
        </ToastContext.Provider>
    );
};
