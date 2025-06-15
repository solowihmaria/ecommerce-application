import { useEffect, useState } from 'react';
import type { Filter, Product } from '../../../../api/catalog/catalog.types';
import type { Category } from '../../../../api/catalog/catalog.types';
import { getProducts } from '../../../../api/catalog/getProducts';
import { getCategories } from '../../../../api/catalog/getCategories';
import { useAuth } from '../../../../store/auth/useAuth';
import { getPageCount } from './pagination';
// import { createCart, getUserCart } from '../../../../api/cart/cart';
// import type { CustomCart } from '../../../../api/cart/cart.types';
// import { prepareCartData } from '../../../../api/cart/helpers';
// import { AxiosError } from 'axios';

export const useCatalog = () => {
    const { loginStatus, cartContent } = useAuth();
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const limit = 10;

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

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(
        null
    );

    // const [cartContent, setCartContent] = useState<null | CustomCart>(null);

    // useEffect(() => {
    //     const getOrCreateCart = async () => {
    //         let cartData;
    //         try {
    //             cartData = await getUserCart();
    //             console.log('CARTDATA 1', cartData);
    //         } catch (error: unknown) {
    //             console.log('GET CART ERR', error);

    //             if (error instanceof AxiosError && error.status === 401) {
    //                 try {
    //                     cartData = await createCart();
    //                     console.log('CARTDATA 2', cartData);
    //                 } catch (error) {
    //                     console.log('CREATE CART ERR', error);
    //                 }
    //             }
    //         }

    //         if (cartData) {
    //             setCartContent(prepareCartData(cartData));
    //         }
    //     };

    //     void getOrCreateCart();
    // }, []);
    // console.log('CARTCONTENT', cartContent);

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
        selectedProduct,
        setSelectedProduct,
        cartContent,
    };
};
