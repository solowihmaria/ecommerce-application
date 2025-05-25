import styles from '../ProductDetails.module.scss';
import LightIcon from '../../../../assets/icons/light.svg';
import type { Light } from './../../../../api/product/product.types';

export const LightAttribute = ({ light }: { light: Light }) => {
    return (
        <div className={styles.attributeContainer}>
            <span className={styles.iconContainer}>
                <LightIcon className={styles.icon} />
            </span>
            <div>
                <p className={styles.attributeText}>Light</p>
                <p className={styles.attributeText}>{light}</p>
            </div>
        </div>
    );
};
