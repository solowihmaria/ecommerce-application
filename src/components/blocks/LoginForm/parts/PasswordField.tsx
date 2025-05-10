import React from 'react';
import type { PasswordFieldProps } from '../Login.types';
import { Input } from '../../../ui/Input';
import { Label } from '../../../ui/Label';

export const PasswordField = ({
    register,
    error,
    showPassword,
    onTogglePassword,
}: PasswordFieldProps) => (
    <div className="form-group">
        <Label htmlFor="password" required>
            Password
        </Label>
        <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            error={Boolean(error)}
            errorMessage={error?.message}
            hasPasswordToggle
            showPassword={showPassword}
            onTogglePassword={onTogglePassword}
            {...register('password')}
        />
    </div>
);
