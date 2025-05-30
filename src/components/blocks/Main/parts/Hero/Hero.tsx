import { Button } from '../../../../ui/Button/Button';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import styles from './Hero.module.scss';

export function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1 className={styles.title}>
                        Bring Nature
                        <span className={styles.titleHighlight}> Home</span>
                    </h1>

                    <p className={styles.description}>
                        Discover our curated collection of beautiful, healthy
                        plants that will transform your space into a green
                        oasis. From beginner-friendly succulents to exotic
                        tropical plants.
                    </p>

                    <Link to="/catalog">
                        <Button variant="primary" className={styles.button}>
                            Find Your Plant
                            <FaArrowRight className={styles.buttonIcon} />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
