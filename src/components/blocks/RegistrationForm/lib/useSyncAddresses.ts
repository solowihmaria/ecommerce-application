import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import type { RegistrationFormData } from '../Registration.types';

export const useSyncAddresses = () => {
    const { setValue } = useFormContext();

    const isBillingEqualsShipping = useWatch<RegistrationFormData>({
        name: 'isBillingEqualsShipping',
    });

    const shippingAddress = useWatch<RegistrationFormData, 'shippingAddress'>({
        name: 'shippingAddress',
    });

    const {
        streetName: shippingStreet,
        city: shippingCity,
        country: shippingCountry,
        postalCode: shippingCode,
    } = shippingAddress || {};

    useEffect(() => {
        const options = {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        };

        if (isBillingEqualsShipping) {
            setValue('billingAddress.streetName', shippingStreet, options);
            setValue('billingAddress.city', shippingCity, options);
            setValue('billingAddress.country', shippingCountry, options);
            setValue('billingAddress.postalCode', shippingCode, options);
        }
    }, [
        isBillingEqualsShipping,
        shippingStreet,
        shippingCity,
        shippingCountry,
        shippingCode,
        setValue,
    ]);
};
