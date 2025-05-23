import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import { Heading } from '../../../../../components/ui/Heading';
import { Button } from '../../../../../components/ui/Button';
import { Input } from '../../../../../components/ui/Input';
import { Label } from '../../../../../components/ui/Label';
import { Select } from '../../../../../components/ui/Select';
import styles from './AddressList.module.scss';
import { addressSchema } from './address.validation';
import type { Address, AddressFormData } from '../../UserProfile.types';
import { CountryCode } from '../../../../../api/createCustomer/createCustomer.types';

// Тестовые данные
const initialAddresses: Address[] = [
    {
        id: '1',
        type: 'shipping',
        streetName: '123 Main St',
        city: 'New York',
        country: CountryCode.DE,
        postalCode: '10001',
        isDefault: true,
    },
    {
        id: '2',
        type: 'billing',
        streetName: '456 Business Ave',
        city: 'Berlin',
        country: CountryCode.DE,
        postalCode: '10115',
        isDefault: false,
    },
    {
        id: '3',
        type: 'shipping',
        streetName: '789 Piazza Navona',
        city: 'Rome',
        country: CountryCode.IT,
        postalCode: '00186',
        isDefault: false,
    },
];

export const AddressList = () => {
    const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
    const [editingAddressId, setEditingAddressId] = useState<string | null>(
        null
    );
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty },
    } = useForm<AddressFormData>({
        resolver: yupResolver(addressSchema),
        mode: 'onChange',
    });

    const handleEdit = (address: Address) => {
        reset({
            type: address.type,
            country: address.country,
            city: address.city,
            streetName: address.streetName,
            postalCode: address.postalCode,
            isDefault: address.isDefault,
        });
        setEditingAddressId(address.id);
        setIsAddingNew(false);
    };

    const handleAddNew = () => {
        reset({
            type: 'shipping',
            country: CountryCode.DE,
            city: '',
            streetName: '',
            postalCode: '',
            isDefault: false,
        });
        setEditingAddressId(null);
        setIsAddingNew(true);
    };

    const handleCancel = () => {
        setEditingAddressId(null);
        setIsAddingNew(false);
    };

    const handleDelete = (id: string) => {
        setAddresses(addresses.filter((addr) => addr.id !== id));
    };

    const onSubmit = (data: AddressFormData) => {
        setIsLoading(true);
        // симуляция запроса
        setTimeout(() => {
            if (isAddingNew) {
                setAddresses([
                    ...addresses,
                    {
                        ...data,
                        id: Date.now().toString(),
                    },
                ]);
            } else if (editingAddressId) {
                setAddresses(
                    addresses.map((addr) =>
                        addr.id === editingAddressId
                            ? { ...data, id: addr.id }
                            : addr
                    )
                );
            }

            setIsLoading(false);
            handleCancel();
        }, 500);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        void handleSubmit(onSubmit)();
    };

    const getCountryName = (code: CountryCode): string => {
        const countryMap: Record<CountryCode, string> = {
            DE: 'Germany',
            FR: 'France',
            IT: 'Italy',
        };
        return countryMap[code] || code;
    };

    const formatAddressLine = (address: Address): string => {
        return `${getCountryName(address.country)}, ${address.city}, ${address.streetName}, ${address.postalCode}`;
    };

    return (
        <div className={styles.addresses}>
            <div className={styles.sectionHeader}>
                <Heading level="h2">Addresses</Heading>
                <Button
                    variant="outline"
                    onClick={handleAddNew}
                    className={styles.addButton}
                >
                    <FiPlus className={styles.icon} />
                    Add Address
                </Button>
            </div>

            <div className={styles.addressList}>
                {addresses.map((address) => (
                    <div key={address.id} className={styles.addressCard}>
                        {editingAddressId === address.id ? (
                            <form
                                onSubmit={handleFormSubmit}
                                className={styles.editForm}
                            >
                                <div className={styles.field}>
                                    <Label htmlFor={`type-${address.id}`}>
                                        Address Type
                                    </Label>
                                    <Select
                                        id={`type-${address.id}`}
                                        {...register('type')}
                                    >
                                        <option value="shipping">
                                            Shipping
                                        </option>
                                        <option value="billing">Billing</option>
                                    </Select>
                                </div>

                                <div className={styles.field}>
                                    <Label
                                        htmlFor={`country-${address.id}`}
                                        required
                                    >
                                        Country
                                    </Label>
                                    <Select
                                        id={`country-${address.id}`}
                                        {...register('country')}
                                    >
                                        <option value={CountryCode.DE}>
                                            Germany
                                        </option>
                                        <option value={CountryCode.FR}>
                                            France
                                        </option>
                                        <option value={CountryCode.IT}>
                                            Italy
                                        </option>
                                    </Select>
                                </div>

                                <div className={styles.field}>
                                    <Label
                                        htmlFor={`city-${address.id}`}
                                        required
                                    >
                                        City
                                    </Label>
                                    <Input
                                        id={`city-${address.id}`}
                                        {...register('city')}
                                        error={Boolean(errors.city)}
                                        errorMessage={errors.city?.message}
                                    />
                                </div>

                                <div className={styles.field}>
                                    <Label
                                        htmlFor={`street-${address.id}`}
                                        required
                                    >
                                        Street
                                    </Label>
                                    <Input
                                        id={`street-${address.id}`}
                                        {...register('streetName')}
                                        error={Boolean(errors.streetName)}
                                        errorMessage={
                                            errors.streetName?.message
                                        }
                                    />
                                </div>

                                <div className={styles.field}>
                                    <Label
                                        htmlFor={`postalCode-${address.id}`}
                                        required
                                    >
                                        Postal Code
                                    </Label>
                                    <Input
                                        id={`postalCode-${address.id}`}
                                        {...register('postalCode')}
                                        error={Boolean(errors.postalCode)}
                                        errorMessage={
                                            errors.postalCode?.message
                                        }
                                    />
                                </div>

                                <div className={styles.checkboxField}>
                                    <Input
                                        type="checkbox"
                                        id={`default-${address.id}`}
                                        {...register('isDefault')}
                                    />
                                    <Label htmlFor={`default-${address.id}`}>
                                        Set as default address
                                    </Label>
                                </div>

                                <div className={styles.formActions}>
                                    <Button
                                        variant="danger"
                                        onClick={handleCancel}
                                        type="button"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="success"
                                        type="submit"
                                        disabled={!isDirty || isLoading}
                                        loading={isLoading}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </form>
                        ) : (
                            <div className={styles.viewMode}>
                                <div className={styles.addressHeader}>
                                    <div className={styles.addressMeta}>
                                        <span className={styles.typeBadge}>
                                            {address.type === 'shipping'
                                                ? 'Shipping'
                                                : 'Billing'}
                                        </span>
                                        {address.isDefault && (
                                            <span
                                                className={styles.defaultBadge}
                                            >
                                                Default
                                            </span>
                                        )}
                                    </div>
                                    <div className={styles.addressActions}>
                                        <Button
                                            variant="ghost"
                                            onClick={() => handleEdit(address)}
                                            className={styles.editButton}
                                        >
                                            <FiEdit2 />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            onClick={() =>
                                                handleDelete(address.id)
                                            }
                                            className={styles.deleteButton}
                                        >
                                            <FiTrash2 />
                                        </Button>
                                    </div>
                                </div>

                                <div className={styles.addressLine}>
                                    {formatAddressLine(address)}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
