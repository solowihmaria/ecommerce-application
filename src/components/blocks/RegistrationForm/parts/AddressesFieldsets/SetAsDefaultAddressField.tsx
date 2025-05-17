import React from 'react';
import { Input } from '../../../../ui/Input';
import { Label } from '../../../../ui/Label';
import styles from '../../RegistrationForm.module.scss';
import type { addressFieldProps } from '../../Registration.types';

export const SetAsDefaultAddressField = ({ type }: addressFieldProps) => (
    <div className={styles.checkboxWrapper}>
        <Input id={`${type}-default`} type="checkbox" />

        <Label htmlFor={`${type}-default`}>Set {type} address as default</Label>
    </div>
);
