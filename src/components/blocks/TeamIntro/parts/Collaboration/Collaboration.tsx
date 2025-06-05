import { FiCoffee, FiTarget, FiZap } from 'react-icons/fi';
import styles from './Collaboration.module.scss';

export const Collaboration = () => {
    return (
        <section className={styles.collaboration}>
            <div className={styles.container}>
                <div className={styles.collaborationSection}>
                    <div className={styles.collaborationHeader}>
                        <h3 className={styles.collaborationTitle}>
                            Working as One Team
                        </h3>
                    </div>

                    <div className={styles.collaborationGrid}>
                        <div className={styles.collaborationItem}>
                            <div className={styles.itemIconWrapper}>
                                <FiCoffee className={styles.itemIcon} />
                            </div>
                            <h4 className={styles.itemTitle}>Daily Sync</h4>
                            <p className={styles.itemDescription}>
                                Quick morning check-ins kept our small team
                                perfectly aligned on priorities and progress.
                            </p>
                        </div>

                        <div className={styles.collaborationItem}>
                            <div className={styles.itemIconWrapper}>
                                <FiZap className={styles.itemIcon} />
                            </div>
                            <h4 className={styles.itemTitle}>Shared Ideas</h4>
                            <p className={styles.itemDescription}>
                                Every team member contributed creative solutions
                                and innovative approaches to challenges.
                            </p>
                        </div>

                        <div className={styles.collaborationItem}>
                            <div className={styles.itemIconWrapper}>
                                <FiTarget className={styles.itemIcon} />
                            </div>
                            <h4 className={styles.itemTitle}>Clear Goals</h4>
                            <p className={styles.itemDescription}>
                                Well-defined objectives and milestones helped us
                                stay focused and deliver on time.
                            </p>
                        </div>
                    </div>

                    <div className={styles.collaborationFooter}>
                        <p className={styles.footerText}>
                            Our effective collaboration was the key to
                            EverGreen&apos;s success. Through regular
                            communication, shared responsibility, and mutual
                            support, we transformed individual skills into
                            collective achievement. Each team member brought
                            unique expertise while maintaining a unified vision,
                            resulting in a seamless development process and a
                            product we&apos;re truly proud of.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
