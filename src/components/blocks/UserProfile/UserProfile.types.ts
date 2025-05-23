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

export type AddressType = 'shipping' | 'billing';

export interface Address {
    id: string;
    type: AddressType;
    streetName: string;
    city: string;
    country: CountryCode;
    postalCode: string;
    isDefault: boolean;
}

export interface AddressFormData {
    streetName: string;
    city: string;
    country: CountryCode;
    postalCode: string;
    isDefault: boolean;
    type: AddressType;
}
