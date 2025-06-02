import type { Image } from '../../../../../api/product/product.types';

export interface BigSliderProps {
    currentSlide: number;
    images: Image[];
    closeModal: () => void;
}
