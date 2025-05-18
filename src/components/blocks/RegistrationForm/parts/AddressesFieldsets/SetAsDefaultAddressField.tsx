import { Input } from '../../../../ui/Input';
import { Label } from '../../../../ui/Label';
import styles from '../../RegistrationForm.module.scss';
import type { addressFieldProps } from '../../Registration.types';
import { useFormContext } from 'react-hook-form';

export const SetAsDefaultAddressField = ({ type }: addressFieldProps) => {
    const { register } = useFormContext();

    return (
        <div className={styles.checkboxWrapper}>
            <Input
                id={`${type}Default`}
                type="checkbox"
                {...register(`${type}Default`)}
            />

            <Label htmlFor={`${type}Default`}>
                Set {type} address as default
            </Label>
        </div>
    );
};
