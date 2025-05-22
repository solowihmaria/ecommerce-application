import { useState } from 'react';
import { Heading } from '../../../../../components/ui/Heading';
import { Button } from '../../../../../components/ui/Button';
import { Input } from '../../../../../components/ui/Input';
import { Label } from '../../../../../components/ui/Label';
import styles from './PersonalInfo.module.scss';

interface PersonalData {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
}

export const PersonalInfo = () => {
    // Моковые данные (позже заменим на данные из API)
    const initialData: PersonalData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        dateOfBirth: '1990-01-01',
    };

    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState<PersonalData>(initialData);
    const [tempData, setTempData] = useState<PersonalData>(initialData);

    const handleEdit = () => {
        setTempData(userData);
        setIsEditing(true);
    };

    const handleSave = () => {
        setUserData(tempData);
        setIsEditing(false);
        // Здесь будет вызов API для сохранения
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTempData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className={styles.personalInfo}>
            <div className={styles.sectionTitle}>
                <Heading level="h2">Personal Information</Heading>

                {!isEditing ? (
                    <Button variant="outline" onClick={handleEdit}>
                        Edit
                    </Button>
                ) : (
                    <div className={styles.actions}>
                        <Button variant="danger" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleSave}>
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
                <div className={styles.editMode}>
                    <div className={styles.field}>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                            id="firstName"
                            name="firstName"
                            value={tempData.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.field}>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                            id="lastName"
                            name="lastName"
                            value={tempData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.field}>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={tempData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.field}>
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input
                            id="dateOfBirth"
                            name="dateOfBirth"
                            type="date"
                            value={tempData.dateOfBirth}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
