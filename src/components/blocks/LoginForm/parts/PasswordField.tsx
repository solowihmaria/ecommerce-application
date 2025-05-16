import React from 'react';
import { useFormContext } from 'react-hook-form';
import { PasswordInput } from '../../../ui/Input';
import { Label } from '../../../ui/Label';
import styles from '../LoginForm.module.scss';
import type { FieldError } from 'react-hook-form';

interface PasswordFieldProps {
    error?: FieldError;
    showPassword: boolean;
    onTogglePassword: () => void;
}

export const PasswordField = ({
    error,
    showPassword,
    onTogglePassword,
}: PasswordFieldProps) => {
    const { register } = useFormContext();

    return (
        <div className={styles.formGroup}>
            <Label htmlFor="password" required>
                Password
            </Label>
            <PasswordInput
                id="password"
                placeholder="Enter your password"
                error={!!error}
                errorMessage={error?.message}
                showPassword={showPassword}
                onTogglePassword={onTogglePassword}
                {...register('password')}
            />
        </div>
    );
};
