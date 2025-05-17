import type { RegistrationFormData } from '../../components/blocks/RegistrationForm/Registration.types';
import { createCustomerRequest } from './createCustomerRequest';

export const createCustomer = async (formData: RegistrationFormData) => {
    const response = await createCustomerRequest(formData);

    return response;
};
