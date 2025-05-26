import { getProductByID } from './getProduct';
import type {
    CustomProduct,
    CustomVariant,
    ProductResponse,
    Variant,
} from './product.types';

export const getProductData = async (id: string) => {
    const productData = await getProductByID(id);

    return productData;
};

const prepareVariant = (initialVariant: Variant): CustomVariant => {
    const { id, sku, images, prices } = initialVariant;
    const [family, size, care, toxic, light, height] =
        initialVariant.attributes;
    return {
        id: id,
        sku: sku,
        price: prices[0].value.centAmount / 100,
        images: images,
        family: family.value,
        size: size.value.label,
        care: care.value.label,
        toxic: toxic.value,
        light: light.value.label,
        height: height.value,
    };
};

export const transformProductData = (productData: ProductResponse) => {
    const {
        id,
        masterData: {
            current: { masterVariant, variants, name, description },
        },
    } = productData;

    const product: CustomProduct = {
        id: id,
        name: name['en-US'],
        description: description['en-US'],
        masterVariant: prepareVariant(masterVariant),
        variants: variants.map((variant) => prepareVariant(variant)),
    };

    return product;
};
