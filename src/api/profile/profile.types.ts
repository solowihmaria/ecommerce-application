import type { BaseCustomer } from '../../types/customer.types';

export interface Customer extends BaseCustomer {
    id: string;
    version: number;
    billingAddressIds?: string[];
    shippingAddressIds?: string[];
}
