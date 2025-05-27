import styles from '../ProductDetails.module.scss';

export const Attribute = ({
    component,
    name,
    value,
}: {
    component: React.ReactNode;
    name: string;
    value: string | number;
}) => {
    return (
        <div className={styles.attributeContainer}>
            <span className={styles.iconContainer}>{component}</span>
            <div>
                <p className={styles.attributeText}>{name}</p>
                <p className={styles.attributeText}>{value}</p>
            </div>
        </div>
    );
};
