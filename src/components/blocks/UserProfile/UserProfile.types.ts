import type { CountryCode } from '../../../api/createCustomer/createCustomer.types';

export interface PersonalData {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
}

export interface PasswordFormData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface AddressFormData {
    streetName: string;
    postalCode: string;
    city: string;
    country: CountryCode;
    isDefault: boolean;
    type: 'shipping' | 'billing';
}
