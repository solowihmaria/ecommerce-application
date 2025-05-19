import { useFormContext } from 'react-hook-form';
import type { FieldError } from 'react-hook-form';
import { Input } from '../../../../ui/Input';
import { Label } from '../../../../ui/Label';

export const LastNameField = ({ error }: { error?: FieldError }) => {
    const { register } = useFormContext();

    return (
        <div>
            <Label htmlFor="lastName" required>
                Last Name
            </Label>

            <Input
                id="lastName"
                type="text"
                autoComplete="family-name"
                placeholder="Your last name"
                error={Boolean(error)}
                errorMessage={error?.message}
                {...register('lastName')}
            />
        </div>
    );
};
