import React from 'react';
import type { EmailFieldProps } from '../Login.types';
import { Input } from '../../../ui/Input';
import { Label } from '../../../ui/Label';

export const EmailField = ({ register, error }: EmailFieldProps) => (
    <div className="formGroup">
        <Label htmlFor="email" required>
            Email
        </Label>
        <Input
            id="email"
            type="text"
            autoComplete="email"
            error={Boolean(error)}
            errorMessage={error?.message}
            {...register('email')}
        />
    </div>
);
