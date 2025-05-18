import React from 'react';
import { StreetField } from './StreetField';
import { AddressType } from '../../Registration.types';
import { CityField } from './CityField';
import { PostalCodeField } from './PostalCodeField';
import { CountryField } from './CountryField';
import { SetAsDefaultAddressField } from './SetAsDefaultAddressField';
import styles from '../../RegistrationForm.module.scss';
import clsx from 'clsx';
import type { FormPartProps } from '../../Registration.types';

export const BillingAddressFieldSet = ({ errors }: FormPartProps) => {
    const type: AddressType = AddressType.billing;

    return (
        <fieldset className={clsx(styles.fieldset, styles.addressInfo)}>
            <legend className={styles.legend}>Billing Address</legend>

            <StreetField
                type={type}
                error={errors?.billingAddress?.streetName}
            />
            <CityField type={type} error={errors?.billingAddress?.city} />
            <CountryField type={type} />
            <PostalCodeField
                type={type}
                error={errors?.billingAddress?.postalCode}
            />

            <div className={styles.checkboxesContainer}>
                <SetAsDefaultAddressField type={type} />
            </div>
        </fieldset>
    );
};
