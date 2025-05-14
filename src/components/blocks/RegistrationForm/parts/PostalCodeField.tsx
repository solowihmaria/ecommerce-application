import React from 'react';
import { Input } from '../../../ui/Input';
import { Label } from '../../../ui/Label';
import styles from '../RegistrationForm.module.scss';
import type { addressFieldProps } from '../Registration.types';

export const PostalCodeField = ({
    type,
    register,
    error,
}: addressFieldProps) => (
    <div className={styles.formGroup}>
        <Label htmlFor={`${type}Code`} required>
            Postal Code
        </Label>

        <Input
            id={`${type}Code`}
            type="text"
            autoComplete="postal-code"
            placeholder="Postal code"
            error={Boolean(error)}
            errorMessage={error?.message}
            {...register(`${type}Code`)}
        />
    </div>
);
