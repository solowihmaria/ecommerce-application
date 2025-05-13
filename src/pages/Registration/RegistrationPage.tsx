import React from 'react';
import styles from './RegistrationPage.module.scss';
import { RegistrationForm } from '../../components/blocks/RegistrationForm/RegistrationForm';

export const RegistrationPage = () => {
    return (
        <div className={styles.registrationPage}>
            {/*потом тут тоже будет хэдер добавлен и остальные составляющие странички*/}
            <main className={styles.registrationContent}>
                <RegistrationForm />
            </main>
        </div>
    );
};
