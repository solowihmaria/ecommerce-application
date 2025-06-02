import { useEffect, useState } from 'react';
import type { Filter, Product } from '../../../../api/catalog/catalog.types';
import type { Category } from '../../../../api/catalog/catalog.types';
import { getProducts } from '../../../../api/catalog/getProducts';
import { getCategories } from '../../../../api/catalog/getCategories';
import { useAuth } from '../../../../store/auth/useAuth';

export const useCatalog = () => {
    const { loginStatus } = useAuth();
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sort, setSort] = useState<string>('');
    const [searchInput, setSearchInput] = useState<string>('');
    const [query, setQuery] = useState<string>('');
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
                const data: Product[] = await getProducts(
                    {
                        sort,
                        query,
                        filters,
                    },
                    loginStatus
                );
                setProducts(data);
            } catch (error) {
                console.log('ERROR', error);
                setError('Failed to load products');
            } finally {
                setIsLoading(false);
            }
        };

        void loadProducts();
    }, [sort, query, filters, loginStatus]);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data: Category[] = await getCategories(loginStatus);
                setCategories(data);
            } catch (error) {
                console.log('ERROR', error);
                setError('Failed to load categories');
            } finally {
                setIsLoading(false);
            }
        };

        void loadCategories();
    }, [loginStatus]);

    // Задержка для оптимизации количества запросов при вводе в поле поиска
    useEffect(() => {
        const timeout = setTimeout(() => {
            setQuery(searchInput);
        }, 500);

        return () => clearTimeout(timeout);
    }, [searchInput]);

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

    return {
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
    };
};
