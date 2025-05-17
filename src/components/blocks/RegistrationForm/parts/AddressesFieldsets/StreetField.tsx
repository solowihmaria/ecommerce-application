import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '../../../../ui/Input';
import { Label } from '../../../../ui/Label';
import styles from '../../RegistrationForm.module.scss';
import type { addressFieldProps } from '../../Registration.types';

export const StreetField = ({ type, error }: addressFieldProps) => {
    const { register } = useFormContext();

    return (
        <div className={styles.formGroup}>
            <Label htmlFor={`${type}Street`} required>
                Street
            </Label>

            <Input
                id={`${type}Street`}
                type="text"
                autoComplete="street-address"
                placeholder="Street"
                error={Boolean(error)}
                errorMessage={error?.message}
                {...register(`${type}Street`)}
            />
        </div>
    );
};
