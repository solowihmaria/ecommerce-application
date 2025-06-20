import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addressSchema } from '../../parts/AddressList/address.validation';
import { addAddress } from '../../../../../api/profile/addAddress';
import { useAuth } from '../../../../../store/auth/useAuth';
import { ToastContext } from '../../../../ui/Toast/ToastContext';
import { useContext } from 'react';
import type { AddressFormData } from '../../UserProfile.types';
import { CountryCode } from '../../../../../api/signup/createCustomer.types';

export const useAddAddress = () => {
    const { customer, updateCustomer } = useAuth();
    const { showToast } = useContext(ToastContext);
    const [isAdding, setIsAdding] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty },
    } = useForm<AddressFormData>({
        resolver: yupResolver(addressSchema),
        mode: 'onChange',
        defaultValues: {
            type: 'shipping',
            isDefault: false,
            country: CountryCode.DE,
        },
    });

    const openModal = () => {
        reset();
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const onSubmit = async (data: AddressFormData) => {
        if (!customer) {
            return;
        }

        setIsAdding(true);
        try {
            const updatedCustomer = await addAddress(
                customer.id,
                customer.version,
                {
                    ...data,
                    country: data.country,
                }
            );
            updateCustomer(updatedCustomer);
            showToast({ message: 'Address added!', variant: 'success' });
            closeModal();
        } catch {
            showToast({ message: 'Failed to add address', variant: 'error' });
        } finally {
            setIsAdding(false);
        }
    };

    return {
        register,
        errors,
        isDirty,
        isAdding,
        isModalOpen,
        openModal,
        closeModal,
        handleSubmit: handleSubmit(onSubmit),
    };
};
