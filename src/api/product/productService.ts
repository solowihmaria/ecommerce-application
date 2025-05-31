import { getProductByID } from './getProduct';
import type {
    AttributesList,
    Care,
    CustomAttributes,
    CustomProduct,
    CustomVariant,
    Light,
    ProductResponse,
    Sizes,
    Variant,
} from './product.types';

export const getProductData = async (id: string) => {
    const productData = await getProductByID(id);

    return productData;
};

const prepareVariant = (initialVariant: Variant): CustomVariant => {
    const { id, sku, images, prices } = initialVariant;
    //filter out not used attributes
    const attributes = initialVariant.attributes.filter((attribute) =>
        [
            'family',
            'size',
            'care-level',
            'toxic',
            'light-requirements',
            'height',
        ].includes(attribute.name)
    );
    //get pairs of key value ["attribute name", value]
    const transformedAttributes: AttributesList = attributes.map(
        (attribute) => {
            let value: string | number | boolean | Sizes | Care | Light;
            if (
                typeof attribute.value === 'object' &&
                'label' in attribute.value
            ) {
                value = attribute.value.label;
            } else {
                value = attribute.value;
            }
            return [attribute.name, value];
        }
    );
    const attributesObject: CustomAttributes = Object.fromEntries(
        transformedAttributes
    );

    const discount = prices[0].discounted
        ? prices[0].discounted.value.centAmount / 100
        : null;
    return {
        id: id,
        sku: sku,
        price: prices[0].value.centAmount / 100,
        discount: discount,
        images: images,
        family: attributesObject.family,
        size: attributesObject.size,
        care: attributesObject['care-level'],
        toxic: attributesObject.toxic,
        light: attributesObject['light-requirements'],
        height: attributesObject.height,
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
