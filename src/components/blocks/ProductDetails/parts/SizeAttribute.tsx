import clsx from 'clsx';
import { Sizes } from '../../../../api/product/product.types';
import type {
    CustomProduct,
    CustomVariant,
} from '../../../../api/product/product.types';
import styles from '../ProductDetails.module.scss';
import { Button } from '../../../ui/Button';

const getAvailableSizes = (product: CustomProduct) => {
    const sizes: Sizes[] = [];
    sizes.push(product.masterVariant.size);
    product.variants.forEach((variant) => {
        sizes.push(variant.size);
    });
    return sizes;
};
const getCurrentSize = (currentProductVariant: CustomVariant) => {
    return currentProductVariant.size;
};

const getSizeName = (size: Sizes) => {
    let sizeFullName = '';
    switch (size) {
        case Sizes.small:
            sizeFullName = 'Small';
            break;
        case Sizes.medium:
            sizeFullName = 'Medium';
            break;
        case Sizes.large:
            sizeFullName = 'Large';
            break;
    }
    return sizeFullName;
};

export const SizeAttribute = ({
    product,
    currentProductVariant,
    onSizeChange,
}: {
    product: CustomProduct;
    currentProductVariant: CustomVariant;
    onSizeChange: (size: Sizes) => void;
}) => {
    return (
        <ul className={styles.sizeContainer}>
            {getAvailableSizes(product).map((size) =>
                size === getCurrentSize(currentProductVariant) ? (
                    <li key={size}>
                        <Button
                            className={clsx(
                                styles.button,
                                styles.sizeActive,
                                styles.size
                            )}
                        >
                            {getSizeName(size)}
                        </Button>
                    </li>
                ) : (
                    <li key={size}>
                        <Button
                            className={clsx(styles.button, styles.size)}
                            onClick={() => {
                                console.log(`hello size ${size}`);
                                onSizeChange(size);
                            }}
                        >
                            {getSizeName(size)}
                        </Button>
                    </li>
                )
            )}
        </ul>
    );
};
