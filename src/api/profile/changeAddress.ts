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
    const currentType =
        addressData.type ||
        (currentCustomer.billingAddressIds?.includes(addressId)
            ? 'billing'
            : 'shipping');

    // 3. Управление типом адреса
    if (addressData.type) {
        const isCurrentlyBilling =
            currentCustomer.billingAddressIds?.includes(addressId);
        const isCurrentlyShipping =
            currentCustomer.shippingAddressIds?.includes(addressId);

        // Удаление из противоположного типа
        if (addressData.type === 'shipping' && isCurrentlyBilling) {
            actions.push({ action: 'removeBillingAddressId', addressId });
        } else if (addressData.type === 'billing' && isCurrentlyShipping) {
            actions.push({ action: 'removeShippingAddressId', addressId });
        }

        // Добавление в новый тип (если нужно)
        if (
            (addressData.type === 'shipping' && !isCurrentlyShipping) ||
            (addressData.type === 'billing' && !isCurrentlyBilling)
        ) {
            const actionType =
                addressData.type === 'shipping'
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
        // Снятие дефолтного статуса
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
    } else if (addressData.isDefault && currentType) {
        // Установка нового дефолтного адреса
        const setAction =
            currentType === 'shipping'
                ? 'setDefaultShippingAddress'
                : 'setDefaultBillingAddress';

        // Сначала сбрасываем старый дефолтный адрес этого типа
        if (
            currentType === 'shipping' &&
            currentCustomer.defaultShippingAddressId
        ) {
            actions.push({
                action: 'setDefaultShippingAddress',
                addressId: null,
            });
        } else if (
            currentType === 'billing' &&
            currentCustomer.defaultBillingAddressId
        ) {
            actions.push({
                action: 'setDefaultBillingAddress',
                addressId: null,
            });
        }

        // Затем устанавливаем новый
        actions.push({ action: setAction, addressId });
    }

    const response = await axios.post<Customer>(
        `${process.env.CTP_API_URL}/${process.env.CTP_PROJECT_KEY}/customers/${customerId}`,
        { version, actions },
        { headers: { Authorization: `Bearer ${getToken()}` } }
    );

    return response.data;
};
