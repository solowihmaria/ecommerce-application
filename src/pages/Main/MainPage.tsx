import { Header } from '../../components/blocks/Header/Header';
import { Main } from '../../components/blocks/Main';
import { Footer } from '../../components/blocks/Footer';
import styles from './MainPage.module.scss';

export const MainPage = () => (
    <div data-testid="main-page-test-id" className={styles.mainPageContainer}>
        <Header />
        <Main />
        <Footer />
    </div>
);
