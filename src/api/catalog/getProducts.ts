import { getUserToken } from '../product/getProduct';
import type {
    ProductProjection,
    Product,
    requestGetProductsParams,
} from './catalog.types';
import { requestGetProducts } from './requestGetProducts';
import { Attributes } from '../../types/product.types';

const transformProductData = (productsData: ProductProjection[]) => {
    const products: Product[] = productsData.map((productData) => {
        const previewAttr = productData.masterVariant.attributes.find(
            (attr) => attr.name === Attributes.preview
        );
        const preview =
            typeof previewAttr?.value === 'string' ? previewAttr.value : '';

        return {
            id: productData.id,
            name: productData.name?.['en-US'],
            description: productData.description?.['en-US'],
            masterVariant: productData.masterVariant,
            forCatalog: {
                id: productData.masterVariant.id,
                price: {
                    value:
                        productData.masterVariant.prices[0].value.centAmount /
                        100,
                    currency:
                        productData.masterVariant.prices[0].value.currencyCode,
                    discounted: productData.masterVariant.prices[0].discounted
                        ? {
                              value:
                                  productData.masterVariant.prices[0].discounted
                                      .value.centAmount / 100,
                          }
                        : undefined,
                },
                images: productData.masterVariant.images,
                // family: productData.masterVariant.attributes[0].value,
                preview: preview,
                attributes: productData.masterVariant.attributes,
            },
            variants: productData.variants,
        };
    });

    return products;
};

export const getProducts = async (
    params: requestGetProductsParams,
    loginStatus: boolean
) => {
    const token = await getUserToken(loginStatus);

    const data: { products: ProductProjection[]; total: number } =
        await requestGetProducts(params, token);

    const products: Product[] = transformProductData(data.products);

    return { products, total: data.total };
};
