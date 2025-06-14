// import { useState } from 'react';
import type {
    Product,
    ProductVariant,
} from '../../../../../api/catalog/catalog.types';
import { Button } from '../../../../ui/Button';
import styles from './VariantsModal.module.scss';

interface VariantsModalProps {
    product: Product;
    onCancel: () => void;
}

export const VariantsModal = ({ product, onCancel }: VariantsModalProps) => {
    // const [selectedVariant, setSelectedVariant] =
    // useState<ProductVariant | null>(null);

    const handleAddToCart = (variant: ProductVariant) => {
        console.log('SELECTED VARIANT', variant);

        // console.log('Added to cart:', { ...product, variant: selectedVariant });
        onCancel();
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
                            onClick={() => handleAddToCart(variant)}
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
