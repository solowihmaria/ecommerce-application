import { useContext } from 'react';

import { FaCopy, FaGift, FaLeaf, FaSeedling } from 'react-icons/fa';
import { ToastContext } from '../../../../ui/Toast/ToastContext';
import styles from './PromoCodes.module.scss';

export function PromoCodes() {
    const { showToast } = useContext(ToastContext);
    const copyToClipboard = (text: string) => {
        void navigator.clipboard.writeText(text);
        showToast({
            message: 'Saved',
            variant: 'success',
        });
    };

    return (
        <section className={styles.promoSection}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Exclusive Offers</h2>
                    <p className={styles.subtitle}>
                        Save more with our special discount codes! Each offer is
                        designed to help you grow your plant collection.
                    </p>
                </div>

                <div className={styles.cardsGrid}>
                    <div className={styles.promoCard}>
                        <div
                            className={`${styles.cardBackground} ${styles.firstOrderBg}`}
                        ></div>
                        <div className={styles.cardContent}>
                            <div className={styles.cardHeader}>
                                <div className={styles.emojiBadge}>
                                    <FaLeaf />
                                </div>
                                <h3 className={styles.cardTitle}>
                                    First Order Special
                                </h3>
                                <p className={styles.cardSubtitle}>
                                    Welcome to our green family!
                                </p>
                            </div>

                            <div className={styles.discountBox}>
                                <div className={styles.discountAmount}>
                                    <span className={styles.discountPercent}>
                                        20%
                                    </span>
                                    <p className={styles.discountDescription}>
                                        OFF your first purchase with us
                                    </p>
                                </div>
                                <div className={styles.codeBox}>
                                    <span className={styles.codeText}>
                                        WELCOME20
                                    </span>
                                    <button
                                        className={styles.iconButton}
                                        onClick={() =>
                                            copyToClipboard('WELCOME20')
                                        }
                                    >
                                        <FaCopy />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.promoCard}>
                        <div
                            className={`${styles.cardBackground} ${styles.birthdayBg}`}
                        ></div>
                        <div className={styles.cardContent}>
                            <div className={styles.cardHeader}>
                                <div className={styles.emojiBadge}>
                                    <FaGift />
                                </div>
                                <h3 className={styles.cardTitle}>
                                    Birthday Gift
                                </h3>
                                <p className={styles.cardSubtitle}>
                                    Celebrate with plants!
                                </p>
                            </div>

                            <div className={styles.discountBox}>
                                <div className={styles.discountAmount}>
                                    <span className={styles.discountPercent}>
                                        25%
                                    </span>
                                    <p className={styles.discountDescription}>
                                        OFF on your birthday month
                                    </p>
                                </div>
                                <div className={styles.codeBox}>
                                    <span className={styles.codeText}>
                                        BIRTHDAY25
                                    </span>
                                    <button
                                        className={styles.iconButton}
                                        onClick={() =>
                                            copyToClipboard('BIRTHDAY25')
                                        }
                                    >
                                        <FaCopy />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.promoCard}>
                        <div
                            className={`${styles.cardBackground} ${styles.bundleBg}`}
                        ></div>
                        <div className={styles.cardContent}>
                            <div className={styles.cardHeader}>
                                <div className={styles.emojiBadge}>
                                    <FaSeedling />
                                </div>
                                <h3 className={styles.cardTitle}>
                                    Plant Trio Deal
                                </h3>
                                <p className={styles.cardSubtitle}>
                                    More plants, more savings!
                                </p>
                            </div>

                            <div className={styles.discountBox}>
                                <div className={styles.discountAmount}>
                                    <span className={styles.discountPercent}>
                                        30%
                                    </span>
                                    <p className={styles.discountDescription}>
                                        OFF when you buy 3+ plants
                                    </p>
                                </div>
                                <div className={styles.codeBox}>
                                    <span className={styles.codeText}>
                                        TRIO30
                                    </span>
                                    <button
                                        className={styles.iconButton}
                                        onClick={() =>
                                            copyToClipboard('TRIO30')
                                        }
                                    >
                                        <FaCopy />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
