import { Catalog } from '../../components/blocks/Catalog';
import { Footer } from '../../components/blocks/Footer';
import { Header } from '../../components/blocks/Header/Header';
import styles from './CatalogPage.module.scss';

export const CatalogPage = () => (
    <div className={styles.catalogPage}>
        <Header />

        <main className={styles.catalogContent}>
            <h1 className={styles.title}>Catalog</h1>
            <Catalog></Catalog>
        </main>

        <Footer />
    </div>
);
