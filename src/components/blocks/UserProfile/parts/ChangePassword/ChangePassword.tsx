import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FiEdit2 } from 'react-icons/fi';
import { Heading } from '../../../../../components/ui/Heading';
import { Button } from '../../../../../components/ui/Button';
import { PasswordInput } from '../../../../../components/ui/Input';
import { Label } from '../../../../../components/ui/Label';
import styles from './ChangePassword.module.scss';
import { changePasswordSchema } from './changePassword.validation';
import type { PasswordFormData } from '../../UserProfile.types';

export const ChangePassword = () => {
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty },
    } = useForm<PasswordFormData>({
        resolver: yupResolver(changePasswordSchema),
        mode: 'onChange',
    });

    const togglePasswordVisibility = (
        field: keyof typeof isPasswordVisible
    ) => {
        setIsPasswordVisible((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    // TODO: потом добавить обработку ошибки неправильно введенного пароля текущего
    // и если старый и новый пароли одинаковые

    const onSubmit = async (data: PasswordFormData) => {
        try {
            // Временная заглушка для имитации API-запроса
            await new Promise((resolve) => setTimeout(resolve, 500));

            console.log('Password changed:', {
                oldPassword: data.currentPassword,
                newPassword: data.newPassword,
            });

            reset();
            setIsAccordionOpen(false); // Закрыть форму после смены
        } catch (error) {
            console.error('Password change failed:', error);
        }
    };

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        void handleSubmit(onSubmit)();
    };

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
