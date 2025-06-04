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
                    We&apos;re three passionate developers who love plants and
                    great code. Together, we created EverGreen to bring nature
                    closer to your home through beautiful, modern web
                    technology.
                </p>
            </div>
        </section>
    );
};
