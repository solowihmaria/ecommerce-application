import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import type { CustomCart } from '../../../../../api/cart/cart.types';
import { Care, Light, Sizes } from '../../../../../types/product.types';
import { TotalPrice } from './TotalPrice';

const cartDataWithoutSale: CustomCart = {
    id: 'fc0e74c0-4c34-4fe0-9e93-192960bffc70',
    customerId: 'cd5a7b69-fa67-4ec6-bcc8-a65a846ab202',
    version: 6,
    lineItems: [
        {
            id: '594a55d1-ce76-46f7-ab10-1d02757e7a06',
            productId: '1ac83f8e-06b3-4ce7-b6c9-c6eb8af28f78',
            name: 'Polka Dot Begonia',
            quantity: 2,
            totalPrice: 44,
            variant: {
                id: 1,
                sku: 'BEGONIA032S',
                price: 22,
                discount: null,
                images: [
                    {
                        url: 'https://images.cdn.europe-west1.gcp.commercetools.com/6d0a8854-2112-4168-a8ea-ae8880496080/Polka%20Dot%20Begonia-rtB-G5WT.jpg',
                        label: 'Polka Dot Begonia',
                        dimensions: {
                            w: 1080,
                            h: 1080,
                        },
                    },
                    {
                        url: 'https://images.cdn.europe-west1.gcp.commercetools.com/6d0a8854-2112-4168-a8ea-ae8880496080/Polka%20Dot%20Begonia-2-nUiiWwzr.jpg',
                        label: 'Polka Dot Begonia',
                        dimensions: {
                            w: 1080,
                            h: 1080,
                        },
                    },
                    {
                        url: 'https://images.cdn.europe-west1.gcp.commercetools.com/6d0a8854-2112-4168-a8ea-ae8880496080/Polka%20Dot%20Begonia-4-B7ePuLdA.jpg',
                        label: 'Polka Dot Begonia',
                        dimensions: {
                            w: 1080,
                            h: 1080,
                        },
                    },
                    {
                        url: 'https://images.cdn.europe-west1.gcp.commercetools.com/6d0a8854-2112-4168-a8ea-ae8880496080/Polka%20Dot%20Begonia-3--szdI4it.jpg',
                        label: 'Polka Dot Begonia',
                        dimensions: {
                            w: 1080,
                            h: 1080,
                        },
                    },
                ],
                family: 'Begonia (Maculata)',
                size: Sizes.small,
                care: Care.medium,
                toxic: true,
                light: Light.low,
                height: 30,
            },
            discountedPricePerQuantity: null,
        },
        {
            id: '6c0eb8ef-0913-4918-9688-eb841c1a34eb',
            productId: 'd711295e-8b08-48a9-ad71-d72bfc709198',
            name: 'Nerve Plant',
            quantity: 1,
            totalPrice: 12,
            variant: {
                id: 1,
                sku: 'FITTONIA033S',
                price: 12,
                discount: null,
                images: [
                    {
                        url: 'https://images.cdn.europe-west1.gcp.commercetools.com/6d0a8854-2112-4168-a8ea-ae8880496080/Nerve%20Plant-raO6u9Q8.jpg',
                        label: 'Nerve Plant',
                        dimensions: {
                            w: 1080,
                            h: 1080,
                        },
                    },
                    {
                        url: 'https://images.cdn.europe-west1.gcp.commercetools.com/6d0a8854-2112-4168-a8ea-ae8880496080/Nerve%20Plant-2-rAd-Mb2a.jpg',
                        label: 'Nerve Plant',
                        dimensions: {
                            w: 1080,
                            h: 1080,
                        },
                    },
                    {
                        url: 'https://images.cdn.europe-west1.gcp.commercetools.com/6d0a8854-2112-4168-a8ea-ae8880496080/Nerve%20Plant-3-VRRl5yGn.jpg',
                        label: 'Nerve Plant',
                        dimensions: {
                            w: 1080,
                            h: 1080,
                        },
                    },
                ],
                family: 'Fittonia (Albivenis)',
                size: Sizes.small,
                care: Care.medium,
                toxic: true,
                light: Light.low,
                height: 10,
            },
            discountedPricePerQuantity: null,
        },
    ],
    totalLineItemQuantity: 3,
    totalPrice: 56,
    discountCodes: [],
    discountOnTotalPrice: null,
};

const cartDataWithSale: CustomCart = {
    id: 'fc0e74c0-4c34-4fe0-9e93-192960bffc70',
    customerId: 'cd5a7b69-fa67-4ec6-bcc8-a65a846ab202',
    version: 17,
    lineItems: [
        {
            id: '594a55d1-ce76-46f7-ab10-1d02757e7a06',
            productId: '1ac83f8e-06b3-4ce7-b6c9-c6eb8af28f78',
            name: 'Polka Dot Begonia',
            quantity: 2,
            totalPrice: 44,
            variant: {
                id: 1,
                sku: 'BEGONIA032S',
                price: 22,
                discount: null,
                images: [
                    {
                        url: 'https://images.cdn.europe-west1.gcp.commercetools.com/6d0a8854-2112-4168-a8ea-ae8880496080/Polka%20Dot%20Begonia-rtB-G5WT.jpg',
                        label: 'Polka Dot Begonia',
                        dimensions: {
                            w: 1080,
                            h: 1080,
                        },
                    },
                    {
                        url: 'https://images.cdn.europe-west1.gcp.commercetools.com/6d0a8854-2112-4168-a8ea-ae8880496080/Polka%20Dot%20Begonia-2-nUiiWwzr.jpg',
                        label: 'Polka Dot Begonia',
                        dimensions: {
                            w: 1080,
                            h: 1080,
                        },
                    },
                    {
                        url: 'https://images.cdn.europe-west1.gcp.commercetools.com/6d0a8854-2112-4168-a8ea-ae8880496080/Polka%20Dot%20Begonia-4-B7ePuLdA.jpg',
                        label: 'Polka Dot Begonia',
                        dimensions: {
                            w: 1080,
                            h: 1080,
                        },
                    },
                    {
                        url: 'https://images.cdn.europe-west1.gcp.commercetools.com/6d0a8854-2112-4168-a8ea-ae8880496080/Polka%20Dot%20Begonia-3--szdI4it.jpg',
                        label: 'Polka Dot Begonia',
                        dimensions: {
                            w: 1080,
                            h: 1080,
                        },
                    },
                ],
                family: 'Begonia (Maculata)',
                size: Sizes.small,
                care: Care.medium,
                toxic: true,
                light: Light.high,
                height: 30,
            },
            discountedPricePerQuantity: null,
        },
        {
            id: '6c0eb8ef-0913-4918-9688-eb841c1a34eb',
            productId: 'd711295e-8b08-48a9-ad71-d72bfc709198',
            name: 'Nerve Plant',
            quantity: 1,
            totalPrice: 12,
            variant: {
                id: 1,
                sku: 'FITTONIA033S',
                price: 12,
                discount: null,
                images: [
                    {
                        url: 'https://images.cdn.europe-west1.gcp.commercetools.com/6d0a8854-2112-4168-a8ea-ae8880496080/Nerve%20Plant-raO6u9Q8.jpg',
                        label: 'Nerve Plant',
                        dimensions: {
                            w: 1080,
                            h: 1080,
                        },
                    },
                    {
                        url: 'https://images.cdn.europe-west1.gcp.commercetools.com/6d0a8854-2112-4168-a8ea-ae8880496080/Nerve%20Plant-2-rAd-Mb2a.jpg',
                        label: 'Nerve Plant',
                        dimensions: {
                            w: 1080,
                            h: 1080,
                        },
                    },
                    {
                        url: 'https://images.cdn.europe-west1.gcp.commercetools.com/6d0a8854-2112-4168-a8ea-ae8880496080/Nerve%20Plant-3-VRRl5yGn.jpg',
                        label: 'Nerve Plant',
                        dimensions: {
                            w: 1080,
                            h: 1080,
                        },
                    },
                ],
                family: 'Fittonia (Albivenis)',
                size: Sizes.small,
                care: Care.medium,
                toxic: true,
                light: Light.high,
                height: 10,
            },
            discountedPricePerQuantity: null,
        },
        {
            id: 'ceb1222a-7c64-40a5-a9cb-0211879fe6cf',
            productId: 'f6f3900d-d29f-4e8f-a84e-af150b3a07a2',
            name: 'Fiddle Leaf Fig',
            quantity: 3,
            totalPrice: 94.5,
            variant: {
                id: 1,
                sku: 'FIDDLE002S',
                price: 35,
                discount: 31.5,
                images: [
                    {
                        url: 'https://images.cdn.europe-west1.gcp.commercetools.com/6d0a8854-2112-4168-a8ea-ae8880496080/FiddleleafFigBush-BHhgm44f.png',
                        label: 'Fiddle Leaf Fig',
                        dimensions: {
                            w: 1000,
                            h: 1000,
                        },
                    },
                ],
                family: 'Ficus (Lyrata)',
                size: Sizes.small,
                care: Care.medium,
                toxic: true,
                light: Light.high,
                height: 45,
            },
            discountedPricePerQuantity: null,
        },
    ],
    totalLineItemQuantity: 6,
    totalPrice: 150.5,
    discountCodes: [],
    discountOnTotalPrice: null,
};

describe('<TotalPrice/> component', () => {
    test('Render TotalPrice component when no products on sale', () => {
        render(<TotalPrice cartContent={cartDataWithoutSale} />);

        const totalContainer = screen.getByTestId('total-attribute');
        const totalElement = screen.getByTestId('total-attribute-without-sale');

        expect(totalContainer).toBeInTheDocument();
        expect(totalElement).toBeInTheDocument();
        expect(totalContainer).toMatchSnapshot();
    });

    test('Render TotalPrice component when there are products on sale', () => {
        render(<TotalPrice cartContent={cartDataWithSale} />);

        const totalContainer = screen.getByTestId('total-attribute');
        const totalElementOld = screen.getByTestId(
            'total-attribute-with-sale-old'
        );
        const totalElementNew = screen.getByTestId(
            'total-attribute-with-sale-new'
        );

        expect(totalContainer).toBeInTheDocument();
        expect(totalElementOld).toBeInTheDocument();
        expect(totalElementNew).toBeInTheDocument();

        expect(totalContainer).toMatchSnapshot();
    });
});
