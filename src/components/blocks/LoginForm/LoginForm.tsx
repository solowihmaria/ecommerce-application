import { FormProvider } from 'react-hook-form';
import styles from './LoginForm.module.scss';
import { Form } from '../../../components/ui/Form';
import { EmailField } from './parts/EmailField';
import { PasswordField } from './parts/PasswordField';
import { useLoginForm } from './lib/useLoginForm';
import { Heading } from '../../../components/ui/Heading';
import { Button } from '../../../components/ui/Button';
import { Link } from 'react-router-dom';

export const LoginForm = () => {
    const {
        isPasswordVisible,
        setIsPasswordVisible,
        methods,
        errors,
        getFieldError,
        handleFormSubmission,
        isSubmitting,
    } = useLoginForm();

    return (
        <div className={styles.loginContainer}>
            <FormProvider {...methods}>
                <Form
                    data-testid="test-id-login-form"
                    onSubmit={handleFormSubmission}
                >
                    <Heading level="h2" className={styles.formTitle}>
                        Login
                    </Heading>

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

                    <Button
                        type="submit"
                        variant="primary"
                        disabled={isSubmitting}
                        loading={isSubmitting}
                        className={styles.submitButton}
                    >
                        {isSubmitting ? 'Logging in...' : 'Log In'}
                    </Button>

                    <div className={styles.signUpRedirect}>
                        <p className={styles.signUpText}>
                            Don&apos;t have an account?
                        </p>
                        <Link
                            data-testid="sign-up-link"
                            to="/register"
                            className={styles.signUpLink}
                        >
                            Sign Up
                        </Link>
                    </div>
                </Form>
            </FormProvider>
        </div>
    );
};
