import React from 'react';
import { useFormContext } from 'react-hook-form';
import type { addressFieldProps } from '../../Registration.types';
import { Label } from '../../../../ui/Label/Label';
import { Select } from '../../../../ui/Select/Select';
import { CountryCode } from '../../../../../api/createCustomer/createCustomer.types';

export const CountryField = ({ type, disabled }: addressFieldProps) => {
    const { register } = useFormContext();

    return (
        <div>
            <Label htmlFor={`${type}Country`} required>
                Country
            </Label>

            <Select disabled={disabled} {...register(`${type}Address.country`)}>
                <option value={CountryCode.FR}>France</option>
                <option value={CountryCode.DE}>Germany</option>
                <option value={CountryCode.FR}>Italy</option>
            </Select>
        </div>
    );
};
