import { Link } from 'react-router-dom';
import { Button } from '../../../../ui/Button';
import styles from './ErrorCart.module.scss';
import { Heading } from '../../../../ui/Heading';
import clsx from 'clsx';

export const ErrorCart = ({ message }: { message: string }) => {
    return (
        <div
            data-testid="error-cart-test-id"
            className={styles.errorCartContent}
        >
            <Heading className={styles.cartTitle}>Shopping Cart</Heading>
            <p className={styles.errorCartText}>{message}</p>
            <Link to="/main" className={styles.errorCartButtonContainer}>
                <Button className={clsx(styles.errorCartButton, styles.button)}>
                    Go to Home
                </Button>
            </Link>
        </div>
    );
};
