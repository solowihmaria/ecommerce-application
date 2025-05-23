export interface ImagesSliderProps {
    images: SlideImage[];
    imageClass?: string;
}

interface SlideImage {
    id: number;
    image: string;
}
