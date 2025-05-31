import { useEffect, useState, type FormEvent } from 'react';
import styles from './Catalog.module.scss';
import { ProductList } from './parts/ProductList/ProductList';
import type { Product } from '../../../api/getProducts/getProducts.types';
import { getProducts } from '../../../api/getProducts/getProducts';
import { Select } from '../../ui/Select';
import { Label } from '../../ui/Label';
import { SearchInput } from './parts/SearchInput/SearchInput';

export const Catalog = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sort, setSort] = useState<string>('');
    const [searchInput, setSearchInput] = useState<string>('');
    const [query, setQuery] = useState<string>('');

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data: Product[] = await getProducts(sort, query);
                setProducts(data);
            } catch (error) {
                console.log('ERROR', error);
                setError('Failed to load products');
            } finally {
                setIsLoading(false);
            }
        };

        void loadProducts();
    }, [sort, query]);

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
        return <div>{error}</div>;
    }

    return (
        <div className={styles.listContainer}>
            <div className={styles.controls}>
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
