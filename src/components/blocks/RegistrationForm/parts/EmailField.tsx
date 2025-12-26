import { useFormContext } from 'react-hook-form';
import type { FieldError } from 'react-hook-form';
import { Input } from '../../../ui/Input';
import { Label } from '../../../ui/Label';

export const EmailField = ({ error }: { error?: FieldError }) => {
    const { register } = useFormContext();

    return (
        <div>
            <Label htmlFor="email" required>
                Email
            </Label>

            <Input
                id="email"
                type="text"
                autoComplete="email"
                placeholder="Enter your email"
                error={Boolean(error)}
                errorMessage={error?.message}
                {...register('email')}
            />
        </div>
    );
};
