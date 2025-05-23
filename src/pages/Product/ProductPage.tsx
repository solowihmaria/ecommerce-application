import { Header } from '../../components/blocks/Header/Header';
import { ProductDetails } from '../../components/blocks/ProductDetails/ProductDetails';
import styles from './ProductPage.module.scss';
import { useParams } from 'react-router-dom';

export const ProductPage = () => {
    const location = useParams();

    return (
        <div className={styles.productPageContainer}>
            <Header />
            <main className={styles.main}>
                <h1 className={styles.title}>Product id = {location.id}</h1>
                <ProductDetails />
            </main>
        </div>
    );
};
