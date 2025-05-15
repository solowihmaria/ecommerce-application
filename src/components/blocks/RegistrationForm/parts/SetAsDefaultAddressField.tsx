import React from 'react';
import { Input } from '../../../ui/Input';
import { Label } from '../../../ui/Label';
import styles from '../RegistrationForm.module.scss';
import type { SetAsDefaultAddressFieldProps } from '../Registration.types';

export const SetAsDefaultAddressField = ({
    type,
}: SetAsDefaultAddressFieldProps) => (
    <div className={styles.checkboxWrapper}>
        <Input id={`${type}-default`} type="checkbox" />

        <Label htmlFor={`${type}-default`}>Set {type} address as default</Label>
    </div>
);
