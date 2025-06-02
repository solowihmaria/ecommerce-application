import axios from 'axios';
import type {
    Filter,
    ProductProjectionPagedSearchResponse,
    requestGetProductsParams,
} from './catalog.types';

export const requestGetProducts = async (
    { sort, query, filters }: requestGetProductsParams,
    token: string
) => {
    const apiUrl = process.env.CTP_API_URL;
    const projectKey = process.env.CTP_PROJECT_KEY;
    const productsUrl = `${apiUrl}/${projectKey}/product-projections/search`;

    const response = await axios.get<ProductProjectionPagedSearchResponse>(
        productsUrl,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                limit: 50,
                filter: makeFilterParams(filters),
                ...(sort ? { sort } : {}),
                ...(query ? { 'text.en-US': query, fuzzy: true } : {}),
            },
        }
    );

    return response.data.results;
};

function makeFilterParams(filters: Filter) {
    const filterParams: string[] = [];

    if (filters.categoryId) {
        filterParams.push(`categories.id:"${filters.categoryId}"`);
    }
    if (filters.careLevel) {
        filterParams.push(
            `variants.attributes.care-level.key:"${filters.careLevel}"`
        );
    }
    if (filters.light) {
        filterParams.push(
            `variants.attributes.light-requirements.key:"${filters.light}"`
        );
    }
    if (filters.toxicity) {
        filterParams.push(`variants.attributes.toxic:"${filters.toxicity}"`);
    }
    if (filters.priceRange) {
        filterParams.push(
            `variants.price.centAmount:range(${filters.priceRange[0] * 100} to ${filters.priceRange[1] * 100})`
        );
    }
    if (filters.height) {
        filterParams.push(
            `variants.attributes.height:range(${filters.height[0]} to ${filters.height[1]})`
        );
    }

    return filterParams;
}
