import React from 'react';
import { Input } from '../../../ui/Input';
import { Label } from '../../../ui/Label';
import type { baseFieldProps } from '../Registration.types';

export const FirstNameField = ({ register, error }: baseFieldProps) => (
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
