import clsx from 'clsx';
import type {
    CustomProduct,
    CustomVariant,
} from '../../../../api/product/product.types';
import styles from '../ProductDetails.module.scss';

export const SizeAttribute = ({
    product,
    currentProductVariant,
    onSizeChange,
}: {
    product: CustomProduct;
    currentProductVariant: CustomVariant;
    onSizeChange: (size: string) => void;
}) => {
    const getAvailableSizes = (product: CustomProduct) => {
        const sizes: string[] = [];
        sizes.push(product.masterVariant.size);
        product.variants.forEach((variant) => {
            sizes.push(variant.size);
        });
        return sizes;
    };
    const getCurrentSize = (currentProductVariant: CustomVariant) => {
        return currentProductVariant.size;
    };

    const getSizeName = (size: string) => {
        let sizeFullName = '';
        switch (size) {
            case 'S':
                sizeFullName = 'Small';
                break;
            case 'M':
                sizeFullName = 'Medium';
                break;
            case 'L':
                sizeFullName = 'Large';
                break;
        }
        return sizeFullName;
    };

    return (
        <ul className={styles.sizeContainer}>
            {getAvailableSizes(product).map((size) =>
                size === getCurrentSize(currentProductVariant) ? (
                    <li
                        key={size}
                        className={clsx(styles.sizeActive, styles.size)}
                    >
                        {getSizeName(size)}
                    </li>
                ) : (
                    <li
                        onClick={() => {
                            console.log(`hello size ${size}`);
                            onSizeChange(size);
                        }}
                        aria-hidden="true"
                        key={size}
                        className={styles.size}
                    >
                        {getSizeName(size)}
                    </li>
                )
            )}
        </ul>
    );
};
