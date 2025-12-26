import { useAuth } from '../../../../../store/auth/useAuth';
import { useEditAddress } from './useEditAddress';
import { useDeleteAddress } from './useDeleteAddress';
import { useAddAddress } from './useAddAddress';

export const useAddressList = () => {
    const { customer } = useAuth();

    const editAddress = useEditAddress();
    const deleteAddress = useDeleteAddress();
    const addAddress = useAddAddress();

    return {
        customer,
        // Редактирование адреса
        register: editAddress.register,
        errors: editAddress.errors,
        isDirty: editAddress.isDirty,
        isLoading: editAddress.isLoading,
        editingAddressId: editAddress.editingAddressId,
        handleEdit: editAddress.handleEdit,
        handleCancel: editAddress.handleCancel,
        handleFormSubmit: editAddress.handleFormSubmit,

        // Удаление адреса
        isDeleteModalOpen: deleteAddress.isDeleteModalOpen,
        deletingAddressId: deleteAddress.deletingAddressId,
        handleDeleteClick: deleteAddress.handleDeleteClick,
        handleConfirmDelete: deleteAddress.handleConfirmDelete,
        handleCancelDelete: deleteAddress.handleCancelDelete,

        // Добавление адреса
        isAdding: addAddress.isAdding,
        isAddModalOpen: addAddress.isModalOpen,
        openAddModal: addAddress.openModal,
        closeAddModal: addAddress.closeModal,
        handleAddSubmit: addAddress.handleSubmit,
        addErrors: addAddress.errors,
        addIsDirty: addAddress.isDirty,
        addRegister: addAddress.register,
    };
};
