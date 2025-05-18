import type { RegistrationFormData } from '../../components/blocks/RegistrationForm/Registration.types';
import { requestCreateCustomer } from './requestCreateCustomer';

export const createCustomer = async (
    formData: RegistrationFormData,
    onSuccess?: () => void
) => {
    try {
        const response = await requestCreateCustomer(formData);

        if (typeof onSuccess === 'function') {
            onSuccess();
        }

        console.log('CUSTOMER', response);
        return response;
    } catch (error) {
        console.log('CREATECUSTOMER ERROR', error);
    }
};
