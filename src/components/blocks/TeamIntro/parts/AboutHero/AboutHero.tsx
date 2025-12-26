import styles from './AboutHero.module.scss';

export const AboutHero = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <h1 className={styles.title}>
                    Meet the{' '}
                    <span className={styles.titleHighlight}>TripleClick</span>{' '}
                    Team
                </h1>

                <p className={styles.description}>
                    We&apos;re a team of three developers united by our passion
                    for plants and clean code. EverGreen is our way of combining
                    nature and technology to create a modern, user-friendly web
                    experience.
                </p>
            </div>
        </section>
    );
};
