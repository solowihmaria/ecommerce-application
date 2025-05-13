import React from 'react';
import { StreetField } from './StreetField';
import { AddressType } from '../Registration.types';
import { CityField } from './CityField';
import { PostalCodeField } from './PostalCodeField';
import { CountryField } from './CountryField';
import { SetAsDefaultAddressField } from './SetAsDefaultAddressField';
import styles from '../RegistrationForm.module.scss';
import clsx from 'clsx';

export const BillingAddressFieldSet = () => {
    const type: AddressType = AddressType.billing;

    return (
        <fieldset className={clsx(styles.fieldset, styles.grid4)}>
            <legend className={styles.legend}>Billing Address</legend>

            <StreetField type={type} />
            <CityField type={type} />
            <CountryField type={type} />
            <PostalCodeField type={type} />

            <div className={styles.checkboxesContainer}>
                <SetAsDefaultAddressField type={type} />
            </div>
        </fieldset>
    );
};
