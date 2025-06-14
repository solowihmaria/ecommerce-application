import { Heading } from '../../components/ui/Heading/Heading';
import styles from './BasketPage.module.scss';

export const BasketPage = () => {
    return (
        <div className={styles.basketPage}>
            <Heading level="h1" className={styles.title}>
                Basket Page
            </Heading>
        </div>
    );
};
