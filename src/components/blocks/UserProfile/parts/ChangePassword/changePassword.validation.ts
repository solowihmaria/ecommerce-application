import * as yup from 'yup';

const passwordRule = yup
    .string()
    .required('Password is required')
    .test(
        'no-spaces',
        'Password must not contain leading or trailing spaces',
        (value) => !value || value === value.trim()
    )
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter (A-Z)')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter (a-z)')
    .matches(/\d/, 'Must contain at least one digit (0-9)');

export const changePasswordSchema = yup.object().shape({
    currentPassword: passwordRule,
    newPassword: passwordRule,
    confirmPassword: yup
        .string()
        .required('Please confirm your password')
        .oneOf([yup.ref('newPassword')], 'Passwords must match'),
});
