import React from 'react';
import { FirstNameField } from './FirstNameField';
import { LastNameField } from './LastNameField';
import { BirthDateField } from './BirthDateField';
import styles from '../RegistrationForm.module.scss';
import clsx from 'clsx';
import type { FormPartProps } from '../Registration.types';

export const PersonalInfoFieldSet = ({ register, errors }: FormPartProps) => {
    return (
        <fieldset
            className={clsx(styles.formGroup, styles.fieldset, styles.grid3)}
        >
            <legend className={styles.legend}>Personal Info</legend>

            <FirstNameField register={register} error={errors.firstName} />
            <LastNameField register={register} error={errors.lastName} />
            <BirthDateField register={register} error={errors.birthDate} />
        </fieldset>
    );
};
