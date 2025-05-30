import styles from './LoginPage.module.scss';
import { LoginForm } from '../../components/blocks/LoginForm/LoginForm';
import { Header } from '../../components/blocks/Header/Header';
import { Footer } from '../../components/blocks/Footer';

export const LoginPage = () => {
    return (
        <div data-testid="test-id-login-page" className={styles.loginPage}>
            <Header />
            <main className={styles.loginContent}>
                <LoginForm />
            </main>
            <Footer />
        </div>
    );
};
