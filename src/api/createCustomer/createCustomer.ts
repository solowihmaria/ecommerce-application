import type { RegistrationFormData } from '../../components/blocks/RegistrationForm/Registration.types';
import { requestCreateCustomer } from './requestCreateCustomer';

export const createCustomer = async (
    formData: RegistrationFormData,
    onSuccess?: () => void
) => {
    const response = await requestCreateCustomer(formData);

    if (typeof onSuccess === 'function') {
        onSuccess();
    }

    console.log('CUSTOMER', response);
    return response;
};
