import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '../../../../ui/Input';
import { Label } from '../../../../ui/Label';
import styles from '../../RegistrationForm.module.scss';
import type { addressFieldProps } from '../../Registration.types';

export const CityField = ({ type, error }: addressFieldProps) => {
    const { register } = useFormContext();

    return (
        <div className={styles.formGroup}>
            <Label htmlFor={`${type}City`} required>
                City
            </Label>

            <Input
                id={`${type}City`}
                type="text"
                autoComplete="address-level2"
                placeholder="City"
                error={Boolean(error)}
                errorMessage={error?.message}
                {...register(`${type}City`)}
            />
        </div>
    );
};
