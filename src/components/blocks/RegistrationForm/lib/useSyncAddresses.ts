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
        if (isBillingEqualsShipping) {
            setValue('billingAddress.streetName', shippingStreet);
            setValue('billingAddress.city', shippingCity);
            setValue('billingAddress.country', shippingCountry);
            setValue('billingAddress.postalCode', shippingCode);
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
