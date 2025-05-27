import { useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { Heading } from '../../../../../components/ui/Heading';
import { Button } from '../../../../../components/ui/Button';
import { PasswordInput } from '../../../../../components/ui/Input';
import { Label } from '../../../../../components/ui/Label';
import styles from './ChangePassword.module.scss';
import { useChangePassword } from '../../lib/useChangePassword';
import { FiFrown } from 'react-icons/fi';

export const ChangePassword = () => {
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
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
            <div className={styles.headerRow}>
                <Heading level="h2">Password</Heading>
                <Button
                    variant="outline"
                    onClick={() => setIsAccordionOpen((prev) => !prev)}
                    type="button"
                    className={styles.editButton}
                >
                    <FiEdit2 className={styles.editIcon} />
                    Edit
                </Button>
            </div>

            {isAccordionOpen && (
                <form onSubmit={onFormSubmit} className={styles.passwordForm}>
                    {apiError && (
                        <div className={styles.apiError}>
                            <FiFrown className={styles.errorIcon} />
                            {apiError}
                        </div>
                    )}

                    <div className={styles.field}>
                        <Label htmlFor="currentPassword" required>
                            Current Password
                        </Label>
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
                        <Label htmlFor="newPassword" required>
                            New Password
                        </Label>
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
                        <Label htmlFor="confirmPassword" required>
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
                            variant="success"
                            type="submit"
                            disabled={!isDirty}
                        >
                            Update Password
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
};
