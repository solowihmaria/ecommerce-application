import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { ImagesSliderProps } from './ImagesSlider.types';

import 'swiper/scss';
import 'swiper/scss/navigation';
import './ImagesSlider.module.scss';
import styles from './ImagesSlider.module.scss';

export const Slider = ({ images }: ImagesSliderProps) => {
    return (
        <Swiper className={styles.slider} navigation modules={[Navigation]}>
            {images.map((image) => {
                return (
                    <SwiperSlide key={`${image.url}${image.label}`}>
                        <div
                            className={styles.imageContainer}
                            style={{ backgroundImage: `url(${image.url})` }}
                        ></div>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
};
