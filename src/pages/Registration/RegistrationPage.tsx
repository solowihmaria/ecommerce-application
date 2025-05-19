import styles from './RegistrationPage.module.scss';
import { RegistrationForm } from '../../components/blocks/RegistrationForm/RegistrationForm';
import { Header } from '../../components/blocks/Header/Header';

export const RegistrationPage = () => {
    return (
        <div
            data-testid="test-id-registration-page"
            className={styles.registrationPage}
        >
            <Header />
            <main className={styles.registrationContent}>
                <RegistrationForm />
            </main>
        </div>
    );
};
