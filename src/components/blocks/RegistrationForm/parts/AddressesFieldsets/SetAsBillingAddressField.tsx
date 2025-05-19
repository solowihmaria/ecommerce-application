import { Input } from '../../../../ui/Input';
import { Label } from '../../../../ui/Label';
import styles from '../../RegistrationForm.module.scss';
import { useFormContext } from 'react-hook-form';

export const SetAsBillingAddressField = () => {
    const { register } = useFormContext();

    return (
        <div className={styles.checkboxWrapper}>
            <Input
                id="bill-to-shipping-address"
                type="checkbox"
                {...register('isBillingEqualsShipping')}
            />

            <Label htmlFor="bill-to-shipping-address">
                Bill to shipping address
            </Label>
        </div>
    );
};
