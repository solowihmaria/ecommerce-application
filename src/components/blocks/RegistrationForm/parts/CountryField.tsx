import React from 'react';
import styles from '../RegistrationForm.module.scss';
import type { CountryFieldProps } from '../Registration.types';
import { Label } from '../../../ui/Label/Label';
import { Select } from '../../../ui/Select/Select';

export const CountryField = ({ type }: CountryFieldProps) => (
    <div className={styles.formGroup}>
        <Label htmlFor={`${type}-country`} required>
            Country
        </Label>

        <Select name={`${type}-country`}>
            <option value="usa">United States</option>
            <option value="canada">Canada</option>
        </Select>
    </div>
);
