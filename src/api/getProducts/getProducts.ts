import type { ProductProjection, Product } from './getProducts.types';
import { requestGetProducts } from './requestGetProducts';

const transformProductData = (productsData: ProductProjection[]) => {
    const products: Product[] = productsData.map((productData) => {
        return {
            id: productData.id,
            name: productData.name?.['en-US'],
            description: productData.description?.['en-US'],
            masterVariant: {
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
                family: productData.masterVariant.attributes[0].value,
                preview: productData.masterVariant.attributes[6]?.value,
            },
        };
    });

    return products;
};

export const getProducts = async () => {
    const data = await requestGetProducts();

    const products: Product[] = transformProductData(data);

    return products;
};
