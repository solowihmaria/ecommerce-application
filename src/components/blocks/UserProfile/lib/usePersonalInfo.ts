import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { personalInfoSchema } from '../parts/PersonalInfo/personalInfo.validation';
import type { PersonalData } from '../UserProfile.types';
import { useAuth } from '../../../../store/auth/useAuth';
import { updatePersonalData } from '../../../../api/profile/changePersonalData';
import { ToastContext } from '../../../ui/Toast/ToastContext';

export const usePersonalInfo = () => {
    const { customer, updateCustomer } = useAuth();
    const { showToast } = React.useContext(ToastContext);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty },
    } = useForm<PersonalData>({
        defaultValues: {
            firstName: customer?.firstName || '',
            lastName: customer?.lastName || '',
            email: customer?.email || '',
            dateOfBirth: customer?.dateOfBirth || '',
        },
        resolver: yupResolver(personalInfoSchema),
        mode: 'onChange',
    });

    const handleEdit = () => {
        reset({
            firstName: customer?.firstName || '',
            lastName: customer?.lastName || '',
            email: customer?.email || '',
            dateOfBirth: customer?.dateOfBirth || '',
        });
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const onSubmit = async (data: PersonalData) => {
        if (!customer) {
            return;
        }

        setIsLoading(true);
        try {
            const updatedCustomer = await updatePersonalData(
                customer.id,
                customer.version,
                {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    dateOfBirth: data.dateOfBirth,
                    email: data.email,
                }
            );

            updateCustomer(updatedCustomer);
            setIsEditing(false);
            showToast({
                message: 'Profile updated successfully!',
                variant: 'success',
            });
        } catch (error) {
            console.error('Failed to update profile:', error);
            showToast({
                message: 'Failed to update profile',
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
        isEditing,
        isLoading,
        errors,
        isDirty,
        register,
        handleEdit,
        handleCancel,
        handleFormSubmit,
    };
};
