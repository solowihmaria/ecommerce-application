import styles from '../ProductDetails.module.scss';
import Height from '../../../../assets/images/height.png';

export const HeightAttribute = ({ height }: { height: number }) => {
    return (
        <div className={styles.attributeContainer}>
            <span className={styles.iconContainer}>
                <img src={Height} alt="height"></img>
            </span>
            <div>
                <p className={styles.attributeText}>Height: </p>
                <p className={styles.attributeText}>{height}</p>
            </div>
        </div>
    );
};
