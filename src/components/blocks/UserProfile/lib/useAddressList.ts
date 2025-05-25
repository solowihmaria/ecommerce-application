import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addressSchema } from '../parts/AddressList/address.validation';
import type { AddressFormData } from '../UserProfile.types';
import type { Address } from '../../../../api/profile/profile.types';
import { updateAddress } from '../../../../api/profile/changeAddress';
import { deleteAddress } from '../../../../api/profile/deleteAddress';
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
    const [deletingAddressId, setDeletingAddressId] = useState<string | null>(
        null
    );
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [addressToDelete, setAddressToDelete] = useState<string | null>(null);

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
        let currentType: 'shipping' | 'billing' = 'shipping';
        if (customer?.billingAddressIds?.includes(address.id)) {
            currentType = 'billing';
        }

        const isDefault =
            customer?.defaultShippingAddressId === address.id ||
            customer?.defaultBillingAddressId === address.id;

        reset({
            streetName: address.streetName,
            postalCode: address.postalCode,
            city: address.city,
            country: address.country,
            isDefault,
            type: currentType,
        });
        setEditingAddressId(address.id);
    };

    const handleCancel = () => {
        setEditingAddressId(null);
    };

    const handleDeleteClick = (addressId: string) => {
        setAddressToDelete(addressId);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!customer || !addressToDelete) {
            return;
        }

        setDeletingAddressId(addressToDelete);
        try {
            const updatedCustomer = await deleteAddress(
                customer.id,
                customer.version,
                addressToDelete,
                customer
            );

            updateCustomer(updatedCustomer);
            showToast({
                message: 'Address deleted successfully!',
                variant: 'success',
            });
        } catch (error) {
            console.error('Failed to delete address:', error);
            showToast({
                message: 'Failed to delete address: ',
                variant: 'error',
            });
        } finally {
            setDeletingAddressId(null);
            setIsDeleteModalOpen(false);
            setAddressToDelete(null);
        }
    };

    const handleCancelDelete = (): void => {
        setIsDeleteModalOpen(false);
        setAddressToDelete(null);
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
                {
                    ...data,
                    type: data.type,
                    isDefault: data.isDefault,
                },
                customer
            );

            const updatedCustomerWithDefaults = {
                ...updatedCustomer,
                defaultShippingAddressId:
                    data.isDefault && data.type === 'shipping'
                        ? editingAddressId
                        : updatedCustomer.defaultShippingAddressId ===
                            editingAddressId
                          ? null
                          : updatedCustomer.defaultShippingAddressId,
                defaultBillingAddressId:
                    data.isDefault && data.type === 'billing'
                        ? editingAddressId
                        : updatedCustomer.defaultBillingAddressId ===
                            editingAddressId
                          ? null
                          : updatedCustomer.defaultBillingAddressId,
            };

            updateCustomer(updatedCustomerWithDefaults);
            setEditingAddressId(null);
            showToast({ message: 'Address updated!', variant: 'success' });
        } catch (error) {
            console.error('Failed to update address:', error);
            showToast({
                message: 'Update failed: ',
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
        deletingAddressId,
        isDeleteModalOpen,
        errors,
        isDirty,
        register,
        handleEdit,
        handleCancel,
        handleDeleteClick,
        handleConfirmDelete,
        handleCancelDelete,
        handleFormSubmit,
    };
};
