import { Heading } from '../../../../../components/ui/Heading';
import { Button } from '../../../../../components/ui/Button';
import { Input } from '../../../../../components/ui/Input';
import { Label } from '../../../../../components/ui/Label';
import { Select } from '../../../../../components/ui/Select';
import styles from './AddressList.module.scss';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { CountryCode } from '../../../../../api/createCustomer/createCustomer.types';
import { useAddressList } from '../../lib/useAddressList';
import type { Address } from '../../../../../api/profile/profile.types';

export const AddressList = () => {
    const {
        customer,
        editingAddressId,
        deletingAddressId,
        isLoading,
        errors,
        isDirty,
        register,
        handleEdit,
        handleCancel,
        handleDelete,
        handleFormSubmit,
    } = useAddressList();

    if (!customer) {
        return <div>Loading addresses...</div>;
    }

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
            <Heading level="h2">Addresses</Heading>

            <div className={styles.addressList}>
                {customer.addresses.map((address) => (
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
                                        defaultValue={
                                            customer.billingAddressIds?.includes(
                                                address.id
                                            )
                                                ? 'billing'
                                                : 'shipping'
                                        }
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
                                        defaultChecked={
                                            customer.defaultShippingAddressId ===
                                                address.id ||
                                            customer.defaultBillingAddressId ===
                                                address.id
                                        }
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
                                        {customer.shippingAddressIds?.includes(
                                            address.id
                                        ) && (
                                            <span className={styles.typeBadge}>
                                                Shipping
                                            </span>
                                        )}
                                        {customer.billingAddressIds?.includes(
                                            address.id
                                        ) && (
                                            <span className={styles.typeBadge}>
                                                Billing
                                            </span>
                                        )}
                                        {(customer.defaultShippingAddressId ===
                                            address.id ||
                                            customer.defaultBillingAddressId ===
                                                address.id) && (
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
                                            onClick={() => {
                                                void handleDelete(address.id);
                                            }}
                                            className={styles.deleteButton}
                                            disabled={isLoading}
                                            loading={
                                                deletingAddressId === address.id
                                            }
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
