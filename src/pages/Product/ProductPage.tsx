/*import { Header } from '../../components/blocks/Header/Header';*/
import { ProductDetails } from '../../components/blocks/ProductDetails/ProductDetails';
import styles from './ProductPage.module.scss';

export const ProductPage = () => {
    return (
        <div className={styles.productPageContainer}>
            <main className={styles.main}>
                <ProductDetails />
            </main>
        </div>
    );
};
