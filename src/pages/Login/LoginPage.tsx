import styles from './LoginPage.module.scss';
import { LoginForm } from '../../components/blocks/LoginForm/LoginForm';

export const LoginPage = () => {
    return (
        <div data-testid="test-id-login-page" className={styles.loginPage}>
            <LoginForm />
        </div>
    );
};
