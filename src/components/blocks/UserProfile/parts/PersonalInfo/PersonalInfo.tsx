import { Heading } from '../../../../../components/ui/Heading';
import { Button } from '../../../../../components/ui/Button';
import { Input } from '../../../../../components/ui/Input';
import { Label } from '../../../../../components/ui/Label';
import styles from './PersonalInfo.module.scss';
import { FiEdit2 } from 'react-icons/fi';
import { usePersonalInfo } from '../../lib/usePersonalInfo';

export const PersonalInfo = () => {
    const {
        customer,
        isEditing,
        isLoading,
        errors,
        isDirty,
        register,
        handleEdit,
        handleCancel,
        handleFormSubmit,
    } = usePersonalInfo();

    if (!customer) {
        return <div>Loading user data...</div>;
    }

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
                        <p>{customer.firstName}</p>
                    </div>
                    <div className={styles.field}>
                        <Label>Last Name</Label>
                        <p>{customer.lastName}</p>
                    </div>
                    <div className={styles.field}>
                        <Label>Email</Label>
                        <p>{customer.email}</p>
                    </div>
                    {customer.dateOfBirth && (
                        <div className={styles.field}>
                            <Label>Date of Birth</Label>
                            <p>
                                {new Date(
                                    customer.dateOfBirth
                                ).toLocaleDateString()}
                            </p>
                        </div>
                    )}
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
                        />
                    </div>
                    <div className={styles.field}>
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
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
