// import { requestGetProducts } from '../../api/getProducts/requestGetProducts';
import { Catalog } from '../../components/blocks/Catalog';
import { Header } from '../../components/blocks/Header/Header';
// import { Button } from '../../components/ui/Button';
import styles from './CatalogPage.module.scss';

export const CatalogPage = () => (
    <div className={styles.catalogPage}>
        <Header />
        <main className={styles.catalogContent}>
            <h1 className={styles.title}>Catalog</h1>

            {/* <Button
                onClick={() => {
                    void requestGetProducts();
                }}
            >
                Get Products
            </Button> */}

            <Catalog></Catalog>
        </main>
    </div>
);
