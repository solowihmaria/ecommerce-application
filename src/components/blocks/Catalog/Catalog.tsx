import styles from './Catalog.module.scss';
import { ProductList } from './parts/ProductList';
import { Select } from '../../ui/Select';
import { Label } from '../../ui/Label';
import { SearchInput } from './parts/SearchInput/SearchInput';
import { FiFrown } from 'react-icons/fi';
import { Filters } from './parts/FIlters';
import { Categories } from './parts/Categories';
import { Breadcrumbs } from './parts/Breadcrumbs';
import { useCatalog } from './lib/useCatalog';

export const Catalog = () => {
    const {
        products,
        categories,
        isLoading,
        error,
        sort,
        setSort,
        setSearchInput,
        filters,
        setFilters,
        resetFilters,
    } = useCatalog();

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
