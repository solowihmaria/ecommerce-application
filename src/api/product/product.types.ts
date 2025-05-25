export enum Attributes {
    family = 'family',
    size = 'size',
    careLevel = 'care-level',
    toxic = 'toxic',
    lightRequirements = 'light-requirements',
    height = 'height',
}

/*export enum Sizes {
    small = 'S',
    medium = 'M',
    large = 'L',
}*/

export enum Care {
    easy = 'easy',
    medium = 'medium',
    hard = 'hard',
}

export enum Light {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

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

interface Variant {
    id: number;
    sku: string;
    prices: Price[];
    images: Image[];
    attributes: [
        FamilyAttribute,
        SizeAttribute,
        CareAttribute,
        ToxicAttribute,
        LightAttribute,
        HeightAttribute,
    ];
}

interface Price {
    id: string;
    value: {
        type: string;
        currencyCode: string;
        centAmount: number;
        fractionDigits: number;
    };
    key: string;
}

export interface Image {
    url: string;
    label: string;
    dimensions: {
        w: number;
        h: number;
    };
}

interface FamilyAttribute {
    name: Attributes.family;
    value: string;
}

interface SizeAttribute {
    name: Attributes.size;
    value: {
        key: string;
        label: string;
    };
}

interface CareAttribute {
    name: Attributes.careLevel;
    value: {
        key: Care;
        label: Care;
    };
}

interface ToxicAttribute {
    name: Attributes.toxic;
    value: boolean;
}

interface HeightAttribute {
    name: Attributes.height;
    value: number;
}

interface LightAttribute {
    name: Attributes.lightRequirements;
    value: {
        key: Light;
        label: Light;
    };
}

export interface CustomProduct {
    id: string;
    name: string;
    description: string;
    masterVariant: CustomVariant;
    variants: CustomVariant[];
}

export interface CustomVariant {
    id: number;
    sku: string;
    price: {
        value: number;
        currency: string;
    };
    images: Image[];
    family: string;
    size: string;
    care: Care;
    toxic: boolean;
    height: number;
    light: Light;
}
