import React from 'react';
import { FirstNameField } from './FirstNameField';
import { LastNameField } from './LastNameField';
import { BirthDateField } from './BirthDateField';
import styles from '../RegistrationForm.module.scss';
import clsx from 'clsx';

export const PersonalInfoFieldSet = () => (
    <fieldset className={clsx(styles.fieldset, styles.grid3)}>
        <legend className={styles.legend}>Personal Info</legend>

        <FirstNameField />
        <LastNameField />
        <BirthDateField />
    </fieldset>
);
