import { Header } from '../../components/blocks/Header/Header';
import { UserProfile } from '../../components/blocks/UserProfile';
import { Footer } from '../../components/blocks/Footer';
import styles from './ProfilePage.module.scss';

export const ProfilePage = () => {
    return (
        <div data-testid="profile-page-test-id" className={styles.profilePage}>
            <Header />
            <main className={styles.profileContent}>
                <UserProfile />
            </main>
            <Footer />
        </div>
    );
};
