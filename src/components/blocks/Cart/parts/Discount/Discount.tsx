import { useEffect, useRef, useState } from 'react';
import styles from './Discount.module.scss';
import type { CustomCart } from '../../../../../api/cart/cart.types';
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

export const Discount = ({
    cartContent,
    applyToCartHandler,
    removeFromCartHandler,
    discountError,
    onInput,
}: {
    cartContent: CustomCart;
    applyToCartHandler: (
        code: string,
        cartContent: CustomCart
    ) => Promise<void>;
    removeFromCartHandler: (
        id: string,
        cartContent: CustomCart
    ) => Promise<void>;
    discountError: string | null;
    onInput: () => void;
}) => {
    const promoRef = useRef<HTMLInputElement | null>(null);
    const { customer } = useAuth();

    const [currentPromocode, setCurrentPromocode] = useState<{
        id: string;
        key: DiscountKeys;
        code: string;
    } | null>(null);

    async function isBirthdayPromocode(code: string) {
        try {
            const birthdayPromocode = await getDiscountCodeByKey(
                DiscountKeys.Birthday
            );
            console.log(birthdayPromocode.code);
            console.log(code);
            return code === birthdayPromocode.code;
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

        isBirthdayPromocode(promoRef.current.value)
            .then((isBirthday) => {
                if (isBirthday && !isBirthdayDiscountEligible(customer)) {
                    console.log('You cannot apply the birthday code');
                } else if (promoRef.current) {
                    void applyToCartHandler(
                        promoRef.current.value,
                        cartContent
                    );
                }
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        const currentDiscounts = cartContent.discountCodes;
        if (currentDiscounts && currentDiscounts.length === 0) {
            setCurrentPromocode(null);
        } else if (currentDiscounts && currentDiscounts.length > 0) {
            const currentPromocodeId = currentDiscounts[0].discountCode.id;
            getDiscountCodeById(currentPromocodeId)
                .then((discount) => {
                    setCurrentPromocode(discount);
                })
                .catch((err) => console.log(err));
        }
    }, [cartContent.discountCodes]);

    return (
        <div className={styles.promoContainer}>
            <p className={styles.promocodeLabel}>Have a promocode?</p>
            {!currentPromocode ? (
                <div className={styles.promoControlsContainer}>
                    <Input
                        ref={promoRef}
                        className={styles.promocodeInput}
                        onChange={onInput}
                    />
                    <Button onClick={applyPromoCode}>Apply</Button>
                </div>
            ) : (
                <div className={styles.promoControlsContainerApplied}>
                    <p className={styles.promocode}>{currentPromocode.code}</p>

                    <span
                        className={styles.deletePromo}
                        onClick={() =>
                            void removeFromCartHandler(
                                currentPromocode.id,
                                cartContent
                            )
                        }
                        aria-hidden="true"
                    >
                        <IoMdClose className={styles.deletePromoIcon} />
                    </span>
                </div>
            )}
            {discountError && (
                <span className={styles.discountError}>{discountError}</span>
            )}
        </div>
    );
};
