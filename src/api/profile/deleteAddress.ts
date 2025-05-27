import axios from 'axios';
import type { Customer } from './profile.types';
import { getToken } from '../token';

export const deleteAddress = async (
    customerId: string,
    version: number,
    addressId: string,
    currentCustomer: Customer
): Promise<Customer> => {
    const actions = [];

    // на всякий случай сбрасываю дефолт и удаляю из списков, чтобы без непредвиденных ошибок

    if (currentCustomer.defaultShippingAddressId === addressId) {
        actions.push({
            action: 'setDefaultShippingAddress',
            addressId: null,
        });
    }
    if (currentCustomer.defaultBillingAddressId === addressId) {
        actions.push({
            action: 'setDefaultBillingAddress',
            addressId: null,
        });
    }

    if (currentCustomer.shippingAddressIds?.includes(addressId)) {
        actions.push({
            action: 'removeShippingAddressId',
            addressId,
        });
    }
    if (currentCustomer.billingAddressIds?.includes(addressId)) {
        actions.push({
            action: 'removeBillingAddressId',
            addressId,
        });
    }

    // сандартное удаление
    actions.push({
        action: 'removeAddress',
        addressId,
    });

    const response = await axios.post<Customer>(
        `${process.env.CTP_API_URL}/${process.env.CTP_PROJECT_KEY}/customers/${customerId}`,
        { version, actions },
        { headers: { Authorization: `Bearer ${getToken()}` } }
    );
    return response.data;
};
