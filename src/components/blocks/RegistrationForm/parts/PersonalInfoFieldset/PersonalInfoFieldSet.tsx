import { FirstNameField } from './FirstNameField';
import { LastNameField } from './LastNameField';
import { DateOfBirthField } from './DateOfBirthField';
import styles from '../../RegistrationForm.module.scss';
import clsx from 'clsx';
import type { FormPartProps } from '../../Registration.types';

export const PersonalInfoFieldSet = ({ errors }: FormPartProps) => {
    return (
        <fieldset className={clsx(styles.fieldset, styles.personalInfo)}>
            <legend className={styles.legend}>Personal Info</legend>

            <FirstNameField error={errors?.firstName} />
            <LastNameField error={errors?.lastName} />
            <DateOfBirthField error={errors?.dateOfBirth} />
        </fieldset>
    );
};
