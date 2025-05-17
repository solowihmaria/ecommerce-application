import React from 'react';
import { useFormContext } from 'react-hook-form';
import type { FieldError } from 'react-hook-form';
import { Input } from '../../../../ui/Input';
import { Label } from '../../../../ui/Label';

export const BirthDateField = ({ error }: { error?: FieldError }) => {
    const { register } = useFormContext();

    return (
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
};
