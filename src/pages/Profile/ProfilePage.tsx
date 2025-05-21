import { Header } from '../../components/blocks/Header/Header';
import styles from './ProfilePage.module.scss';

export const ProfilePage = () => (
    <div className={styles.profilePageContainer}>
        <Header />
        <main className={styles.main}>
            <h1 className={styles.title}>Profile</h1>
        </main>
    </div>
);
