import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addressSchema } from '../parts/AddressList/address.validation';
import type { AddressFormData } from '../UserProfile.types';
import type { Address } from '../../../../api/profile/profile.types';
import { updateAddress } from '../../../../api/profile/changeAddress';
import { useAuth } from '../../../../store/auth/useAuth';
import { ToastContext } from '../../../ui/Toast/ToastContext';
import { useContext } from 'react';

export const useAddressList = () => {
    const { customer, updateCustomer } = useAuth();
    const { showToast } = useContext(ToastContext);
    const [editingAddressId, setEditingAddressId] = useState<string | null>(
        null
    );
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty },
    } = useForm<AddressFormData>({
        resolver: yupResolver(addressSchema),
        mode: 'onChange',
    });

    const handleEdit = (address: Address) => {
        reset({
            streetName: address.streetName,
            postalCode: address.postalCode,
            city: address.city,
            country: address.country,
            isDefault: address.isDefault || false,
            type: address.type || 'shipping',
        });
        setEditingAddressId(address.id);
    };

    const handleCancel = () => {
        setEditingAddressId(null);
    };

    const onSubmit = async (data: AddressFormData) => {
        if (!customer || !editingAddressId) {
            return;
        }

        setIsLoading(true);
        try {
            const updatedCustomer = await updateAddress(
                customer.id,
                customer.version,
                editingAddressId,
                data
            );

            updateCustomer(updatedCustomer);
            setEditingAddressId(null);
            showToast({
                message: 'Address updated successfully!',
                variant: 'success',
            });
        } catch (error) {
            console.error('Failed to update address:', error);
            showToast({
                message: 'Failed to update address',
                variant: 'error',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        void handleSubmit(onSubmit)();
    };

    return {
        customer,
        editingAddressId,
        isLoading,
        errors,
        isDirty,
        register,
        handleEdit,
        handleCancel,
        handleFormSubmit,
    };
};
