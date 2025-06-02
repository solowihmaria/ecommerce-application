import type {
    CustomProduct,
    CustomVariant,
    Sizes,
} from '../../../../../api/product/product.types';

export interface SizeAttributeProps {
    product: CustomProduct;
    currentProductVariant: CustomVariant;
    onSizeChange: (size: Sizes) => void;
}
