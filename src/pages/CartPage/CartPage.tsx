import { Cart } from '../../components/blocks/Cart/Cart';
import { Footer } from '../../components/blocks/Footer';
import { Header } from '../../components/blocks/Header/Header';
import styles from './CartPage.module.scss';

export const CartPage = () => {
    return (
        <div className={styles.cartPageContainer}>
            <Header />
            <main className={styles.main}>
                <Cart />
            </main>
            <Footer />
        </div>
    );
};
