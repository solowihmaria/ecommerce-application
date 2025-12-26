export enum CountryCode {
    FR = 'FR',
    DE = 'DE',
    IT = 'IT',
}

export type AddressType = 'shipping' | 'billing';

export interface Address {
    id?: string;
    key?: string;
    streetName: string;
    postalCode: string;
    city: string;
    country: CountryCode;
    type?: AddressType;
    isDefault?: boolean;
}

export interface BaseCustomer {
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth?: string; // Опционально в профиле, но обязательно при регистрации
    addresses: Address[];
    defaultShippingAddressId?: string | null;
    defaultBillingAddressId?: string | null;
}
