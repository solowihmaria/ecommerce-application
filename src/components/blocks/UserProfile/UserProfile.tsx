import { PersonalInfo } from './parts/PersonalInfo';
import { AddressList } from './parts/AddressList';
import { ChangePassword } from './parts/ChangePassword';
import { Heading } from '../../../components/ui/Heading';
import styles from './UserProfile.module.scss';
import { FiUser } from 'react-icons/fi';

export const UserProfile = () => {
    return (
        <div className={styles.profileContainer}>
            <div className={styles.headerWrapper}>
                <FiUser className={styles.profileIcon} />
                <Heading level="h1" className={styles.pageTitle}>
                    My Profile
                </Heading>
            </div>
            <div className={styles.profileSections}>
                <PersonalInfo />
                <AddressList />
                <ChangePassword />
            </div>
        </div>
    );
};
