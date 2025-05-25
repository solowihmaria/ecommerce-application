import styles from '../ProductDetails.module.scss';
import ToxicityIcon from '../../../../assets/icons/toxicity.svg';

export const ToxicityAttribute = ({ toxicity }: { toxicity: boolean }) => {
    return (
        <div className={styles.attributeContainer}>
            <span className={styles.iconContainer}>
                <ToxicityIcon className={styles.icon} />
            </span>
            <div>
                {' '}
                <p className={styles.attributeText}>Toxicity: </p>
                {toxicity ? (
                    <p className={styles.attributeText}>Toxic</p>
                ) : (
                    <p className={styles.attributeText}>No Toxic</p>
                )}
            </div>
        </div>
    );
};
