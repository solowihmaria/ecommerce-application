export interface PasswordFieldProps {
    showPassword: boolean;
    onTogglePassword: () => void;
}

export enum AddressType {
    shipping = 'shipping',
    billing = 'billing',
}

export interface StreetFieldProps {
    type: AddressType;
}

export interface CityFieldProps {
    type: AddressType;
}

export interface CountryFieldProps {
    type: AddressType;
}

export interface PostalCodeFieldProps {
    type: AddressType;
}

export interface SetAsDefaultFieldProps {
    type: AddressType;
}
