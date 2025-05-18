import React from 'react';
import { StreetField } from './StreetField';
import { AddressType } from '../../Registration.types';
import { CityField } from './CityField';
import { PostalCodeField } from './PostalCodeField';
import { CountryField } from './CountryField';
import { SetAsDefaultAddressField } from './SetAsDefaultAddressField';
import styles from '../../RegistrationForm.module.scss';
import clsx from 'clsx';
import type {
    FormPartProps,
    RegistrationFormData,
} from '../../Registration.types';
import { useSyncAddresses } from '../../lib/useSyncAddresses';
import { useFormContext } from 'react-hook-form';

export const BillingAddressFieldSet = ({ errors }: FormPartProps) => {
    const type: AddressType = AddressType.billing;

    const { watch } = useFormContext<RegistrationFormData>();
    const isBillingEqualsShipping = watch('isBillingEqualsShipping');

    useSyncAddresses();

    return (
        <fieldset className={clsx(styles.fieldset, styles.addressInfo)}>
            <legend className={styles.legend}>Billing Address</legend>

            <StreetField
                type={type}
                error={errors?.billingAddress?.streetName}
                disabled={isBillingEqualsShipping}
            />
            <CityField
                type={type}
                error={errors?.billingAddress?.city}
                disabled={isBillingEqualsShipping}
            />
            <CountryField type={type} disabled={isBillingEqualsShipping} />
            <PostalCodeField
                type={type}
                error={errors?.billingAddress?.postalCode}
                disabled={isBillingEqualsShipping}
            />

            <div className={styles.checkboxesContainer}>
                <SetAsDefaultAddressField type={type} />
            </div>
        </fieldset>
    );
};
