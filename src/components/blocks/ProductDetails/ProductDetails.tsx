import type {
    CustomProduct,
    CustomVariant,
    Sizes,
} from '../../../api/product/product.types';
import { Slider } from '../../ui/ImagesSlider/ImagesSlider';
import styles from './ProductDetails.module.scss';

import { SizeAttribute } from './parts/SizeAttribute';
import { useGetProductData } from './useGetProductData';
import { useSetVariant } from './useSetVariant';
import { Attribute } from './parts/Attribute';
import CareIcon from '../../../assets/icons/care.svg';
import Height from '../../../assets/images/height.png';
import LightIcon from '../../../assets/icons/light.svg';
import ToxicityIcon from '../../../assets/icons/toxicity.svg';

export const ProductDetails = () => {
    const [currentProduct]: [CustomProduct | null] = useGetProductData();
    const [currentProductVariant, changeVariant]: [
        CustomVariant | null,
        (size: Sizes) => void,
    ] = useSetVariant(currentProduct);

    return (
        <div className={styles.productDetailsContainer}>
            {currentProduct && currentProductVariant ? (
                <>
                    <div className={styles.imageContainer}>
                        <Slider images={currentProductVariant.images} />
                    </div>
                    <div className={styles.productInfoContainer}>
                        <div className={styles.topInfo}>
                            <h1>{currentProduct.name}</h1>
                            <p>Family: {currentProductVariant.family}</p>
                            <p>Description: {currentProduct.description}</p>
                            <SizeAttribute
                                product={currentProduct}
                                currentProductVariant={currentProductVariant}
                                onSizeChange={changeVariant}
                            />
                        </div>

                        <div className={styles.productAttributes}>
                            <div className={styles.iconAttributes}>
                                <Attribute
                                    component={
                                        <CareIcon className={styles.icon} />
                                    }
                                    name="Care"
                                    value={currentProductVariant.care}
                                />
                                <Attribute
                                    component={
                                        <img src={Height} alt="height"></img>
                                    }
                                    name="Height"
                                    value={currentProductVariant.height}
                                />

                                <Attribute
                                    component={
                                        <LightIcon className={styles.icon} />
                                    }
                                    name="Light"
                                    value={currentProductVariant.light}
                                />

                                <Attribute
                                    component={
                                        <ToxicityIcon className={styles.icon} />
                                    }
                                    name="Toxicity"
                                    value={
                                        currentProductVariant.toxic
                                            ? 'Toxic'
                                            : 'No toxic'
                                    }
                                />
                            </div>

                            <p className={styles.price}>
                                Cost: {currentProductVariant?.price}€
                            </p>
                        </div>
                    </div>
                </>
            ) : (
                <p>error</p>
            )}
        </div>
    );
};
