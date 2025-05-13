import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../RegistrationForm.module.scss';

export const SignInRedirect = () => (
    <div className={styles.signInRedirect}>
        <p className={styles.signInText}>Already have an account?</p>

        <Link to="/login" className={styles.signInLink}>
            Sign In
        </Link>
    </div>
);
