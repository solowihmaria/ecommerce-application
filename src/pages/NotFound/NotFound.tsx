import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button/Button';
import styles from './NotFound.module.scss';
import { LeafFall } from './LeafFall';

export const NotFoundPage = () => {
    return (
        <div className={styles.wrapper}>
            <LeafFall />
            <div className={styles.content}>
                <div className={styles.sadPlant}></div>
                <div className={styles.errorCode}>404</div>
                <p className={styles.message}>
                    Oops! Page Not Found
                    <br />
                    The page you&apos;re looking for has either wilted away or
                    hasn&apos;t bloomed yet.
                </p>
                <Link to="/" className={styles.homeLink}>
                    <Button className={styles.button}>Go to Homepage</Button>
                </Link>
            </div>
        </div>
    );
};
