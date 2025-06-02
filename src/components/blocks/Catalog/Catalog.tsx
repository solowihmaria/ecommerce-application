import { useEffect, useState } from 'react';
import styles from './Catalog.module.scss';
import { ProductList } from './parts/ProductList/ProductList';
import type {
    Filter,
    Product,
} from '../../../api/getProducts/getProducts.types';
import { getProducts } from '../../../api/getProducts/getProducts';
import { Select } from '../../ui/Select';
import { Label } from '../../ui/Label';
import { SearchInput } from './parts/SearchInput/SearchInput';
import { FiFrown } from 'react-icons/fi';
import { Filters } from './parts/FIlters';
import type { Category } from '../../../api/getCategories/getCategories.types';
import { getCategories } from '../../../api/getCategories/getCategories';
import { Categories } from './parts/Categories';
import { Breadcrumbs } from './parts/Breadcrumbs';

export const Catalog = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sort, setSort] = useState<string>('');
    const [searchInput, setSearchInput] = useState<string>('');
    const [query, setQuery] = useState<string>('');
    // const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    //     null
    // );
    const [filters, setFilters] = useState<Filter>({
        categoryId: '',
        careLevel: '',
        light: '',
        toxicity: '',
        priceRange: [0, 100],
        height: [0, 200],
    });

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data: Product[] = await getProducts({
                    sort,
                    query,
                    filters,
                });
                setProducts(data);
            } catch (error) {
                console.log('ERROR', error);
                setError('Failed to load products');
            } finally {
                setIsLoading(false);
            }
        };

        void loadProducts();
    }, [sort, query, filters]);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data: Category[] = await getCategories();
                setCategories(data);
            } catch (error) {
                console.log('ERROR', error);
                setError('Failed to load categories');
            } finally {
                setIsLoading(false);
            }
        };

        void loadCategories();
    }, []);

    // Задержка для оптимизации количества запросов при вводе в поле поиска
    useEffect(() => {
        const timeout = setTimeout(() => {
            setQuery(searchInput);
        }, 500);

        return () => clearTimeout(timeout);
    }, [searchInput]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <div className={styles.error}>
                <FiFrown className={styles.errorIcon} />
                <span>{error}</span>
            </div>
        );
    }

    function resetFilters() {
        setFilters({
            categoryId: '',
            careLevel: '',
            light: '',
            toxicity: '',
            priceRange: [0, 100],
            height: [0, 200],
        });
    }

    return (
        <div>
            <Breadcrumbs categories={categories} resetFilters={resetFilters} />

            <div className={styles.catalogContainer}>
                <div className={styles.controls}>
                    <Categories
                        categories={categories}
                        setFilters={setFilters}
                    />
                    <Filters
                        filters={filters}
                        setFilters={setFilters}
                        resetFilters={resetFilters}
                    />
                </div>

                <div className={styles.listContainer}>
                    <div className={styles.searchSortBlock}>
                        <div className={styles.sortingBlock}>
                            <Label
                                htmlFor="sort"
                                className={styles.sortingLabel}
                            >
                                Sort by
                            </Label>
                            <Select
                                name="sort"
                                value={sort}
                                onChange={(event) =>
                                    setSort(event.target.value)
                                }
                            >
                                <option value="">Default</option>
                                <option value="name.en-US asc">
                                    Name A → Z
                                </option>
                                <option value="name.en-US desc">
                                    Name Z → A
                                </option>
                                <option value="price asc">
                                    Price Low → High
                                </option>
                                <option value="price desc">
                                    Price High → Low
                                </option>
                            </Select>
                        </div>

                        <div className={styles.sortingBlock}>
                            <SearchInput
                                handleSubmit={(event) => {
                                    event.preventDefault();
                                }}
                                handleChange={(event) => {
                                    if (
                                        event.target instanceof HTMLInputElement
                                    ) {
                                        setSearchInput(event.target.value);
                                    }
                                }}
                            />
                        </div>
                    </div>

                    {products.length === 0 ? (
                        <div>No products found</div>
                    ) : (
                        <ProductList products={products} />
                    )}
                </div>
            </div>
        </div>
    );
};
