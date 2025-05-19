import type { RegistrationFormData } from '../../components/blocks/RegistrationForm/Registration.types';
import { requestCreateCustomer } from './requestCreateCustomer';

export const createCustomer = async (
    formData: RegistrationFormData,
    onSuccess?: () => void | Promise<void>
) => {
    const response = await requestCreateCustomer(formData);

    await onSuccess?.();

    console.log('CUSTOMER', response);
    return response;
};
