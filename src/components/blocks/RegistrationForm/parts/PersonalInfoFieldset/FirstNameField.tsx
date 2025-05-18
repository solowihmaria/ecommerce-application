import React from 'react';
import { useFormContext } from 'react-hook-form';
import type { FieldError } from 'react-hook-form';
import { Input } from '../../../../ui/Input';
import { Label } from '../../../../ui/Label';

export const FirstNameField = ({ error }: { error?: FieldError }) => {
    const { register } = useFormContext();

    return (
        <div>
            <Label htmlFor="firstName" required>
                First Name
            </Label>

            <Input
                id="firstName"
                type="text"
                autoComplete="name"
                placeholder="Your first name"
                error={Boolean(error)}
                errorMessage={error?.message}
                {...register('firstName')}
            />
        </div>
    );
};
