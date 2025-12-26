import { useFormContext } from 'react-hook-form';
import type { FieldError } from 'react-hook-form';
import { PasswordInput } from '../../../ui/Input/PasswordInput';
import { Label } from '../../../ui/Label';

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
        <div>
            <Label htmlFor="password" required>
                Password
            </Label>

            <PasswordInput
                id="password"
                placeholder="Create your password"
                error={Boolean(error)}
                errorMessage={error?.message}
                isPasswordVisible={isPasswordVisible}
                onVisibilityToggle={onTogglePassword}
                {...register('password')}
            />
        </div>
    );
};
