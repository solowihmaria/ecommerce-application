import styles from './Gratitude.module.scss';

export const Gratitude = () => {
    return (
        <section className={styles.gratitude}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <a
                        href="https://rs.school/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.logoLink}
                    >
                        <div className={styles.logo} />
                    </a>

                    <p className={styles.description}>
                        This project was created as part of our training at RS
                        School – a community-driven educational program for
                        future front-end developers. We’re grateful to the
                        mentors and the community for their support, feedback,
                        and the opportunity to grow through real teamwork and
                        hands-on experience.
                    </p>
                </div>
            </div>
        </section>
    );
};
