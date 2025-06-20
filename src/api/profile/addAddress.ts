import axios from 'axios';
import type { Customer } from './profile.types';
import type { Address } from '../../types/customer.types';
import { getToken } from '../token';

type AddressAction =
    | {
          action: 'addAddress';
          address: {
              streetName: string;
              postalCode: string;
              city: string;
              country: string;
          };
      }
    | {
          action: 'addShippingAddressId' | 'addBillingAddressId';
          addressId: string;
      }
    | {
          action: 'setDefaultShippingAddress' | 'setDefaultBillingAddress';
          addressId: string | null;
      };

export const addAddress = async (
    customerId: string,
    version: number,
    addressData: Omit<Address, 'id'> & {
        type?: 'shipping' | 'billing';
        isDefault?: boolean;
    }
): Promise<Customer> => {
    const createResponse = await axios.post<Customer>(
        `${process.env.CTP_API_URL}/${process.env.CTP_PROJECT_KEY}/customers/${customerId}`,
        {
            version,
            actions: [
                {
                    action: 'addAddress',
                    address: {
                        streetName: addressData.streetName,
                        postalCode: addressData.postalCode,
                        city: addressData.city,
                        country: addressData.country,
                    },
                },
            ],
        },
        { headers: { Authorization: `Bearer ${getToken()}` } }
    );

    const newAddressId =
        createResponse.data.addresses[createResponse.data.addresses.length - 1]
            .id;
    const newVersion = createResponse.data.version;

    const actions: AddressAction[] = [];

    if (addressData.type && newAddressId) {
        actions.push({
            action:
                addressData.type === 'shipping'
                    ? 'addShippingAddressId'
                    : 'addBillingAddressId',
            addressId: newAddressId,
        });
    }

    if (addressData.isDefault && addressData.type && newAddressId) {
        actions.push({
            action:
                addressData.type === 'shipping'
                    ? 'setDefaultShippingAddress'
                    : 'setDefaultBillingAddress',
            addressId: newAddressId,
        });
    }

    if (actions.length > 0) {
        const updateResponse = await axios.post<Customer>(
            `${process.env.CTP_API_URL}/${process.env.CTP_PROJECT_KEY}/customers/${customerId}`,
            { version: newVersion, actions },
            { headers: { Authorization: `Bearer ${getToken()}` } }
        );
        return updateResponse.data;
    }

    return createResponse.data;
};
