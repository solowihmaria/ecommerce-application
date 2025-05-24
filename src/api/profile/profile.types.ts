export interface Customer {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth?: string;
    addresses: Address[];
    billingAddressIds?: string[];
    shippingAddressIds?: string[];
    version: number;
}

export interface Address {
    id: string;
    streetName: string;
    postalCode: string;
    city: string;
    country: string;
}
