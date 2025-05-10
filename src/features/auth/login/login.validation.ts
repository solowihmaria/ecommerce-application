import * as yup from 'yup';

export const loginSchema = yup.object().shape({
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

    password: yup
        .string()
        .required('Password is required')
        .test(
            'no-spaces',
            'Password must not contain leading or trailing spaces',
            (value) => !value || value === value.trim()
        )
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /[A-Z]/,
            'Password must contain at least one uppercase letter (A-Z)'
        )
        .matches(
            /[a-z]/,
            'Password must contain at least one lowercase letter (a-z)'
        )
        .matches(/\d/, 'Password must contain at least one digit (0-9)')
        .matches(
            /[!#$%&*@^]/,
            'Password must contain at least one special character (!#$%&*@^)'
        ),
});
