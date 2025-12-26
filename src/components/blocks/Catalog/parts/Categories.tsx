import styles from '../Catalog.module.scss';
import type { Category } from '../../../../api/catalog/catalog.types';
import { Heading } from '../../../ui/Heading';
import { Link } from 'react-router-dom';
import type { Filter } from '../../../../api/catalog/catalog.types';

interface CategoriesProps {
    categories: Category[];
    setFilters: React.Dispatch<React.SetStateAction<Filter>>;
    setPage: (value: number) => void;
}

export const Categories = ({
    categories,
    setFilters,
    setPage,
}: CategoriesProps) => {
    function handleCategoryClick(categoryId: string) {
        setFilters((prev) => ({ ...prev, categoryId: categoryId }));
        setPage(1);
    }

    return (
        <nav className={styles.categoryBlock}>
            <Heading level="h3">Category</Heading>

            <ul className={styles.categoriesList}>
                {categories
                    .filter((category) => category.ancestors.length === 0)
                    .map((category) => {
                        return (
                            <li key={category.id}>
                                <Link
                                    to={`/catalog/${category.slug?.['en-US']}`}
                                    className={styles.categoryItem}
                                    onClick={() =>
                                        handleCategoryClick(category.id)
                                    }
                                >
                                    {category.name['en-US']}
                                </Link>

                                <ul className={styles.subcategoriesList}>
                                    {categories
                                        .filter(
                                            (cat) =>
                                                cat.ancestors?.[0]?.id ===
                                                category.id
                                        )
                                        .map((subcat) => (
                                            <li key={subcat.id}>
                                                <Link
                                                    to={`/catalog/${category.slug?.['en-US']}/${subcat.slug?.['en-US']}`}
                                                    onClick={() =>
                                                        handleCategoryClick(
                                                            subcat.id
                                                        )
                                                    }
                                                    className={
                                                        styles.subcategoryItem
                                                    }
                                                >
                                                    {subcat.name['en-US']}
                                                </Link>
                                            </li>
                                        ))}
                                </ul>
                            </li>
                        );
                    })}
            </ul>
        </nav>
    );
};
