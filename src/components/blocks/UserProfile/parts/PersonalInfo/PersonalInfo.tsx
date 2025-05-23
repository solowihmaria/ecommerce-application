import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Heading } from '../../../../../components/ui/Heading';
import { Button } from '../../../../../components/ui/Button';
import { Input } from '../../../../../components/ui/Input';
import { Label } from '../../../../../components/ui/Label';
import styles from './PersonalInfo.module.scss';
import { personalInfoSchema } from './personalInfo.validation';
import type { PersonalData } from '../../UserProfile.types';
import { FiEdit2 } from 'react-icons/fi';

// Временные данные (заменить на загрузку из API после логина)
const initialData: PersonalData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    dateOfBirth: '1990-01-01',
};

export const PersonalInfo = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState<PersonalData>(initialData);
    const [isLoading, setIsLoading] = useState(false); // Для индикатора загрузки API

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty },
    } = useForm<PersonalData>({
        defaultValues: initialData,
        resolver: yupResolver(personalInfoSchema),
        mode: 'onChange',
    });

    const handleEdit = () => {
        reset(userData); // Заполняем форму текущими данными
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    // Сохранение данных (здесь будет вызов API)
    const onSubmit = (data: PersonalData) => {
        setIsLoading(true);
        // TODO: Заменить на реальный API-запрос

        // Временная заглушка
        setTimeout(() => {
            setUserData(data);
            setIsEditing(false);
            setIsLoading(false);
            console.log('Data saved:', data);
        }, 500);
    };

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        void handleSubmit(onSubmit)();
    };

    return (
        <div className={styles.personalInfo}>
            <div className={styles.sectionTitle}>
                <Heading level="h2">Personal Information</Heading>

                {!isEditing ? (
                    <Button
                        variant="outline"
                        onClick={handleEdit}
                        className={styles.editButton}
                    >
                        <FiEdit2 className={styles.editIcon} />
                        Edit
                    </Button>
                ) : (
                    <div className={styles.actions}>
                        <Button
                            variant="danger"
                            onClick={handleCancel}
                            className={styles.cancelButton}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="success"
                            type="submit"
                            form="personalInfoForm"
                            disabled={!isDirty || isLoading}
                            loading={isLoading}
                            className={styles.saveButton}
                        >
                            Save Changes
                        </Button>
                    </div>
                )}
            </div>

            {!isEditing ? (
                <div className={styles.viewMode}>
                    <div className={styles.field}>
                        <Label>First Name</Label>
                        <p>{userData.firstName}</p>
                    </div>
                    <div className={styles.field}>
                        <Label>Last Name</Label>
                        <p>{userData.lastName}</p>
                    </div>
                    <div className={styles.field}>
                        <Label>Email</Label>
                        <p>{userData.email}</p>
                    </div>
                    <div className={styles.field}>
                        <Label>Date of Birth</Label>
                        <p>{userData.dateOfBirth}</p>
                    </div>
                </div>
            ) : (
                <form
                    id="personalInfoForm"
                    onSubmit={handleFormSubmit}
                    className={styles.editMode}
                >
                    <div className={styles.field}>
                        <Label htmlFor="firstName" required>
                            First Name
                        </Label>
                        <Input
                            id="firstName"
                            {...register('firstName')}
                            error={Boolean(errors.firstName)}
                            errorMessage={errors.firstName?.message}
                        />
                    </div>
                    <div className={styles.field}>
                        <Label htmlFor="lastName" required>
                            Last Name
                        </Label>
                        <Input
                            id="lastName"
                            {...register('lastName')}
                            error={Boolean(errors.lastName)}
                            errorMessage={errors.lastName?.message}
                        />
                    </div>
                    <div className={styles.field}>
                        <Label htmlFor="email" required>
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            {...register('email')}
                            error={Boolean(errors.email)}
                            errorMessage={errors.email?.message}
                            readOnly // Email обычно не редактируется
                        />
                    </div>
                    <div className={styles.field}>
                        <Label htmlFor="dateOfBirth" required>
                            Date of Birth
                        </Label>
                        <Input
                            id="dateOfBirth"
                            type="date"
                            {...register('dateOfBirth')}
                            error={Boolean(errors.dateOfBirth)}
                            errorMessage={errors.dateOfBirth?.message}
                        />
                    </div>
                </form>
            )}
        </div>
    );
};
