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

export const RegistrationForm = () => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <div className={styles.registrationContainer}>
            <Form>
                <FormTitle />

                <div className={styles.grid2}>
                    <EmailField />
                    <PasswordField
                        showPassword={showPassword}
                        onTogglePassword={() => setShowPassword(!showPassword)}
                    />
                </div>
                <PersonalInfoFieldSet />
                <ShippingAddressFieldSet />
                <BillingAddressFieldSet />

                <SubmitButton />
                <SignInRedirect />
            </Form>
        </div>
    );
};
