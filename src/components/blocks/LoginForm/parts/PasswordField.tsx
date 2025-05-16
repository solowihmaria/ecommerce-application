import React from 'react';
import type { PasswordFieldProps } from '../Login.types';
import { PasswordInput } from '../../../ui/Input/PasswordInput';
import { Label } from '../../../ui/Label';
import styles from '../LoginForm.module.scss';

export const PasswordField = ({ register, error }: PasswordFieldProps) => (
    <div className={styles.formGroup}>
        <Label htmlFor="password" required>
            Password
        </Label>

        <PasswordInput
            id="password"
            placeholder="Enter your password"
            error={Boolean(error)}
            errorMessage={error?.message}
            {...register('password')}
        />
    </div>
);
