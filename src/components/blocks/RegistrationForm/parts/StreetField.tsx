import React from 'react';
import { Input } from '../../../ui/Input';
import { Label } from '../../../ui/Label';
import styles from '../RegistrationForm.module.scss';
import type { StreetFieldProps } from '../Registration.types';

export const StreetField = ({ type }: StreetFieldProps) => (
    <div className={styles.formGroup}>
        <Label htmlFor={`${type}-street`} required>
            Street
        </Label>

        <Input
            id={`${type}-street`}
            type="text"
            autoComplete="street-address"
            placeholder="Street"
        />
    </div>
);
