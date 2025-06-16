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

interface CentPrecisionMoney {
    centAmount: number;
    currencyCode: 'EUR';
    type: 'centPrecision';
    fractionDigits: 2;
}

interface ProductDiscountValueRelative {
    type: 'relative';
    permyriad: number;
}

interface Reference {
    id: string;
    typeId: 'product';
}

interface ProductDiscount {
    id: string;
    version: number;
    name: string;
    value: ProductDiscountValueRelative;
    predicate: string;
    sortOrder: string; // Unique decimal value between 0 and 1
    isActive: boolean;
    references: Reference[];
    createdAt: string;
    lastModifiedAt: string;
}

interface ProductDiscountReference {
    id: string;
    typeId: 'product-discount';
    obj?: ProductDiscount;
}

interface DiscountedPrice {
    value: CentPrecisionMoney;
    discount: ProductDiscountReference;
}

interface Price {
    id: string;
    value: CentPrecisionMoney;
    discounted?: DiscountedPrice;
}

interface ImageDimensions {
    w: number;
    h: number;
}

interface Image {
    url: string;
    dimensions: ImageDimensions;
}

interface Attribute {
    name: string;
    value: string | AttributeValueObject;
}

interface AttributeValueObject {
    key: string;
    label: string;
}

export interface ProductVariant {
    id: number;
    prices: Price[];
    price?: Price;
    attributes: Attribute[];
    images: Image[];
    sku: string;
}
export interface Product {
    id: string;
    name: string;
    description: string;
    masterVariant: ProductVariant;
    variants: ProductVariant[];
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

// export interface Product {
//     id: string;
//     name: string;
//     description: string;
//     masterVariant: {
//         id: number;
//         sku?: string;
//         price: {
//             value: number;
//             currency: string;
//             discounted?: { value: number };
//         };
//         images: Image[];
//         family?: string;
//         preview?: string;
//         attributes: Attribute[];
//     };
//     variants?: ProductVariant[];
// }

export interface ProductProjection {
    id: string;
    version: number;
    key?: string;
    productType: ProductTypeReference;
    name: { 'en-US': string };
    description: { 'en-US': string };
    categories: CategoryReference[];
    masterVariant: ProductVariant;
    variants: ProductVariant[];
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
