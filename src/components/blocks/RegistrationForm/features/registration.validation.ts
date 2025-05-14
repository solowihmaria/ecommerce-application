import * as yup from 'yup';

const ruleForEmail = yup
    .string()
    .required('Email is required')
    .email('Email must be in format: user@example.com (no spaces allowed)');

const ruleForPassword = yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
        /[A-Z]/,
        'Password must contain at least one uppercase letter (A-Z)'
    )
    .matches(
        /[a-z]/,
        'Password must contain at least one lowercase letter (a-z)'
    )
    .matches(/\d/, 'Password must contain at least one digit (0-9)');

const ruleForBirthDate = yup
    .date()
    .transform((value: Date, originalValue: unknown): Date | undefined =>
        originalValue === '' ? undefined : value
    )
    .required('Date of birth is required')
    .max(
        new Date(Date.now() - 13 * 365 * 24 * 60 * 60 * 1000),
        'User must be older than 13 years'
    );

const ruleForNames = yup
    .string()
    .required('Name is required')
    .min(1, 'Name must be at least 1 character')
    .matches(
        /^[A-Za-z]+$/,
        'Name must not contain special characters or numbers'
    );

const ruleForStreet = yup
    .string()
    .required('Street is required')
    .min(1, 'Street must be at least 1 character');

const ruleForCity = yup
    .string()
    .required('City is required')
    .min(1, 'City must be at least 1 character')
    .matches(
        /^[A-Za-z]+$/,
        'City must not contain special characters or numbers'
    );

const ruleForPostalCode = yup
    .string()
    .required('Postal code is required')
    .matches(
        /^\d{5}(-\d{4})?$|^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/,
        'Invalid postal code'
    );

export const registrationSchema = yup.object().shape({
    email: ruleForEmail,
    password: ruleForPassword,

    firstName: ruleForNames,
    lastName: ruleForNames,
    birthDate: ruleForBirthDate,

    shippingStreet: ruleForStreet,
    shippingCity: ruleForCity,
    shippingCode: ruleForPostalCode,

    billingStreet: ruleForStreet,
    billingCity: ruleForCity,
    billingCode: ruleForPostalCode,
});
