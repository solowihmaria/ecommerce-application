import axios from 'axios';
import type { Customer } from './profile.types';
import type { Address } from '../../types/customer.types';
import { getToken } from '../token';

export const updateAddress = async (
    customerId: string,
    version: number,
    addressId: string,
    addressData: Partial<Address> & {
        type?: 'shipping' | 'billing';
        isDefault?: boolean;
    },
    currentCustomer: Customer
): Promise<Customer> => {
    const actions = [];

    // 1. Изменение основных данных адреса
    actions.push({
        action: 'changeAddress',
        addressId,
        address: {
            streetName: addressData.streetName,
            postalCode: addressData.postalCode,
            city: addressData.city,
            country: addressData.country || 'DE',
        },
    });

    // 2. Определение текущего типа адреса
    const wasBilling = currentCustomer.billingAddressIds?.includes(addressId);
    const wasShipping = currentCustomer.shippingAddressIds?.includes(addressId);
    const oldType = wasBilling ? 'billing' : 'shipping';

    const newType = addressData.type || oldType;

    // 3. Управление типом адреса
    if (addressData.type) {
        // Удаление из противоположного типа
        if (newType === 'shipping' && wasBilling) {
            actions.push({ action: 'removeBillingAddressId', addressId });
        } else if (newType === 'billing' && wasShipping) {
            actions.push({ action: 'removeShippingAddressId', addressId });
        }

        // Добавление в нужный тип, если его там нет
        if (
            (newType === 'shipping' && !wasShipping) ||
            (newType === 'billing' && !wasBilling)
        ) {
            const actionType =
                newType === 'shipping'
                    ? 'addShippingAddressId'
                    : 'addBillingAddressId';
            actions.push({ action: actionType, addressId });
        }
    }

    // 4. Управление дефолтным статусом
    const wasDefaultShipping =
        currentCustomer.defaultShippingAddressId === addressId;
    const wasDefaultBilling =
        currentCustomer.defaultBillingAddressId === addressId;

    if (!addressData.isDefault) {
        if (wasDefaultShipping) {
            actions.push({
                action: 'setDefaultShippingAddress',
                addressId: null,
            });
        }
        if (wasDefaultBilling) {
            actions.push({
                action: 'setDefaultBillingAddress',
                addressId: null,
            });
        }
    } else if (addressData.isDefault && newType) {
        const setAction =
            newType === 'shipping'
                ? 'setDefaultShippingAddress'
                : 'setDefaultBillingAddress';

        actions.push({ action: setAction, addressId });
    }

    const response = await axios.post<Customer>(
        `${process.env.CTP_API_URL}/${process.env.CTP_PROJECT_KEY}/customers/${customerId}`,
        { version, actions },
        { headers: { Authorization: `Bearer ${getToken()}` } }
    );

    return response.data;
};
