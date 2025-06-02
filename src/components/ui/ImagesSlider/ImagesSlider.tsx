import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import type { ImagesSliderProps } from './ImagesSlider.types';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/css/thumbs';
import './ImagesSlider.module.scss';

import styles from './ImagesSlider.module.scss';

export const Slider = ({
    images,
    initialSlide,
    showModal,
    imageClass,
    containerClass,
}: ImagesSliderProps) => {
    return (
        <div className={styles.test}>
            <Swiper
                className={styles.slider}
                navigation
                modules={[Navigation, Pagination]}
                loop={true}
                initialSlide={initialSlide}
                pagination={{ clickable: true }}
            >
                {images.map((image, index) => {
                    return (
                        <SwiperSlide
                            className={styles.slideContainer}
                            key={`${image.url}${image.label}`}
                        >
                            <div className={containerClass}>
                                <img
                                    src={image.url}
                                    alt={image.label}
                                    onClick={() => {
                                        if (showModal) {
                                            showModal(index);
                                        }
                                    }}
                                    aria-hidden="true"
                                    className={imageClass}
                                ></img>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};
