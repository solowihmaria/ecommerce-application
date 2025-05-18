import { StreetField } from './StreetField';
import { AddressType } from '../../Registration.types';
import type { FormPartProps } from '../../Registration.types';
import { CityField } from './CityField';
import { PostalCodeField } from './PostalCodeField';
import { CountryField } from './CountryField';
import { SetAsDefaultAddressField } from './SetAsDefaultAddressField';
import { SetAsBillingAddressField } from './SetAsBillingAddressField';
import styles from '../../RegistrationForm.module.scss';
import clsx from 'clsx';

export const ShippingAddressFieldSet = ({ errors }: FormPartProps) => {
    const type: AddressType = AddressType.shipping;

    return (
        <fieldset className={clsx(styles.fieldset, styles.addressInfo)}>
            <legend className={styles.legend}>Shipping Address</legend>

            <StreetField
                type={type}
                error={errors?.shippingAddress?.streetName}
            />
            <CityField type={type} error={errors?.shippingAddress?.city} />
            <CountryField type={type} />
            <PostalCodeField
                type={type}
                error={errors?.shippingAddress?.postalCode}
            />

            <div className={styles.checkboxesContainer}>
                <SetAsDefaultAddressField type={type} />
                <SetAsBillingAddressField />
            </div>
        </fieldset>
    );
};
