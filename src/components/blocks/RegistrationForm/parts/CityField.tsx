import React from 'react';
import { Input } from '../../../ui/Input';
import { Label } from '../../../ui/Label';
import styles from '../RegistrationForm.module.scss';
import type { CityFieldProps } from '../Registration.types';

export const CityField = ({ type }: CityFieldProps) => (
    <div className={styles.formGroup}>
        <Label htmlFor={`${type}-city`} required>
            City
        </Label>

        <Input
            id={`${type}-city`}
            type="text"
            autoComplete="address-level2"
            placeholder="City"
        />
    </div>
);
