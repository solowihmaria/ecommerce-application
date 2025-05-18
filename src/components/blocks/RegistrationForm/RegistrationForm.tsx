import React from 'react';
import { FormProvider } from 'react-hook-form';
import styles from './RegistrationForm.module.scss';
import { Form } from '../../../components/ui/Form';
import { EmailField } from './parts/EmailField';
import { PasswordField } from './parts/PasswordField';
import { PersonalInfoFieldSet } from './parts/PersonalInfoFieldset/PersonalInfoFieldSet';
import { ShippingAddressFieldSet } from './parts/AddressesFieldsets/ShippingAddressFieldSet';
import { BillingAddressFieldSet } from './parts/AddressesFieldsets/BillingAddressFieldSet';
import { useRegistrationForm } from './lib/useRegistrationForm';
import { Heading } from '../../ui/Heading';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';

export const RegistrationForm = () => {
    const {
        isPasswordVisible,
        setIsPasswordVisible,
        methods,
        errors,
        getFieldError,
        handleFormSubmission,
        isSubmitting,
    } = useRegistrationForm();

    return (
        <div className={styles.registrationContainer}>
            <FormProvider {...methods}>
                <Form onSubmit={handleFormSubmission}>
                    <Heading level="h2" className={styles.formTitle}>
                        Registration
                    </Heading>

                    <div className={styles.loginInfo}>
                        <EmailField
                            error={errors.email || getFieldError('email')}
                        />

                        <PasswordField
                            error={errors.password || getFieldError('password')}
                            isPasswordVisible={isPasswordVisible}
                            onTogglePassword={() =>
                                setIsPasswordVisible(!isPasswordVisible)
                            }
                        />
                    </div>
                    <PersonalInfoFieldSet errors={errors} />
                    <ShippingAddressFieldSet errors={errors} />
                    <BillingAddressFieldSet errors={errors} />

                    <Button
                        type="submit"
                        variant="primary"
                        disabled={isSubmitting}
                        className={styles.submitButton}
                    >
                        {isSubmitting ? 'Logging in...' : 'Log In'}
                    </Button>

                    <div className={styles.signInRedirect}>
                        <p className={styles.signInText}>
                            Already have an account?
                        </p>
                        <Link to="/login" className={styles.signInLink}>
                            Sign In
                        </Link>
                    </div>
                </Form>
            </FormProvider>
        </div>
    );
};
