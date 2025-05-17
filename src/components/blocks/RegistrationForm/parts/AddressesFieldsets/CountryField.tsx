import React from 'react';
import styles from '../../RegistrationForm.module.scss';
import type { addressFieldProps } from '../../Registration.types';
import { Label } from '../../../../ui/Label/Label';
import { Select } from '../../../../ui/Select/Select';

export const CountryField = ({ type }: addressFieldProps) => (
    <div className={styles.formGroup}>
        <Label htmlFor={`${type}Country`} required>
            Country
        </Label>

        <Select name={`${type}Country`}>
            <option value="france">France</option>
            <option value="germany">Germany</option>
            <option value="italy">Italy</option>
        </Select>
    </div>
);
