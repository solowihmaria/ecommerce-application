import * as yup from 'yup';

const nameValidationRule = yup
    .string()
    .required('Name is required')
    .min(1, 'Name must be at least 1 character')
    .matches(
        /^[A-Za-z]+$/,
        'Name must not contain special characters or numbers'
    );

export const personalInfoSchema = yup.object().shape({
    firstName: nameValidationRule,
    lastName: nameValidationRule,
    email: yup
        .string()
        .required('Email is required')
        .test(
            'no-spaces',
            'Email must not contain leading or trailing spaces',
            (value) => !value || value === value.trim()
        )
        .test(
            'contains-at-and-domain',
            'Email must be in format: user@example.com (no spaces allowed)',
            (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || '')
        ),
    dateOfBirth: yup
        .string()
        .required('Date of birth is required')
        .test('is-valid-date', 'You must be at least 13 years old', (value) => {
            if (!value) {
                return false;
            }
            const date = new Date(value);
            const minDate = new Date(
                Date.now() - 13 * 365 * 24 * 60 * 60 * 1000
            );
            return date <= minDate;
        }),
});
