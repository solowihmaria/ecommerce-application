import type { Image } from '../../../../../types/product.types';

export interface BigSliderProps {
    currentSlide: number;
    images: Image[];
    closeModal: () => void;
}
