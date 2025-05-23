import { Slider } from '../../ui/ImagesSlider/ImagesSlider';
import styles from './ProductDetails.module.scss';
const images = [
    { id: 1, image: 'https://placehold.co/600x400' },
    { id: 2, image: 'https://placehold.co/600x400' },
];
export const ProductDetails = () => {
    return (
        <div className={styles.productDetailsContainer}>
            <div className={styles.imageContainer}>
                <Slider images={images} />
            </div>
            <div className={styles.productInfoContainer}>
                <div>
                    <h1>Product Title</h1>
                    <div>
                        <p>Placeholder: Placeholder</p>
                        <p>Placeholder: Placeholder</p>
                        <p>Placeholder: Placeholder</p>
                        <p>Cost: $10,00</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
