import type { Image } from '../../../types/product.types';

export interface ImagesSliderProps {
    images: Image[];
    initialSlide: number;
    imageClass?: string;
    containerClass: string;
    showModal?: (index: number) => void;
}
