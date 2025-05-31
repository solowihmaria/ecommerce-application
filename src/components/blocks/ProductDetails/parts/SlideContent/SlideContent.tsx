import styles from './../BigSlider/BigSlider.module.scss';
import clsx from 'clsx';
export const SlideContent = ({
    image,
    imageIndex,
    currentSlide,
}: {
    image: { url: string; label: string };
    imageIndex: number;
    currentSlide: number;
}) => {
    return currentSlide === imageIndex ? (
        <div
            className={clsx(
                styles.activeMiniSlide,
                styles.imageContainer,
                styles.miniImageContainer
            )}
        >
            <img
                src={image.url}
                alt={image.label}
                aria-hidden="true"
                className={styles.smallImage}
            ></img>
        </div>
    ) : (
        <div className={clsx(styles.imageContainer, styles.miniImageContainer)}>
            <img
                src={image.url}
                alt={image.label}
                aria-hidden="true"
                className={styles.smallImage}
            ></img>
        </div>
    );
};
