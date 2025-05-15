import React from 'react';
import { Input } from '../../../ui/Input';
import { Label } from '../../../ui/Label';
import type { baseFieldProps } from '../Registration.types';

export const LastNameField = ({ register, error }: baseFieldProps) => (
    <div>
        <Label htmlFor="lastName" required>
            Last Name
        </Label>

        <Input
            id="lastName"
            type="text"
            autoComplete="family-name"
            placeholder="Your last name"
            error={Boolean(error)}
            errorMessage={error?.message}
            {...register('lastName')}
        />
    </div>
);
