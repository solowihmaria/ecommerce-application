import { useFormContext } from 'react-hook-form';
import type { FieldError } from 'react-hook-form';
import { Input } from '../../../../ui/Input';
import { Label } from '../../../../ui/Label';

export const DateOfBirthField = ({ error }: { error?: FieldError }) => {
    const { register } = useFormContext();

    return (
        <div>
            <Label htmlFor="dateOfBirth" required>
                Date of Birth
            </Label>

            <Input
                id="dateOfBirth"
                type="date"
                autoComplete="bday"
                error={Boolean(error)}
                errorMessage={error?.message}
                {...register('dateOfBirth')}
            />
        </div>
    );
};
