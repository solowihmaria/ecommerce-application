import { useEffect, useState } from 'react';
import type { Filter, Product } from '../../../../api/catalog/catalog.types';
import type { Category } from '../../../../api/catalog/catalog.types';
import { getProducts } from '../../../../api/catalog/getProducts';
import { getCategories } from '../../../../api/catalog/getCategories';
import { useAuth } from '../../../../store/auth/useAuth';
import { getPageCount } from './pagination';

export const useCatalog = () => {
    const { loginStatus } = useAuth();
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
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
    // const pagesArray = getPagesArray(totalPages);
    const limit = 10;

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setIsLoading(true);

                const data: { products: Product[]; total: number } =
                    await getProducts(
                        {
                            sort,
                            query,
                            filters,
                            offset: (page - 1) * limit,
                        },
                        loginStatus
                    );
                setProducts(data.products);

                const totalCount = data.total;
                setTotalPages(getPageCount(totalCount, limit));
            } catch (error) {
                console.log('ERROR', error);
                setError('Failed to load products');
            } finally {
                setIsLoading(false);
            }
        };

        void loadProducts();
    }, [sort, query, filters, loginStatus, page, totalPages]);

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

        setPage(1);
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
        totalPages,
        page,
        setPage,
    };
};
