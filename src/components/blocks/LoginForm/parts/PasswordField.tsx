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
    <div className="formGroup">
        <Label htmlFor="password" required>
            Password
        </Label>
        <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            error={Boolean(error)}
            errorMessage={error?.message}
            hasPasswordToggle
            showPassword={showPassword}
            onTogglePassword={onTogglePassword}
            {...register('password')}
        />
    </div>
);
