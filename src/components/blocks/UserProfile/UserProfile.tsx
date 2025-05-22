import { PersonalInfo } from './parts/PersonalInfo';
//import { AddressList } from './parts/AddressList';
import { ChangePassword } from './parts/ChangePassword';
import { Heading } from '../../../components/ui/Heading';
import styles from './UserProfile.module.scss';

export const UserProfile = () => {
    return (
        <div className={styles.profileContainer}>
            <Heading level="h1" className={styles.pageTitle}>
                My Profile
            </Heading>
            <div className={styles.profileSections}>
                <PersonalInfo />

                {/*<AddressList />*/}

                <ChangePassword />
            </div>
        </div>
    );
};
