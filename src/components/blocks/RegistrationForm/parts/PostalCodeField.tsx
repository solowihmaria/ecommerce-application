import React from 'react';
import { Input } from '../../../ui/Input';
import { Label } from '../../../ui/Label';
import styles from '../RegistrationForm.module.scss';
import type { PostalCodeFieldProps } from '../Registration.types';

export const PostalCodeField = ({ type }: PostalCodeFieldProps) => (
    <div className={styles.formGroup}>
        <Label htmlFor={`${type}-code`} required>
            Postal Code
        </Label>

        <Input
            id={`${type}-code`}
            type="text"
            autoComplete="postal-code"
            placeholder="Postal code"
        />
    </div>
);
