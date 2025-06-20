import { useEffect, useRef, useState } from 'react';
import styles from './Discount.module.scss';
import { Button } from '../../../../ui/Button';
import { Input } from '../../../../ui/Input';
import { useAuth } from '../../../../../store/auth/useAuth';
import type { Customer } from '../../../../../api/profile/profile.types';
import {
    getDiscountCodeById,
    getDiscountCodeByKey,
} from '../../../../../api/cart/discountCodes/discountCodes';
import { DiscountKeys } from '../../../../../api/cart/discountCodes/discountCodes.types';
import { IoMdClose } from 'react-icons/io';
import type { DiscountProps } from './DiscountCode.types';
import { CartErrorMessages } from '../../lib/constants';

export const Discount = ({
    cartContent,
    applyToCartHandler,
    removeFromCartHandler,
    discountError,
    setDiscountError,
    onInput,
}: DiscountProps) => {
    const promoRef = useRef<HTMLInputElement | null>(null);
    const { customer } = useAuth();

    const [currentDiscountCode, setCurrentDiscountCode] = useState<{
        id: string;
        key: DiscountKeys;
        code: string;
    } | null>(null);

    async function isBirthdayDiscount(code: string) {
        try {
            const birthdayDiscount = await getDiscountCodeByKey(
                DiscountKeys.Birthday
            );
            console.log(birthdayDiscount.code);
            console.log(code);
            return code === birthdayDiscount.code;
        } catch {
            return false;
        }
    }

    function isBirthdayDiscountEligible(customer: Customer | null) {
        if (!customer || !customer.dateOfBirth) {
            return false;
        } else {
            const customerMonthOfBirth = new Date(
                customer.dateOfBirth
            ).getMonth();
            const currentMonth = new Date().getMonth();

            return customerMonthOfBirth == currentMonth;
        }
    }

    function applyPromoCode() {
        if (!promoRef.current || !promoRef.current.value) {
            return;
        }

        isBirthdayDiscount(promoRef.current.value)
            .then((isBirthday) => {
                if (isBirthday && !isBirthdayDiscountEligible(customer)) {
                    setDiscountError(
                        CartErrorMessages.FAILED_TO_APPLY_BIRTHDAY_DISCOUNT
                    );
                } else if (promoRef.current) {
                    void applyToCartHandler(
                        promoRef.current.value,
                        cartContent
                    );
                }
            })
            .catch(() =>
                setDiscountError(
                    CartErrorMessages.FAILED_TO_APPLY_DISCOUNT_GENERIC
                )
            );
    }

    useEffect(() => {
        const currentDiscounts = cartContent.discountCodes;
        if (currentDiscounts && currentDiscounts.length === 0) {
            setCurrentDiscountCode(null);
        } else if (currentDiscounts && currentDiscounts.length > 0) {
            const currentDiscountCodeId = currentDiscounts[0].discountCode.id;
            if (currentDiscounts[0].state === 'DoesNotMatchCart') {
                setDiscountError(
                    'Add more 3 or more items to get the discount'
                );
            }
            getDiscountCodeById(currentDiscountCodeId)
                .then((discount) => {
                    setCurrentDiscountCode(discount);
                })
                .catch((err) => console.log(err));
        }
    }, [cartContent.discountCodes, setDiscountError, cartContent]);

    return (
        <div className={styles.discountContainer}>
            <p className={styles.discountLabel}>Have a promocode?</p>
            {!currentDiscountCode ? (
                <div className={styles.discountControlsContainer}>
                    <Input
                        ref={promoRef}
                        className={styles.discountCodeInput}
                        onChange={onInput}
                    />
                    <Button
                        className={styles.applyButton}
                        onClick={applyPromoCode}
                    >
                        Apply
                    </Button>
                </div>
            ) : (
                <div className={styles.discountControlsContainerApplied}>
                    <p className={styles.discount}>
                        {currentDiscountCode.code}
                    </p>

                    <span
                        className={styles.deleteDiscount}
                        onClick={() =>
                            void removeFromCartHandler(
                                currentDiscountCode.id,
                                cartContent
                            )
                        }
                        aria-hidden="true"
                    >
                        <IoMdClose className={styles.deleteDiscountIcon} />
                    </span>
                </div>
            )}
            {discountError && (
                <span className={styles.discountError}>{discountError}</span>
            )}
        </div>
    );
};
