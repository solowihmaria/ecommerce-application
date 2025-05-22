import { Header } from '../../components/blocks/Header/Header';
import { Profile } from '../../components/blocks/Profile/Profile';
import styles from './ProfilePage.module.scss';

export const ProfilePage = () => {
    return (
        <div className={styles.profilePage}>
            <Header />
            <main className={styles.profileContent}>
                <Profile />
            </main>
        </div>
    );
};
