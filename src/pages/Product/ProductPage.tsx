import { Header } from '../../components/blocks/Header/Header';
import styles from './ProductPage.module.scss';

export const ProductPage = () => (
    <div className={styles.productPageContainer}>
        <Header />
        <main className={styles.main}>
            <h1 className={styles.title}>Product</h1>
        </main>
    </div>
);
