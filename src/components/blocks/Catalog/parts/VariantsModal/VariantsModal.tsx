import { useState } from 'react';
import { useContext } from 'react';
import { addCartItem } from '../../../../../api/cart/cart';
import { prepareCartData } from '../../../../../api/cart/helpers';
import type {
    Product,
    ProductVariant,
} from '../../../../../api/catalog/catalog.types';
import { useAuth } from '../../../../../store/auth/useAuth';
import { Button } from '../../../../ui/Button';
import styles from './VariantsModal.module.scss';
import { ToastContext } from '../../../../ui/Toast/ToastContext';
import { CartErrorMessages } from '../../../Cart/lib/constants';

interface VariantsModalProps {
    product: Product;
    onCancel: () => void;
}

export const VariantsModal = ({ product, onCancel }: VariantsModalProps) => {
    const { showToast } = useContext(ToastContext);
    const { loginStatus, cartContent, setCartContent } = useAuth();
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
        null
    );

    async function handleAddToCart(variant: ProductVariant) {
        setIsAddingToCart(true);
        setSelectedVariantId(variant.id);

        if (cartContent) {
            try {
                const newCart = await addCartItem(
                    cartContent,
                    variant.sku,
                    loginStatus
                );
                setCartContent(prepareCartData(newCart));

                showToast({
                    message: `${product.name} added to your cart!`,
                    variant: 'success',
                });

                onCancel();
            } catch (err) {
                console.error('Failed adding item', err);
                showToast({
                    message: CartErrorMessages.FAILED_TO_DELETE_MESSAGE,
                    variant: 'error',
                });
            } finally {
                setIsAddingToCart(false);
                setSelectedVariantId(null);
            }
        }
    }

    function getVariantLabel(variant: ProductVariant) {
        const sizeAttr = variant.attributes.find(
            (attr) => attr.name === 'size'
        );
        const sizeValue = sizeAttr?.value;
        const size =
            typeof sizeValue === 'object' ? sizeValue?.label : undefined;

        const price = variant.prices[0].discounted
            ? (variant.prices[0].discounted.value.centAmount / 100).toFixed(2)
            : (variant.prices[0].value.centAmount / 100).toFixed(2);
        return `Size ${size}, €${price}`;
    }

    function getVariantDiscount(variant: ProductVariant) {
        return variant.prices[0].discounted
            ? (variant.prices[0].value.centAmount / 100).toFixed(2)
            : '';
    }

    const variants: ProductVariant[] = product.variants
        ? [product.masterVariant, ...product.variants]
        : [product.masterVariant];

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2>Select size</h2>

                <div className={styles.variantsWrapper}>
                    {variants.map((variant) => (
                        <Button
                            variant="outline"
                            key={variant.id}
                            disabled={isAddingToCart}
                            loading={
                                isAddingToCart &&
                                selectedVariantId === variant.id
                            }
                            onClick={() => void handleAddToCart(variant)}
                        >
                            {getVariantLabel(variant)}
                            <span className={styles.priceDiscounted}>
                                {getVariantDiscount(variant)}
                            </span>
                        </Button>
                    ))}
                </div>

                <Button variant="danger" onClick={onCancel}>
                    Cancel
                </Button>
            </div>
        </div>
    );
};
