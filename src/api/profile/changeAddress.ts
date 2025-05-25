import axios from 'axios';
import type { Address, Customer } from './profile.types';
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

    // 1. Изменение данных адреса
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

    // 2. Управление типом адреса (billing/shipping)
    if (addressData.type) {
        const isCurrentlyBilling =
            currentCustomer.billingAddressIds?.includes(addressId);
        const isCurrentlyShipping =
            currentCustomer.shippingAddressIds?.includes(addressId);

        // Удаляем из противоположного типа
        if (addressData.type === 'shipping' && isCurrentlyBilling) {
            actions.push({
                action: 'removeBillingAddressId',
                addressId,
            });
        } else if (addressData.type === 'billing' && isCurrentlyShipping) {
            actions.push({
                action: 'removeShippingAddressId',
                addressId,
            });
        }

        // Добавляем в новый тип (если его там ещё нет)
        const shouldAddToNewType =
            (addressData.type === 'shipping' && !isCurrentlyShipping) ||
            (addressData.type === 'billing' && !isCurrentlyBilling);

        if (shouldAddToNewType) {
            const actionType =
                addressData.type === 'shipping'
                    ? 'addShippingAddressId'
                    : 'addBillingAddressId';
            actions.push({ action: actionType, addressId });
        }

        // Сбрасываем дефолтный статус при смене типа
        if (
            currentCustomer.defaultShippingAddressId === addressId &&
            addressData.type === 'billing'
        ) {
            actions.push({
                action: 'setDefaultShippingAddress',
                addressId: null,
            });
        }
        if (
            currentCustomer.defaultBillingAddressId === addressId &&
            addressData.type === 'shipping'
        ) {
            actions.push({
                action: 'setDefaultBillingAddress',
                addressId: null,
            });
        }
    }

    // 3. Управление дефолтным статусом
    const currentType =
        addressData.type ||
        (currentCustomer.billingAddressIds?.includes(addressId)
            ? 'billing'
            : 'shipping');

    const isCurrentlyDefault =
        currentCustomer.defaultShippingAddressId === addressId ||
        currentCustomer.defaultBillingAddressId === addressId;

    // Если галочка снята и адрес был дефолтным
    if (!addressData.isDefault && isCurrentlyDefault) {
        const unsetAction =
            currentCustomer.defaultShippingAddressId === addressId
                ? 'setDefaultShippingAddress'
                : 'setDefaultBillingAddress';
        actions.push({ action: unsetAction, addressId: null });
    }
    // Если галочка поставлена
    else if (addressData.isDefault && currentType) {
        const setAction =
            currentType === 'shipping'
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
