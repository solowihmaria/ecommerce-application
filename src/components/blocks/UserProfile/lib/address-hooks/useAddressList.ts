import { useAuth } from '../../../../../store/auth/useAuth';
import { useEditAddress } from './useEditAddress';
import { useDeleteAddress } from './useDeleteAddress';

export const useAddressList = () => {
    const { customer } = useAuth();
    const {
        register,
        errors,
        isDirty,
        isLoading,
        editingAddressId,
        handleEdit,
        handleCancel,
        handleFormSubmit,
    } = useEditAddress();

    const {
        isDeleteModalOpen,
        deletingAddressId,
        handleDeleteClick,
        handleConfirmDelete,
        handleCancelDelete,
    } = useDeleteAddress();

    return {
        customer,
        register,
        errors,
        isDirty,
        isLoading,
        editingAddressId,
        isDeleteModalOpen,
        deletingAddressId,
        handleEdit,
        handleCancel,
        handleFormSubmit,
        handleDeleteClick,
        handleConfirmDelete,
        handleCancelDelete,
    };
};
