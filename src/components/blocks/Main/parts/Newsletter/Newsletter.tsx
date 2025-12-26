import { useState, useContext } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { ToastContext } from '../../../../ui/Toast/ToastContext';
import { Input } from '../../../../ui/Input/Input';
import { Button } from '../../../../ui/Button/Button';
import styles from './Newsletter.module.scss';

export function Newsletter() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { showToast } = useContext(ToastContext);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Имитация запроса к API
        setTimeout(() => {
            setEmail('');
            setIsLoading(false);
            showToast({
                message: 'Subscription successful! Thank you!',
                variant: 'success',
            });
        }, 800);
    };

    return (
        <section className={styles.newsletter}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.iconWrapper}>
                        <FaEnvelope className={styles.icon} />
                    </div>

                    <h2 className={styles.title}>Stay in the Loop</h2>

                    <p className={styles.subtitle}>
                        Get plant care tips, exclusive offers, and new arrival
                        notifications delivered to your inbox.
                    </p>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                className={styles.input}
                            />
                            <Button
                                type="submit"
                                variant="primary"
                                loading={isLoading}
                                className={styles.button}
                            >
                                Subscribe
                            </Button>
                        </div>

                        <p className={styles.disclaimer}>
                            No spam, unsubscribe at any time. We respect your
                            privacy.
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
}
