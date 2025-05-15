import React from 'react';
import { Input } from '../../../ui/Input';
import { Label } from '../../../ui/Label';
import type { baseFieldProps } from '../Registration.types';

export const EmailField = ({ register, error }: baseFieldProps) => (
    <div className="formGroup">
        <Label htmlFor="email" required>
            Email
        </Label>

        <Input
            id="email"
            type="text"
            autoComplete="email"
            placeholder="Enter your email"
            error={Boolean(error)}
            errorMessage={error?.message}
            {...register('email')}
        />
    </div>
);
