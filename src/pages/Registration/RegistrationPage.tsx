import styles from './RegistrationPage.module.scss';
import { RegistrationForm } from '../../components/blocks/RegistrationForm/RegistrationForm';

export const RegistrationPage = () => {
    return (
        <div
            data-testid="test-id-registration-page"
            className={styles.registrationPage}
        >
            <RegistrationForm />
        </div>
    );
};
