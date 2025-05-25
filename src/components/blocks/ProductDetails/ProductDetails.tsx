import type {
    CustomProduct,
    CustomVariant,
} from '../../../api/product/product.types';
import { Slider } from '../../ui/ImagesSlider/ImagesSlider';
import styles from './ProductDetails.module.scss';

import { CareAttribute } from './parts/CareAttribute';
import { LightAttribute } from './parts/LightAttribute';
import { HeightAttribute } from './parts/HeightAttribute';
import { ToxicityAttribute } from './parts/ToxicityAttribute';
import { SizeAttribute } from './parts/SizeAttribute';

export const ProductDetails = ({
    product,
    productVariant,
    onSizeChange,
}: {
    product: CustomProduct;
    productVariant: CustomVariant;
    onSizeChange: (size: string) => void;
}) => {
    return (
        <div className={styles.productDetailsContainer}>
            <div className={styles.imageContainer}>
                <Slider images={productVariant.images} />
            </div>
            <div className={styles.productInfoContainer}>
                <div className={styles.topInfo}>
                    <h1>{product.name}</h1>
                    <p>Family: {productVariant.family}</p>
                    <p>Description: {product.description}</p>
                    <SizeAttribute
                        product={product}
                        currentProductVariant={productVariant}
                        onSizeChange={onSizeChange}
                    />
                </div>

                <div className={styles.productAttributes}>
                    <div className={styles.iconAttributes}>
                        <CareAttribute care={productVariant.care} />
                        <HeightAttribute height={productVariant.height} />
                        <LightAttribute light={productVariant.light} />
                        <ToxicityAttribute toxicity={productVariant.toxic} />
                    </div>

                    <p className={styles.price}>
                        Cost: {productVariant.price.value}€
                    </p>
                </div>
            </div>
        </div>
    );
};
