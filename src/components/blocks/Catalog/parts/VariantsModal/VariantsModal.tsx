// import { useState } from 'react';
import { addCartItem } from '../../../../../api/cart/cart';
// import type { CustomCart } from '../../../../../api/cart/cart.types';
import { prepareCartData } from '../../../../../api/cart/helpers';
import type {
    Product,
    ProductVariant,
} from '../../../../../api/catalog/catalog.types';
import { useAuth } from '../../../../../store/auth/useAuth';
import { Button } from '../../../../ui/Button';
import styles from './VariantsModal.module.scss';

interface VariantsModalProps {
    product: Product;
    onCancel: () => void;
    // cartContent: CustomCart;
}

export const VariantsModal = ({ product, onCancel }: VariantsModalProps) => {
    // const [selectedVariant, setSelectedVariant] =
    // useState<ProductVariant | null>(null);
    const { loginStatus, cartContent, setCartContent } = useAuth();

    const handleAddToCart = async (variant: ProductVariant) => {
        console.log('SELECTED VARIANT', variant.sku);

        if (cartContent) {
            const newCart = await addCartItem(
                cartContent,
                variant.sku,
                loginStatus
            );
            // console.log('Added to cart:', { ...product, variant: selectedVariant });
            setCartContent(prepareCartData(newCart));

            onCancel();
        }
    };

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
