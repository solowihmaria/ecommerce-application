import { getProductByID } from './getProduct';
import type { CustomProduct, ProductResponse } from './product.types';

export const getProductData = async (id: string) => {
    const productData = await getProductByID(id);

    return productData;
};

export const transformProductData = (productData: ProductResponse) => {
    const product: CustomProduct = {
        id: productData.id,
        name: productData.masterData.current.name['en-US'],
        description: productData.masterData.current.description['en-US'],
        masterVariant: {
            id: productData.masterData.current.masterVariant.id,
            sku: productData.masterData.current.masterVariant.sku,
            price: {
                value:
                    productData.masterData.current.masterVariant.prices[0].value
                        .centAmount / 100,
                currency:
                    productData.masterData.current.masterVariant.prices[0].value
                        .currencyCode,
            },
            images: productData.masterData.current.masterVariant.images,
            family: productData.masterData.current.masterVariant.attributes[0]
                .value,
            size: productData.masterData.current.masterVariant.attributes[1]
                .value.label,
            care: productData.masterData.current.masterVariant.attributes[2]
                .value.label,
            toxic: productData.masterData.current.masterVariant.attributes[3]
                .value,
            light: productData.masterData.current.masterVariant.attributes[4]
                .value.label,
            height: productData.masterData.current.masterVariant.attributes[5]
                .value,
        },
        variants: productData.masterData.current.variants.map((variant) => {
            return {
                id: variant.id,
                sku: variant.sku,
                price: {
                    value: variant.prices[0].value.centAmount / 100,
                    currency: variant.prices[0].value.currencyCode,
                },
                images: variant.images,
                family: variant.attributes[0].value,
                size: variant.attributes[1].value.label,
                care: variant.attributes[2].value.label,
                toxic: variant.attributes[3].value,
                light: variant.attributes[4].value.label,
                height: variant.attributes[5].value,
            };
        }),
    };

    return product;
};
