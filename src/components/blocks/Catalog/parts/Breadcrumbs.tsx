import { FaHome } from 'react-icons/fa';
import styles from '../Catalog.module.scss';
import { Link, useLocation } from 'react-router-dom';

const formatPathname = (pathname: string) => {
    const res =
        `${pathname.slice(0, 1).toUpperCase()}${pathname.slice(1)}`.replace(
            /-/g,
            ' '
        );

    return res;
};

export const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(Boolean);

    const breadcrumbsParts = pathnames.map((pathname, index) => {
        const to = '/' + pathnames.slice(0, index + 1).join('/');

        return (
            <span key={to}>
                <Link to={to} className={styles.breadcrumb}>
                    {formatPathname(pathname)}
                </Link>
                {index < pathnames.length - 1 && ' / '}
            </span>
        );
    });

    return (
        <nav>
            <Link to="/" className={styles.breadcrumb}>
                <FaHome className={styles.homeIcon} />
            </Link>{' '}
            / {breadcrumbsParts.length > 0 ? breadcrumbsParts : 'Catalog'}
        </nav>
    );
};
