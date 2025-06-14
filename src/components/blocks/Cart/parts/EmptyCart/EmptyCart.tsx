import { Link } from 'react-router-dom';
import { Button } from '../../../../ui/Button';
import styles from './EmptyCart.module.scss';
import { Heading } from '../../../../ui/Heading';
import clsx from 'clsx';

export const EmptyCart = () => {
    return (
        <div className={styles.emptyCartContent}>
            <Heading className={styles.cartTitle}>Shopping Cart</Heading>
            <p className={styles.emptyCartText}>Shopping cart is empty</p>
            <Link to="/catalog" className={styles.emptyCartButtonContainer}>
                <Button className={clsx(styles.emptyCartButton, styles.button)}>
                    Start shopping
                </Button>
            </Link>
        </div>
    );
};
