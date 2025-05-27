import { Header } from '../../components/blocks/Header/Header';
import styles from './CatalogPage.module.scss';

export const CatalogPage = () => (
    <div className={styles.catalogPageContainer}>
        <Header />
        <main className={styles.main}>
            <h1 className={styles.title}>Catalog</h1>
        </main>
    </div>
);
