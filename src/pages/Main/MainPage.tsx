import { Header } from '../../components/blocks/Header/Header';
import styles from './MainPage.module.scss';

export const MainPage = () => (
    <div data-testid="main-page-test-id" className={styles.mainPageContainer}>
        <Header />
        <main className={styles.main}>
            <div className={styles.titleWrapper}>
                <h1 className={styles.title}>Evergreen</h1>
                <h3 className={styles.titleSecondary}>
                    Find your perfect plant
                </h3>
            </div>
        </main>
    </div>
);
