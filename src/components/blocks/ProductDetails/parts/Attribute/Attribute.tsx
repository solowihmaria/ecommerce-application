import styles from './Attribute.module.scss';
import type { AttributeProps } from './Attribute.types';

export const Attribute = ({ component, name, value }: AttributeProps) => {
    return (
        <div data-testid="attribute" className={styles.attributeContainer}>
            <span className={styles.iconContainer}>{component}</span>
            <div>
                <p className={styles.attributeText}>{name}</p>
                <p className={styles.attributeText}>{value}</p>
            </div>
        </div>
    );
};
