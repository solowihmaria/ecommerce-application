import { useState, useContext } from 'react';
import { deleteAddress } from '../../../../../api/profile/deleteAddress';
import { useAuth } from '../../../../../store/auth/useAuth';
import { ToastContext } from '../../../../ui/Toast/ToastContext';

export const useDeleteAddress = () => {
    const { customer, updateCustomer } = useAuth();
    const { showToast } = useContext(ToastContext);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deletingAddressId, setDeletingAddressId] = useState<string | null>(
        null
    );
    const [addressToDelete, setAddressToDelete] = useState<string | null>(null);

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
        } catch {
            showToast({
                message: 'Failed to delete address',
                variant: 'error',
            });
        } finally {
            setDeletingAddressId(null);
            setIsDeleteModalOpen(false);
            setAddressToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setIsDeleteModalOpen(false);
        setAddressToDelete(null);
    };

    return {
        isDeleteModalOpen,
        deletingAddressId,
        handleDeleteClick,
        handleConfirmDelete,
        handleCancelDelete,
    };
};
