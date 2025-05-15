import React from 'react';
import { Input } from '../../../ui/Input';
import { Label } from '../../../ui/Label';
import type { baseFieldProps } from '../Registration.types';

export const BirthDateField = ({ register, error }: baseFieldProps) => (
    <div>
        <Label htmlFor="birthDate" required>
            Date of Birth
        </Label>

        <Input
            id="birthDate"
            type="date"
            autoComplete="bday"
            placeholder="Enter your date of birth"
            error={Boolean(error)}
            errorMessage={error?.message}
            {...register('birthDate')}
        />
    </div>
);
