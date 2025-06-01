import styles from './MiniSlideContent.module.scss';
import clsx from 'clsx';
import type { MiniSliderContentProps } from './MiniSliderContent.types';

export const MiniSlideContent = ({
    image,
    imageIndex,
    currentSlide,
}: MiniSliderContentProps) => {
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
