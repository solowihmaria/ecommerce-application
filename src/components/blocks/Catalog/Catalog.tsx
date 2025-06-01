import { useEffect, useState, type FormEvent } from 'react';
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
import { Input } from '../../ui/Input';

export const Catalog = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sort, setSort] = useState<string>('');
    const [searchInput, setSearchInput] = useState<string>('');
    const [query, setQuery] = useState<string>('');
    const [filters, setFilters] = useState<Filter>({
        categoryId: '',
        // size: '',
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

    return (
        <div className={styles.listContainer}>
            <div className={styles.controls}>
                <div className={styles.filtersBlock}>
                    <div className={styles.filterGroup}>
                        <Label
                            htmlFor="care-level"
                            className={styles.sortingLabel}
                        >
                            Care level
                        </Label>
                        <Select
                            className={styles.select}
                            name="care-level"
                            value={filters.careLevel}
                            onChange={(event) =>
                                setFilters((prev) => ({
                                    ...prev,
                                    careLevel: event.target.value,
                                }))
                            }
                        >
                            <option value="">Any</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </Select>
                    </div>
                    <div className={styles.filterGroup}>
                        <Label htmlFor="light" className={styles.sortingLabel}>
                            Light requirements
                        </Label>
                        <Select
                            className={styles.select}
                            name="light"
                            value={filters.light}
                            onChange={(event) =>
                                setFilters((prev) => ({
                                    ...prev,
                                    light: event.target.value,
                                }))
                            }
                        >
                            <option value="">Any</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </Select>
                    </div>

                    <div className={styles.filterGroup}>
                        <Label
                            htmlFor="toxicity"
                            className={styles.sortingLabel}
                        >
                            Toxicity
                        </Label>
                        <Select
                            className={styles.select}
                            name="toxicity"
                            value={filters.toxicity}
                            onChange={(event) =>
                                setFilters((prev) => ({
                                    ...prev,
                                    toxicity: event.target.value,
                                }))
                            }
                        >
                            <option value="">Any</option>
                            <option value="false">Safe</option>
                            <option value="true">Toxic</option>
                        </Select>
                    </div>

                    <div className={styles.filterGroup}>
                        <Label
                            htmlFor="price-from"
                            className={styles.sortingLabel}
                        >
                            Price from
                        </Label>
                        <Input
                            className={styles.select}
                            name="price-from"
                            type="number"
                            value={filters.priceRange[0]}
                            onChange={(event) =>
                                setFilters((prev) => ({
                                    ...prev,
                                    priceRange: [
                                        Number(event.target.value),
                                        prev.priceRange[1],
                                    ],
                                }))
                            }
                        />
                        <Label
                            htmlFor="price-to"
                            className={styles.sortingLabel}
                        >
                            to
                        </Label>
                        <Input
                            className={styles.select}
                            name="price-to"
                            type="number"
                            value={filters.priceRange[1]}
                            onChange={(event) =>
                                setFilters((prev) => ({
                                    ...prev,
                                    priceRange: [
                                        prev.priceRange[0],
                                        Number(event.target.value),
                                    ],
                                }))
                            }
                        />
                    </div>

                    <div className={styles.filterGroup}>
                        <Label
                            htmlFor="height-from"
                            className={styles.sortingLabel}
                        >
                            Height (cm) from
                        </Label>
                        <Input
                            className={styles.select}
                            name="height-from"
                            type="number"
                            value={filters.height[0]}
                            onChange={(event) =>
                                setFilters((prev) => ({
                                    ...prev,
                                    height: [
                                        Number(event.target.value),
                                        prev.height[1],
                                    ],
                                }))
                            }
                        />
                        <Label
                            htmlFor="height-to"
                            className={styles.sortingLabel}
                        >
                            to
                        </Label>
                        <Input
                            className={styles.select}
                            name="height-to"
                            type="number"
                            value={filters.height[1]}
                            onChange={(event) =>
                                setFilters((prev) => ({
                                    ...prev,
                                    height: [
                                        prev.height[0],
                                        Number(event.target.value),
                                    ],
                                }))
                            }
                        />
                    </div>
                </div>

                <div className={styles.searchSortBlock}>
                    <div className={styles.sortingBlock}>
                        <Label htmlFor="sort" className={styles.sortingLabel}>
                            Sort by
                        </Label>
                        <Select
                            name="sort"
                            value={sort}
                            onChange={(event) => setSort(event.target.value)}
                        >
                            <option value="">Default</option>
                            <option value="name.en-US asc">Name A → Z</option>
                            <option value="name.en-US desc">Name Z → A</option>
                            <option value="price asc">Price Low → High</option>
                            <option value="price desc">Price High → Low</option>
                        </Select>
                    </div>

                    <SearchInput
                        handleSubmit={handleSearch}
                        handleChange={(e) => {
                            if (e.target instanceof HTMLInputElement) {
                                setSearchInput(e.target.value);
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
    );
};

function handleSearch(event: FormEvent) {
    event.preventDefault();
}
