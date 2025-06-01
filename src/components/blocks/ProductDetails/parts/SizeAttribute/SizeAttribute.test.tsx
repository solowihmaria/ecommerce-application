import { render, screen } from '@testing-library/react';
import { Care, Light, Sizes } from '../../../../../api/product/product.types';
import type { CustomProduct } from '../../../../../api/product/product.types';
import { SizeAttribute } from './SizeAttribute';
import '@testing-library/jest-dom';

const product: CustomProduct = {
    id: '1676d70b-87b1-478c-a71b-bfedb3756ba7',
    name: 'Monstera Deliciosa',
    description:
        "The iconic Monstera Deliciosa, also known as the Swiss Cheese Plant, is beloved for its dramatic split leaves and easy-going nature. This tropical beauty develops its characteristic fenestrations (holes) as it matures, creating a stunning architectural presence in any room. Native to Central America, it's perfect for beginners and thrives in medium light conditions. Keep away from pets and children as it's mildly toxic when ingested.",
    masterVariant: {
        id: 1,
        sku: 'MONSTERA001S',
        price: 25,
        discount: 22.5,
        images: [
            {
                url: 'https://images.cdn.europe-west1.gcp.commercetools.com/6d0a8854-2112-4168-a8ea-ae8880496080/Monstera%20Deliciosa-2-miBul_l2.jpg',
                label: 'Monstera Deliciosa',
                dimensions: {
                    w: 1080,
                    h: 1080,
                },
            },
            {
                url: 'https://images.cdn.europe-west1.gcp.commercetools.com/6d0a8854-2112-4168-a8ea-ae8880496080/Monstera%20Deliciosa-3-adC1Gs9C.jpg',
                label: 'Monstera Deliciosa',
                dimensions: {
                    w: 1080,
                    h: 1080,
                },
            },
            {
                url: 'https://images.cdn.europe-west1.gcp.commercetools.com/6d0a8854-2112-4168-a8ea-ae8880496080/Monstera%20Deliciosa-4-YadbLJJ_.jpg',
                label: 'Monstera Deliciosa',
                dimensions: {
                    w: 1080,
                    h: 1080,
                },
            },
        ],
        family: 'Monstera (Deliciosa)',
        size: Sizes.small,
        care: Care.easy,
        toxic: true,
        light: Light.medium,
        height: 30,
    },
    variants: [
        {
            id: 2,
            sku: 'MONSTERA001M',
            price: 45,
            discount: 40.5,
            images: [
                {
                    url: 'https://images.cdn.europe-west1.gcp.commercetools.com/6d0a8854-2112-4168-a8ea-ae8880496080/Monstera%20Deliciosa-w-NcF8G7UQ.jpg',
                    dimensions: {
                        w: 1200,
                        h: 1200,
                    },
                    label: 'image',
                },
            ],
            family: 'Monstera (Deliciosa)',
            size: Sizes.medium,
            care: Care.easy,
            toxic: true,
            light: Light.medium,
            height: 60,
        },
        {
            id: 3,
            sku: 'MONSTERA001L',
            price: 75,
            discount: 67.5,
            images: [
                {
                    url: 'https://images.cdn.europe-west1.gcp.commercetools.com/6d0a8854-2112-4168-a8ea-ae8880496080/1646961625_2-idei-cl-YUC5vGX0.jpg',
                    label: 'Monstera Deliciosa-large',
                    dimensions: {
                        w: 3024,
                        h: 4032,
                    },
                },
                {
                    url: 'https://images.cdn.europe-west1.gcp.commercetools.com/6d0a8854-2112-4168-a8ea-ae8880496080/63871a909af0d3409749-iV6fJFu7.jpg',
                    label: 'Monstera Deliciosa-large',
                    dimensions: {
                        w: 1200,
                        h: 1200,
                    },
                },
            ],
            family: 'Monstera (Deliciosa)',
            size: Sizes.large,
            care: Care.easy,
            toxic: true,
            light: Light.medium,
            height: 120,
        },
    ],
};

describe('<SizeAttribute/> component', () => {
    test('Render SizeAttribute component', () => {
        const onClick = jest.fn();
        render(
            <SizeAttribute
                product={product}
                currentProductVariant={product.masterVariant}
                onSizeChange={onClick}
            />
        );

        const size = screen.getByTestId('size-attribute');

        expect(size).toBeInTheDocument();
        expect(size).toMatchSnapshot();
    });
});
