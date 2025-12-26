import { Heading } from '../../../../../components/ui/Heading';
import { Button } from '../../../../../components/ui/Button';
import { PasswordInput } from '../../../../../components/ui/Input';
import { Label } from '../../../../../components/ui/Label';
import styles from './ChangePassword.module.scss';
import { useChangePassword } from '../../lib/useChangePassword';
import { FiFrown } from 'react-icons/fi';

export const ChangePassword = () => {
    const {
        isPasswordVisible,
        errors,
        isDirty,
        register,
        togglePasswordVisibility,
        onFormSubmit,
        apiError,
    } = useChangePassword();

    return (
        <div className={styles.changePassword}>
            <Heading level="h2" className={styles.title}>
                Change Password
            </Heading>

            <form onSubmit={onFormSubmit} className={styles.passwordForm}>
                {apiError && (
                    <div className={styles.apiError}>
                        <FiFrown className={styles.errorIcon} />
                        {apiError}
                    </div>
                )}

                <div className={styles.field}>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <PasswordInput
                        id="currentPassword"
                        {...register('currentPassword')}
                        error={Boolean(errors.currentPassword)}
                        errorMessage={errors.currentPassword?.message}
                        isPasswordVisible={isPasswordVisible.current}
                        onVisibilityToggle={() =>
                            togglePasswordVisibility('current')
                        }
                    />
                </div>

                <div className={styles.field}>
                    <Label htmlFor="newPassword">New Password</Label>
                    <PasswordInput
                        id="newPassword"
                        {...register('newPassword')}
                        error={Boolean(errors.newPassword)}
                        errorMessage={errors.newPassword?.message}
                        isPasswordVisible={isPasswordVisible.new}
                        onVisibilityToggle={() =>
                            togglePasswordVisibility('new')
                        }
                    />
                </div>

                <div className={styles.field}>
                    <Label htmlFor="confirmPassword">
                        Confirm New Password
                    </Label>
                    <PasswordInput
                        id="confirmPassword"
                        {...register('confirmPassword')}
                        error={Boolean(errors.confirmPassword)}
                        errorMessage={errors.confirmPassword?.message}
                        isPasswordVisible={isPasswordVisible.confirm}
                        onVisibilityToggle={() =>
                            togglePasswordVisibility('confirm')
                        }
                    />
                </div>

                <div className={styles.formActions}>
                    <Button
                        variant="outline"
                        type="submit"
                        disabled={!isDirty}
                        className={styles.submitButton}
                    >
                        Update Password
                    </Button>
                </div>
            </form>
        </div>
    );
};
