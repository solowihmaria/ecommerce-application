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

interface Category {
    id: string;
    version: number;
    name: string;
    slug: string; // ^[A-Za-z0-9_-]{2,256}+$
    ancestors: CategoryReference[];
    orderHint: string; // Decimal value between 0 and 1
    createdAt: string;
    lastModifiedAt: string;
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
    value: string;
}

interface ProductVariant {
    id: number;
    prices?: Price[];
    price?: Price;
    attributes?: Attribute[];
    images?: Image[];
}

interface SearchKeyword {
    text: string;
    suggestTokenizer?: string;
}

interface SearchKeywords {
    en: SearchKeyword[];
}

interface ProductData {
    name: string;
    categories: CategoryReference[];
    slug: string;
    masterVariant: ProductVariant;
    variants: ProductVariant[];
    searchKeywords: SearchKeywords;
}

interface ProductCatalogData {
    published: boolean;
    current: ProductData;
    staged: ProductData;
    hasStagedChanges: boolean;
}

export interface Product {
    id?: string;
    version: string;
    key?: string;
    productType: ProductTypeReference;
    masterData: ProductCatalogData;
    createdAt: string;
    lastModifiedAt: string;
}

export interface ProductPagedQueryResponse {
    limit: number;
    offset: number;
    count: number;
    total?: number;
    results: Product[];
}
