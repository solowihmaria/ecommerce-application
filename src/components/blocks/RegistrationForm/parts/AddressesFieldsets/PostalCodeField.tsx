import { useFormContext } from 'react-hook-form';
import { Input } from '../../../../ui/Input';
import { Label } from '../../../../ui/Label';
import type { addressFieldProps } from '../../Registration.types';

export const PostalCodeField = ({
    type,
    error,
    disabled,
}: addressFieldProps) => {
    const { register } = useFormContext();

    return (
        <div>
            <Label htmlFor={`${type}Code`} required>
                Postal Code
            </Label>

            <Input
                id={`${type}Code`}
                type="text"
                autoComplete="postal-code"
                placeholder="Postal code"
                error={Boolean(error)}
                errorMessage={error?.message}
                disabled={disabled}
                {...register(`${type}Address.postalCode`)}
            />
        </div>
    );
};
