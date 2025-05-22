import { useState } from 'react';
import { Heading } from '../../../../../components/ui/Heading';
import { Button } from '../../../../../components/ui/Button';
import { PasswordInput } from '../../../../../components/ui/Input';
import { Label } from '../../../../../components/ui/Label';
import styles from './ChangePassword.module.scss';

export const ChangePassword = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState({
        current: false,
        new: false,
        confirm: false,
    });
    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswords((prev) => ({ ...prev, [name]: value }));
    };

    const togglePasswordVisibility = (
        field: keyof typeof isPasswordVisible
    ) => {
        setIsPasswordVisible((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const handleSubmit = () => {
        // Здесь будет вызов API для смены пароля
        console.log('Password changed:', passwords);
        // Очищаем поля после отправки
        setPasswords({ current: '', new: '', confirm: '' });
    };

    return (
        <div className={styles.changePassword}>
            <Heading level="h2">Change Password</Heading>

            <div className={styles.passwordForm}>
                <div className={styles.field}>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <PasswordInput
                        id="currentPassword"
                        name="current"
                        value={passwords.current}
                        onChange={handleChange}
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
                        name="new"
                        value={passwords.new}
                        onChange={handleChange}
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
                        name="confirm"
                        value={passwords.confirm}
                        onChange={handleChange}
                        isPasswordVisible={isPasswordVisible.confirm}
                        onVisibilityToggle={() =>
                            togglePasswordVisibility('confirm')
                        }
                    />
                </div>

                <div className={styles.formActions}>
                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                        disabled={
                            !passwords.current ||
                            !passwords.new ||
                            passwords.new !== passwords.confirm
                        }
                    >
                        Update Password
                    </Button>
                </div>
            </div>
        </div>
    );
};
