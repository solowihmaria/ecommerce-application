import type {
    CustomProduct,
    CustomVariant,
} from '../../../api/product/product.types';
import { Slider } from '../../ui/ImagesSlider/ImagesSlider';
import styles from './ProductDetails.module.scss';

export const ProductDetails = ({
    product,
    productVariant,
}: {
    product: CustomProduct;
    productVariant: CustomVariant;
}) => {
    return (
        <div className={styles.productDetailsContainer}>
            <div className={styles.imageContainer}>
                <Slider images={productVariant.images} />
            </div>
            <div className={styles.productInfoContainer}>
                <div>
                    <h1>{product.name}</h1>
                    <div>
                        <p>Description: {product.description}</p>
                        <p>Family: {productVariant.family}</p>
                        <p>Care: {productVariant.care}</p>
                        <p>Height: {productVariant.height}</p>
                        <p>Cost: ${productVariant.price.value}</p>
                        <p>Size: {productVariant.size}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
