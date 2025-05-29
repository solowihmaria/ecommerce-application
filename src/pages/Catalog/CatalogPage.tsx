import { requestGetProducts } from '../../api/getProducts/requestGetProducts';
import { Header } from '../../components/blocks/Header/Header';
import { Button } from '../../components/ui/Button';
import styles from './CatalogPage.module.scss';

export const CatalogPage = () => (
    <div className={styles.catalogPageContainer}>
        <Header />
        <main className={styles.main}>
            <h1 className={styles.title}>Catalog</h1>
        </main>

        <Button
            onClick={() => {
                void requestGetProducts();
            }}
        >
            Get Products
        </Button>
    </div>
);
