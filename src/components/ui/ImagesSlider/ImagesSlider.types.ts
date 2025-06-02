import type { Image } from './../../../api/product/product.types';

export interface ImagesSliderProps {
    images: Image[];
    initialSlide: number;
    imageClass?: string;
    containerClass: string;
    showModal?: (index: number) => void;
}
