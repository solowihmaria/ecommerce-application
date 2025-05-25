import type { CountryCode } from '../createCustomer/createCustomer.types';

export interface Customer {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth?: string;
    addresses: Address[];
    billingAddressIds?: string[];
    shippingAddressIds?: string[];
    defaultShippingAddressId?: string;
    defaultBillingAddressId?: string;
    version: number;
}

export type AddressType = 'shipping' | 'billing';

export interface Address {
    id: string;
    streetName: string;
    postalCode: string;
    city: string;
    country: CountryCode;
    type?: AddressType;
    isDefault?: boolean;
}
