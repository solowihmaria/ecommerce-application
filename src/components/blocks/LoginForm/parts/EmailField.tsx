import { useFormContext } from 'react-hook-form';
import { Input } from '../../../ui/Input';
import { Label } from '../../../ui/Label';
import styles from '../LoginForm.module.scss';
import type { FieldError } from 'react-hook-form';

export const EmailField = ({ error }: { error?: FieldError }) => {
    const { register } = useFormContext();

    return (
        <div className={styles.formGroup}>
            <Label htmlFor="email" required>
                Email
            </Label>
            <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                error={!!error}
                errorMessage={error?.message}
                {...register('email')}
            />
        </div>
    );
};
