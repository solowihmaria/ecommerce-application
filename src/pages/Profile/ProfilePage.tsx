import { UserProfile } from '../../components/blocks/UserProfile';
import styles from './ProfilePage.module.scss';

export const ProfilePage = () => {
    return (
        <div data-testid="profile-page-test-id" className={styles.profilePage}>
            <UserProfile />
        </div>
    );
};
