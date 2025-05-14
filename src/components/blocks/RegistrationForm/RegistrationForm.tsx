import React from 'react';
import styles from './RegistrationForm.module.scss';
import { Form } from '../../../components/ui/Form';
import { FormTitle } from './parts/FormTitle';
import { SubmitButton } from './parts/SubmitButton';
import { SignInRedirect } from './parts/SignInRedirect';
import { EmailField } from './parts/EmailField';
import { PasswordField } from './parts/PasswordField';
import { PersonalInfoFieldSet } from './parts/PersonalInfoFieldSet';
import { ShippingAddressFieldSet } from './parts/ShippingAddressFieldSet';
import { BillingAddressFieldSet } from './parts/BillingAddressFieldSet';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type {
    RegistrationFormData,
    RegistrationSubmitHandler,
} from './Registration.types';
import { registrationSchema } from './features/registration.validation';

const onSubmit: RegistrationSubmitHandler = (data) => {
    console.log('Form submitted:', data);
};

export const RegistrationForm = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegistrationFormData>({
        resolver: yupResolver(registrationSchema),
        mode: 'onChange',
    });

    const handleFormSubmission = (event?: React.BaseSyntheticEvent): void => {
        void handleSubmit(onSubmit)(event).catch(console.error);
    };

    return (
        <div className={styles.registrationContainer}>
            <Form onSubmit={handleFormSubmission}>
                <FormTitle />

                <div className={styles.grid2}>
                    <EmailField register={register} error={errors.email} />
                    <PasswordField
                        register={register}
                        error={errors.password}
                        showPassword={showPassword}
                        onTogglePassword={() => setShowPassword(!showPassword)}
                    />
                </div>
                <PersonalInfoFieldSet register={register} errors={errors} />
                <ShippingAddressFieldSet register={register} errors={errors} />
                <BillingAddressFieldSet register={register} errors={errors} />

                <SubmitButton />
                <SignInRedirect />
            </Form>
        </div>
    );
};
