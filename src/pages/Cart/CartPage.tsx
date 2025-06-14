import { Cart } from '../../components/blocks/Cart/Cart';
import styles from './CartPage.module.scss';

export const CartPage = () => {
    return (
        <div className={styles.cartPageContainer}>
            <main className={styles.main}>
                <Cart />
            </main>
        </div>
    );
};
