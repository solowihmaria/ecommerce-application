import clsx from 'clsx';
import styles from '../Catalog.module.scss';
import { Button } from '../../../ui/Button';

interface PaginationProps {
    totalPages: number;
    page: number;
    setPage: (page: number) => void;
}

export const Pagination = ({ totalPages, page, setPage }: PaginationProps) => {
    const pages = new Array(totalPages).fill(0).map((_, index) => index + 1);

    return (
        <div className={styles.paginationWrapper}>
            {pages.map((num) => (
                <Button
                    variant="outline"
                    key={num}
                    className={
                        num === page
                            ? clsx(styles.paginationButton, styles.selected)
                            : styles.paginationButton
                    }
                    onClick={() => setPage(num)}
                >
                    {num}
                </Button>
            ))}
        </div>
    );
};
