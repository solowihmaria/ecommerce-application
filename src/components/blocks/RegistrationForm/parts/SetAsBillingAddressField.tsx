import React from 'react';
import { Input } from '../../../ui/Input';
import { Label } from '../../../ui/Label';
import styles from '../RegistrationForm.module.scss';

export const SetAsBillingAddressField = () => (
    <div className={styles.checkboxWrapper}>
        <Input id="bill-to-shipping-address" type="checkbox" />

        <Label htmlFor="bill-to-shipping-address">
            Bill to shipping address
        </Label>
    </div>
);
