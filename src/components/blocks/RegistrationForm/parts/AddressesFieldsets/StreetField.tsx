import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '../../../../ui/Input';
import { Label } from '../../../../ui/Label';
import type { addressFieldProps } from '../../Registration.types';

export const StreetField = ({ type, error, disabled }: addressFieldProps) => {
    const { register } = useFormContext();

    return (
        <div>
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
                disabled={disabled}
                {...register(`${type}Address.streetName`)}
            />
        </div>
    );
};
