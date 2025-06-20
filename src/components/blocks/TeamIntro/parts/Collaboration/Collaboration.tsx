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
                            <h4 className={styles.itemTitle}>
                                Team Communication
                            </h4>
                            <p className={styles.itemDescription}>
                                We stayed in constant touch to quickly address
                                issues, make decisions, and keep everything
                                running smoothly.
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
                            Throughout the project, we worked closely as a
                            team—communicating regularly, sharing
                            responsibilities, and supporting each other. Tasks
                            were delegated clearly, everyone stayed accountable,
                            and collaboration felt natural and effective. Each
                            member brought their own strengths, contributing to
                            a well-organized and productive workflow.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
