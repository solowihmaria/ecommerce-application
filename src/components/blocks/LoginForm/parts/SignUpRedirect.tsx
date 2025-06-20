import { Link } from 'react-router-dom';
import styles from '../LoginForm.module.scss';

export const SignUpRedirect = () => (
    <div className={styles.signUpRedirect}>
        <p className={styles.signUpText}>Don&apos;t have an account?</p>
        <Link to="/register" className={styles.signUpLink}>
            Sign Up
        </Link>
    </div>
);
