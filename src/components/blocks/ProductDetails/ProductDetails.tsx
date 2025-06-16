import type {
    CustomProduct,
    CustomVariant,
    Sizes,
} from '../../../api/product/product.types';
import { Slider } from '../../ui/ImagesSlider/ImagesSlider';

import { SizeAttribute } from './parts/SizeAttribute/SizeAttribute';
import { useGetProductData } from './lib/useGetProductData';
import { useSetVariant } from './lib/useSetVariant';
import { Attribute } from './parts/Attribute/Attribute';
import CareIcon from '../../../assets/icons/care.svg';
import Height from '../../../assets/images/height.png';
import LightIcon from '../../../assets/icons/light.svg';
import ToxicityIcon from '../../../assets/icons/toxicity.svg';
import { useContext, useState } from 'react';
import { BigSlider } from './parts/BigSlider/BigSlider';
import clsx from 'clsx';
import { Button } from '../../ui/Button';
import styles from './ProductDetails.module.scss';
import { useAddToCart } from '../Cart/lib/useAddToCart';
import { useAuth } from '../../../store/auth/useAuth';
import { useCart } from '../Cart/lib/useCart';
import { useDiscountError } from '../Cart/lib/useDiscountError';
import type { CartHook } from '../Cart/Cart.types';
import { ToastContext } from '../../ui/Toast/ToastContext';
import { RxCross1 } from 'react-icons/rx';

export const ProductDetails = () => {
    const { handleAddToCart, isAdding } = useAddToCart();
    const [currentProduct, error]: [CustomProduct | null, string | null] =
        useGetProductData();
    const [currentProductVariant, changeVariant, variantError]: [
        CustomVariant | null,
        (size: Sizes) => void,
        string | null,
    ] = useSetVariant(currentProduct);
    const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
    const [clickedSlide, setClickedSlide] = useState<number | null>(null);
    const { cartContent } = useAuth();
    const { handleDiscountApiError, clearDiscountError } = useDiscountError();
    const { handleCartItemDelete }: CartHook = useCart(
        handleDiscountApiError,
        clearDiscountError
    );
    const { showToast } = useContext(ToastContext);

    const isInCart = () => {
        return (
            currentProductVariant &&
            cartContent?.lineItems.some(
                (item) => item.variant.sku === currentProductVariant.sku
            )
        );
    };

    const getLineItemId = (variantSKU: string) => {
        const matchingLineItem = cartContent?.lineItems.find(
            (item) => item.variant.sku === variantSKU
        );

        return matchingLineItem?.id;
    };

    const handleRemove = async (variantSku: string) => {
        const sku = getLineItemId(variantSku);
        if (cartContent && sku) {
            try {
                await handleCartItemDelete(cartContent, sku);
                showToast({
                    message: `${currentProduct?.name} removed from your cart!`,
                    variant: 'success',
                });
            } catch (err) {
                console.error(err);
            }
        }
    };

    const showModal = (index: number) => {
        setClickedSlide(index);
        setIsModalOpened(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpened(false);
        document.body.style.overflow = 'unset';
    };

    if (error || variantError) {
        return <p className={styles.productError}>{error || variantError}</p>;
    }

    return (
        <>
            {currentProduct && currentProductVariant ? (
                <>
                    <div className={styles.productDetailsContainer}>
                        <div className={styles.sliderContainer}>
                            <Slider
                                images={
                                    currentProductVariant.images.length > 0
                                        ? currentProductVariant.images
                                        : currentProduct.masterVariant.images
                                }
                                initialSlide={0}
                                showModal={showModal}
                                imageClass={styles.image}
                                containerClass={styles.container}
                            />
                        </div>
                        <div className={styles.productInfoContainer}>
                            <div className={styles.topInfo}>
                                <h1 className={styles.productName}>
                                    {currentProduct.name}
                                </h1>
                                <p>
                                    <span className={styles.labelName}>
                                        Family:
                                    </span>{' '}
                                    {currentProductVariant.family}
                                </p>

                                <p className={styles.description}>
                                    {' '}
                                    {currentProduct.description}
                                </p>
                                <SizeAttribute
                                    product={currentProduct}
                                    currentProductVariant={
                                        currentProductVariant
                                    }
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
                                            <img
                                                src={Height}
                                                alt="height"
                                            ></img>
                                        }
                                        name="Height"
                                        value={currentProductVariant.height}
                                    />

                                    <Attribute
                                        component={
                                            <LightIcon
                                                className={styles.icon}
                                            />
                                        }
                                        name="Light"
                                        value={currentProductVariant.light}
                                    />

                                    <Attribute
                                        component={
                                            <ToxicityIcon
                                                className={styles.icon}
                                            />
                                        }
                                        name="Toxicity"
                                        value={
                                            currentProductVariant.toxic
                                                ? 'Toxic'
                                                : 'Safe'
                                        }
                                    />
                                </div>
                                {!currentProductVariant.discount ? (
                                    <>
                                        <div
                                            className={clsx(
                                                styles.priceCurrent
                                            )}
                                        >
                                            <span
                                                className={clsx(
                                                    styles.priceLabel
                                                )}
                                            >
                                                Price:&nbsp;
                                            </span>
                                            <span
                                                className={clsx(styles.price)}
                                            >
                                                €
                                                {currentProductVariant.price.toFixed(
                                                    2
                                                )}
                                            </span>
                                        </div>
                                    </>
                                ) : (
                                    <div className={styles.priceContainer}>
                                        <div
                                            className={clsx(
                                                styles.priceCurrent
                                            )}
                                        >
                                            <span
                                                className={clsx(
                                                    styles.priceLabel
                                                )}
                                            >
                                                Price:&nbsp;
                                            </span>{' '}
                                            <span
                                                className={clsx(
                                                    styles.price,
                                                    styles.discount
                                                )}
                                            >
                                                €
                                                {currentProductVariant.discount.toFixed(
                                                    2
                                                )}
                                            </span>
                                        </div>
                                        <p
                                            className={clsx(
                                                styles.priceInitial
                                            )}
                                        >
                                            <span
                                                className={clsx(
                                                    styles.price,
                                                    styles.priceInitialNumber
                                                )}
                                            >
                                                €
                                                {currentProductVariant.price.toFixed(
                                                    2
                                                )}
                                            </span>
                                            <span
                                                className={clsx(styles.cross)}
                                            ></span>
                                        </p>
                                    </div>
                                )}
                                <div className={styles.productActions}>
                                    {!isInCart() && (
                                        <Button
                                            disabled={isAdding}
                                            loading={isAdding}
                                            onClick={() => {
                                                void handleAddToCart(
                                                    currentProduct.name,
                                                    currentProductVariant.sku
                                                );
                                            }}
                                        >
                                            Add to cart
                                        </Button>
                                    )}
                                    {isInCart() && (
                                        <Button
                                            className={styles.buttonRemove}
                                            disabled={isAdding}
                                            loading={isAdding}
                                            onClick={() =>
                                                void handleRemove(
                                                    currentProductVariant.sku
                                                )
                                            }
                                        >
                                            <RxCross1 /> Remove from cart
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}

            {currentProduct &&
                currentProductVariant &&
                isModalOpened &&
                clickedSlide != null && (
                    <BigSlider
                        currentSlide={clickedSlide}
                        images={
                            currentProductVariant.images.length > 0
                                ? currentProductVariant.images
                                : currentProduct.masterVariant.images
                        }
                        closeModal={closeModal}
                    />
                )}
        </>
    );
};
