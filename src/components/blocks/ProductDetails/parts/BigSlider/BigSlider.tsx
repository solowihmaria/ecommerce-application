import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import type SwiperType from 'swiper';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/css/thumbs';
import styles from './BigSlider.module.scss';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { MiniSlideContent } from '../MiniSlideContent/MiniSlideContent';
import type { BigSliderProps } from './BigSlider.types';

export const BigSlider = ({
    currentSlide,
    images,
    closeModal,
}: BigSliderProps) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [currentMiniSlide, setCurrentMiniSlide] = useState(currentSlide);

    return (
        <div className={styles.modalBackground}>
            <span
                className={styles.close}
                onClick={() => closeModal()}
                aria-hidden="true"
            >
                <IoMdClose className={styles.closeIcon} onClick={closeModal} />
            </span>

            <div className={styles.modal}>
                <div className={styles.sliderContainer}>
                    {images.length > 1 && (
                        <div className={styles.smallSwiperContainer}>
                            <Swiper
                                simulateTouch={true}
                                onSwiper={setThumbsSwiper}
                                pagination={{ clickable: true }}
                                slidesPerView={3}
                                spaceBetween={2}
                                direction="vertical"
                                modules={[Navigation, Pagination, Thumbs]}
                                className={styles.smallSwiper}
                            >
                                {images.map((image, index) => {
                                    return (
                                        <SwiperSlide
                                            className={styles.slideSmall}
                                            key={`${image.url}${image.label}`}
                                        >
                                            <MiniSlideContent
                                                imageIndex={index}
                                                image={image}
                                                currentSlide={currentMiniSlide}
                                            />
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </div>
                    )}

                    <div className={styles.bigSliderContainer}>
                        {' '}
                        <Swiper
                            pagination={{ clickable: true }}
                            className={styles.slider}
                            navigation
                            modules={[Navigation, Pagination, Thumbs]}
                            loop={true}
                            initialSlide={currentSlide}
                            thumbs={{ swiper: thumbsSwiper }}
                            onSlideChange={(swiper) => {
                                setCurrentMiniSlide(swiper.realIndex);
                            }}
                        >
                            {images.map((image) => {
                                return (
                                    <SwiperSlide
                                        className={styles.slideContainer}
                                        key={`${image.url}${image.label}`}
                                    >
                                        <div className={styles.imageContainer}>
                                            <img
                                                src={image.url}
                                                alt={image.label}
                                                className={styles.imageClass}
                                            ></img>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    );
};
