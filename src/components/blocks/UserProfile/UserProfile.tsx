import { PersonalInfo } from './parts/PersonalInfo';
import { AddressList } from './parts/AddressList';
import { ChangePassword } from './parts/ChangePassword';
import { Heading } from '../../../components/ui/Heading';
import styles from './UserProfile.module.scss';
import { FiUser } from 'react-icons/fi';

export const UserProfile = () => {
    return (
        <main className={styles.profileContent}>
            <div className={styles.profileContainer}>
                <div className={styles.headerWrapper}>
                    <FiUser className={styles.profileIcon} />
                    <Heading level="h1" className={styles.pageTitle}>
                        My Profile
                    </Heading>
                </div>

                <div className={styles.profileMain}>
                    <div className={styles.infoSection}>
                        <PersonalInfo />
                    </div>
                    <div className={styles.passwordSection}>
                        <ChangePassword />
                    </div>
                </div>

                <div className={styles.addressesSection}>
                    <AddressList />
                </div>
            </div>
        </main>
    );
};
