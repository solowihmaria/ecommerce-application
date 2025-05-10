import React from 'react';
import { Link } from 'react-router-dom';
import Heading from '../../components/ui/Heading/Heading';
import Button from '../../components/ui/Button/Button';
import styles from './NotFound.module.scss';

export const NotFoundPage: React.FC = () => {
    return (
        <div className={styles.notfound}>
            <div className={styles.content}>
                <div className={styles.errorcode}>404</div>
                <Heading level="h1" className={styles.title}>
                    Page Not Found
                </Heading>
                <p className={styles.message}>
                    Oops! The page you&apos;re looking for doesn&apos;t exist or
                    has been moved.
                </p>
                <Link to="/" className={styles.homelink}>
                    <Button className={styles.button}>Go to Homepage</Button>
                </Link>
            </div>
        </div>
    );
};
