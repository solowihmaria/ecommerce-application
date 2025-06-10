export enum DiscountKeys {
    Birthday = 'birthday_gift',
    First_Purchase = 'first_purchase',
    Plant_Trio_Deal = 'plant_trio',
}

export interface DiscountResponse {
    id: string;
    code: string;
    key: DiscountKeys;
}
