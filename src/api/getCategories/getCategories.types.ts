export interface CategoryPagedQueryResponse {
    limit: number;
    offset: number;
    count: number;
    total: number;
    results: Category[];
}

export interface Category {
    id: string;
    version: number;
    slug: { 'en-US': string };
    name: { 'en-US': string };
    description: { 'en-US': string };
    ancestors: CategoryReference[];
    parent: CategoryReference;
}

interface CategoryReference {
    id: string;
    typeId: 'category';
    obj: Category;
}
