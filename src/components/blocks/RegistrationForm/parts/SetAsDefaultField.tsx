import React from 'react';
import { Input } from '../../../ui/Input';
import { Label } from '../../../ui/Label';
import styles from '../RegistrationForm.module.scss';
import type { SetAsDefaultFieldProps } from '../Registration.types';
import clsx from 'clsx';

export const SetAsDefaultField = ({ type }: SetAsDefaultFieldProps) => (
    <div className={clsx(styles.formGroup, styles.checkboxContainer)}>
        <Input id={`${type}-default`} type="checkbox" />

        <Label htmlFor={`${type}-default`}>Set {type} address as default</Label>
    </div>
);
