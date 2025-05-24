import * as yup from 'yup';
import type { CountryCode } from '../../../../../api/createCustomer/createCustomer.types';
import type { AddressType } from '../../UserProfile.types';

const ruleForStreet = yup
    .string()
    .required('Street is required')
    .min(1, 'Street must be at least 1 character');

const ruleForCity = yup
    .string()
    .required('City is required')
    .min(1, 'City must be at least 1 character')
    .matches(
        /^[A-Za-zÀ-ÿ\s'-]+$/,
        'City must only contain letters, spaces, apostrophes, or hyphens'
    );

const ruleForCountry = yup.mixed<CountryCode>().required('Country is required');

const ruleForPostalCode = yup
    .string()
    .required('Postal code is required')
    .matches(/^\d{5}$/, 'Postal code must be exactly 5 digits');

export const addressSchema = yup.object().shape({
    streetName: ruleForStreet,
    city: ruleForCity,
    country: ruleForCountry,
    postalCode: ruleForPostalCode,
    isDefault: yup.boolean().required(),
    type: yup
        .mixed<AddressType>()
        .oneOf(['shipping', 'billing'])
        .required('Address type is required'),
});
