import type { BaseCustomer } from '../../types/customer.types';

export interface Customer extends BaseCustomer {
    password: string;
    customerNumber?: string;
    shippingAddresses: number[];
    billingAddresses: number[];
}

export interface CreateCustomerResponse {
    customer: Customer;
    cart?: string;
}
