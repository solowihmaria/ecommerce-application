import { FaLeaf, FaHeart, FaTruck, FaStar } from 'react-icons/fa';
import styles from './About.module.scss';

export function AboutSection() {
    return (
        <section className={styles.about}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.header}>
                        <h2 className={styles.title}>
                            Why{' '}
                            <span className={styles.titleHighlight}>
                                Evergreen?
                            </span>
                        </h2>
                        <p className={styles.subtitle}>
                            We make plant parenting easy and enjoyable.
                            Here&apos;s what makes us different.
                        </p>
                    </div>

                    <div className={styles.featuresGrid}>
                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>
                                <FaLeaf />
                            </div>
                            <h3 className={styles.featureTitle}>
                                Healthy Plants
                            </h3>
                            <p className={styles.featureText}>
                                Every plant is carefully inspected before
                                shipping
                            </p>
                        </div>

                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>
                                <FaTruck />
                            </div>
                            <h3 className={styles.featureTitle}>
                                Fast Delivery
                            </h3>
                            <p className={styles.featureText}>
                                Free shipping on orders over 50 €, delivered in
                                2-3 days
                            </p>
                        </div>

                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>
                                <FaHeart />
                            </div>
                            <h3 className={styles.featureTitle}>
                                Plant Care Support
                            </h3>
                            <p className={styles.featureText}>
                                Get expert advice whenever you need help
                            </p>
                        </div>

                        <div className={styles.featureCard}>
                            <div className={styles.featureIcon}>
                                <FaStar />
                            </div>
                            <h3 className={styles.featureTitle}>
                                30-Day Guarantee
                            </h3>
                            <p className={styles.featureText}>
                                Not happy? We&apos;ll replace your plant or
                                refund you
                            </p>
                        </div>
                    </div>

                    <div className={styles.statsContainer}>
                        <div className={styles.statsGrid}>
                            <div className={styles.statItem}>
                                <div className={styles.statNumber}>10K+</div>
                                <div className={styles.statLabel}>
                                    Happy Customers
                                </div>
                            </div>
                            <div className={styles.statItem}>
                                <div className={styles.statNumber}>15K+</div>
                                <div className={styles.statLabel}>
                                    Plants delivered safely
                                </div>
                            </div>
                            <div className={styles.statItem}>
                                <div className={styles.statNumber}>4.9★</div>
                                <div className={styles.statLabel}>
                                    Customer Rating
                                </div>
                            </div>
                            <div className={styles.statItem}>
                                <div className={styles.statNumber}>9 Years</div>
                                <div className={styles.statLabel}>
                                    Experience
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
