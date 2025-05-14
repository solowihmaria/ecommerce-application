import React from 'react';
import { Input } from '../../../ui/Input';
import { Label } from '../../../ui/Label';
import type { PasswordFieldProps } from '../Registration.types';

export const PasswordField = ({
    register,
    error,
    showPassword,
    onTogglePassword,
}: PasswordFieldProps) => (
    <div className="formGroup">
        <Label htmlFor="password" required>
            Password
        </Label>

        <Input
            id="password"
            type="password"
            placeholder="Create your password"
            error={Boolean(error)}
            errorMessage={error?.message}
            hasPasswordToggle
            showPassword={showPassword}
            onTogglePassword={onTogglePassword}
            {...register('password')}
        />
    </div>
);
