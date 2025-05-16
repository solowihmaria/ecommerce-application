import React from 'react';
import { PasswordInput } from '../../../ui/Input/PasswordInput';
import { Label } from '../../../ui/Label';
import type { PasswordFieldProps } from '../Registration.types';

export const PasswordField = ({ register, error }: PasswordFieldProps) => (
    <div className="formGroup">
        <Label htmlFor="password" required>
            Password
        </Label>

        <PasswordInput
            id="password"
            placeholder="Create your password"
            error={Boolean(error)}
            errorMessage={error?.message}
            {...register('password')}
        />
    </div>
);
