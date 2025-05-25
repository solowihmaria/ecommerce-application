import styles from '../ProductDetails.module.scss';
import CareIcon from '../../../../assets/icons/care.svg';
import type { Care } from './../../../../api/product/product.types';

export const CareAttribute = ({ care }: { care: Care }) => {
    return (
        <div className={styles.attributeContainer}>
            <span className={styles.iconContainer}>
                <CareIcon className={styles.icon} />
            </span>
            <div>
                <p className={styles.attributeText}>Care Level: </p>
                <p className={styles.attributeText}>{care}</p>
            </div>
        </div>
    );
};
