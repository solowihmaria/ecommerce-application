import React from 'react';
import styles from './LoginPage.module.scss';
import { LoginForm } from '../../components/blocks/LoginForm/LoginForm';

export const LoginPage = () => {
    return (
        <div className={styles.loginPage}>
            {/*потом тут будет хэдер добавлеен и остальные составляющиее странички*/}
            <main className={styles.loginContent}>
                <LoginForm />
            </main>
        </div>
    );
};
