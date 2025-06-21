import type { Variant } from '../../types/product.types';

interface ProductType {
    id: string;
    version: number;
    key?: string;
    name: string;
    description: string;
    createdAt: string;
    lastModifiedAt: string;
}

interface ProductTypeReference {
    id: string;
    typeId: 'product-type';
    obj: ProductType;
}

export interface Category {
    id: string;
    version: number;
    name: { 'en-US': string };
    slug: { 'en-US': string }; // ^[A-Za-z0-9_-]{2,256}+$
    description: { 'en-US': string };
    ancestors: CategoryReference[];
    parent: CategoryReference;
}

interface CategoryReference {
    id: string;
    typeId: 'category';
    obj: Category;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    masterVariant: Variant;
    variants: Variant[];
    forCatalog: {
        id: number;
        price: {
            value: number;
            currency: string;
            discounted?: { value: number };
        };
        preview?: string;
    };
}

export interface ProductProjection {
    id: string;
    version: number;
    key?: string;
    productType: ProductTypeReference;
    name: { 'en-US': string };
    description: { 'en-US': string };
    categories: CategoryReference[];
    masterVariant: Variant;
    variants: Variant[];
}

export interface ProductProjectionPagedSearchResponse {
    limit: number;
    count: number;
    total: number;
    offset: number;
    results: ProductProjection[];
}

export interface Filter {
    categoryId: string;
    careLevel: string;
    light: string;
    toxicity: string;
    priceRange: number[];
    height: number[];
}

export interface requestGetProductsParams {
    sort?: string;
    query?: string;
    filters: Filter;
    limit?: number;
    offset?: number;
}

export interface CategoryPagedQueryResponse {
    limit: number;
    offset: number;
    count: number;
    total: number;
    results: Category[];
}
