import type { Sizes, Light, Care } from '../../types/product.types';
import type { Variant, CustomVariant } from '../../types/product.types';

export interface ProductResponse {
    id: string;
    masterData: {
        current: {
            name: {
                'en-US': string;
            };
            description: {
                'en-US': string;
            };
            slug: {
                'en-US': string;
            };
            masterVariant: Variant;
            variants: Variant[];
        };
    };
}

export type AttributesList = (
    | [string, string]
    | [string, Sizes]
    | [string, Care]
    | [string, boolean]
    | [string, Light]
    | [string, number]
)[];

export interface CustomProduct {
    id: string;
    name: string;
    description: string;
    masterVariant: CustomVariant;
    variants: CustomVariant[];
}

export interface CustomAttributes {
    family: string;
    size: Sizes;
    'care-level': Care;
    toxic: boolean;
    height: number;
    'light-requirements': Light;
}
