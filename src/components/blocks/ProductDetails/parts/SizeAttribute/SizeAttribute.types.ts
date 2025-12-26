import type { CustomProduct } from '../../../../../api/product/product.types';

import type { CustomVariant, Sizes } from '../../../../../types/product.types';

export interface SizeAttributeProps {
    product: CustomProduct;
    currentProductVariant: CustomVariant;
    onSizeChange: (size: Sizes) => void;
}
