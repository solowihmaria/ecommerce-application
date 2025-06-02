import { FaHome } from 'react-icons/fa';
import styles from '../Catalog.module.scss';
import { Link, useLocation } from 'react-router-dom';
import type { Category } from '../../../../api/getCategories/getCategories.types';

const formatPathname = (pathname: string) => {
    return `${pathname.slice(0, 1).toUpperCase()}${pathname.slice(1)}`;
};

interface BreadcrumbsProps {
    categories: Category[];
    resetFilters: () => void;
}

export const Breadcrumbs = ({ categories, resetFilters }: BreadcrumbsProps) => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(Boolean);

    const breadcrumbsParts = pathnames.map((pathname, index) => {
        const to = '/' + pathnames.slice(0, index + 1).join('/');

        return (
            <span key={to}>
                <Link
                    to={to}
                    className={styles.breadcrumb}
                    onClick={resetFilters}
                >
                    {categories.find((cat) => cat.slug['en-US'] === pathname)
                        ?.name['en-US'] || formatPathname(pathname)}
                </Link>
                {index < pathnames.length - 1 && ' / '}
            </span>
        );
    });

    return (
        <nav className={styles.breadcrumbs}>
            <Link to="/" className={styles.breadcrumb}>
                <FaHome className={styles.homeIcon} />
            </Link>{' '}
            / {breadcrumbsParts.length > 0 ? breadcrumbsParts : 'Catalog'}
        </nav>
    );
};
