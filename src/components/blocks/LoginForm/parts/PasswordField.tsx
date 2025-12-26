import { useFormContext } from 'react-hook-form';
import { PasswordInput } from '../../../ui/Input';
import { Label } from '../../../ui/Label';
import styles from '../LoginForm.module.scss';
import type { FieldError } from 'react-hook-form';

interface PasswordFieldProps {
    error?: FieldError;
    isPasswordVisible: boolean;
    onTogglePassword: () => void;
}

export const PasswordField = ({
    error,
    isPasswordVisible,
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
                isPasswordVisible={isPasswordVisible}
                onVisibilityToggle={onTogglePassword}
                {...register('password')}
            />
        </div>
    );
};
