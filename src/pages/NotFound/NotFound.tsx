import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button/Button';
import styles from './NotFound.module.scss';

export const NotFoundPage = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.contentContainer}>
                <div className={styles.contentCard}>
                    <div className={styles.textContent}>
                        <h1 className={styles.errorCode}>404</h1>
                        <p className={styles.message}>Page Not Found</p>
                        <p className={styles.description}>
                            The page you&apos;re looking for has either wilted
                            away or hasn&apos;t bloomed yet.
                        </p>
                        <Link to="/">
                            <Button className={styles.button}>
                                Back to Main
                            </Button>
                        </Link>
                    </div>
                    <div className={styles.plantImage}></div>
                </div>
            </div>
        </div>
    );
};
