import { Heading } from '../../../../../components/ui/Heading';
import { Button } from '../../../../../components/ui/Button';
import { Input } from '../../../../../components/ui/Input';
import { Label } from '../../../../../components/ui/Label';
import { Select } from '../../../../../components/ui/Select';
import { ConfirmModal } from '../../../../../components/ui/ConfirmModal';
import { CountryCode } from '../../../../../api/createCustomer/createCustomer.types';
import type { Address } from '../../../../../api/profile/profile.types';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import styles from './AddressList.module.scss';
import { useAddressList } from '../../lib/address-hooks/useAddressList';

export const AddressList = () => {
    const {
        customer,
        editingAddressId,
        deletingAddressId,
        isLoading,
        isDeleteModalOpen,
        errors,
        isDirty,
        register,
        handleEdit,
        handleCancel,
        handleDeleteClick,
        handleConfirmDelete,
        handleCancelDelete,
        handleFormSubmit,
        isAdding,
        isAddModalOpen,
        openAddModal,
        closeAddModal,
        handleAddSubmit,
        addErrors,
        addIsDirty,
        addRegister,
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
            <div className={styles.headerRow}>
                <Heading level="h2">Addresses</Heading>
                <Button
                    variant="outline"
                    onClick={openAddModal}
                    type="button"
                    className={styles.addButton}
                >
                    <FiPlus className={styles.addIcon} />
                    Add Address
                </Button>
            </div>
            {/* Модальное окно удаления */}
            <ConfirmModal
                isOpen={isDeleteModalOpen}
                title="Delete Address"
                message="Are you sure you want to delete this address?"
                onConfirm={() => void handleConfirmDelete()}
                onCancel={handleCancelDelete}
                confirmText="Delete"
                cancelText="Cancel"
            />
            {/* Модальное окно добавления */}
            {isAddModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <form
                            className={styles.addAdressForm}
                            onSubmit={(e) => {
                                void handleAddSubmit(e);
                            }}
                        >
                            <Heading level="h3" className={styles.modalTitle}>
                                Add New Address
                            </Heading>

                            <div className={styles.field}>
                                <Label htmlFor="add-type">Address Type</Label>
                                <Select id="add-type" {...addRegister('type')}>
                                    <option value="shipping">Shipping</option>
                                    <option value="billing">Billing</option>
                                </Select>
                            </div>

                            <div className={styles.field}>
                                <Label htmlFor="add-country" required>
                                    Country
                                </Label>
                                <Select
                                    id="add-country"
                                    {...addRegister('country')}
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
                                <Label htmlFor="add-city" required>
                                    City
                                </Label>
                                <Input
                                    id="add-city"
                                    {...addRegister('city')}
                                    error={Boolean(addErrors.city)}
                                    errorMessage={addErrors.city?.message}
                                />
                            </div>

                            <div className={styles.field}>
                                <Label htmlFor="add-street" required>
                                    Street
                                </Label>
                                <Input
                                    id="add-street"
                                    {...addRegister('streetName')}
                                    error={Boolean(addErrors.streetName)}
                                    errorMessage={addErrors.streetName?.message}
                                />
                            </div>

                            <div className={styles.field}>
                                <Label htmlFor="add-postalCode" required>
                                    Postal Code
                                </Label>
                                <Input
                                    id="add-postalCode"
                                    {...addRegister('postalCode')}
                                    error={Boolean(addErrors.postalCode)}
                                    errorMessage={addErrors.postalCode?.message}
                                />
                            </div>

                            <div className={styles.checkboxField}>
                                <Input
                                    type="checkbox"
                                    id="add-default"
                                    {...addRegister('isDefault')}
                                />
                                <Label htmlFor="add-default">
                                    Set as default address
                                </Label>
                            </div>

                            <div className={styles.modalActions}>
                                <Button
                                    variant="danger"
                                    onClick={closeAddModal}
                                    type="button"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="success"
                                    type="submit"
                                    disabled={!addIsDirty || isAdding}
                                    loading={isAdding}
                                >
                                    {isAdding ? 'Adding...' : 'Add Address'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

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
                                            onClick={() =>
                                                handleDeleteClick(address.id)
                                            }
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
